import { useSession } from 'next-auth/react';
import React, { useEffect, useReducer } from 'react';
import api from '../../../api';
import { useNotifications } from '../../../hooks/app';
import Notification from '../../../models/Notification';
import logger from '../../../utils/logger';
import { mapToHateoasCollectionDto } from '../../../utils/rest/hateoas/hateoasUtils';
import Notifications from './Notifications.component';
import NotificationsReducer, {
  INITIAL_STATE,
  dismissNotificationsAction,
  newNotificationAction,
  startLoadingAction,
  updateAllAction,
} from './Notifications.reducer';

export const ACTION_IDS = {
  GATEWAY_NOTIFICATION_RESPOND: 'gatewayNotificationRespond',
};

const NotificationsContainer = ({ }) => {
  const { onError } = useNotifications();
  const [state, dispatch] = useReducer(NotificationsReducer, INITIAL_STATE);
  const { data: session } = useSession();

  useEffect(() => {
    const initializeNotifications = async () => {
      if (session && !session.error && !state?.initialized) {
        try {
          await fetchNotifications();
          let eventSource = api.front.streamContributorNotifications();
          eventSource.onmessage = (m) => {
            dispatch(newNotificationAction(JSON.parse(m.data)));
          };

          eventSource.onerror = (e) => {
            logger.error(`Error on EvenSource: ${JSON.stringify(e)}`);
            eventSource.close();
          };
          return () => {
            eventSource.close();
          };
        } catch (e) {
          onError(`Error retrieving contributor notifications: ${e}`);
        }
      }
    };

    initializeNotifications();
  }, [session]);

  const fetchNotifications = async ({
    number = state.number,
    extraSkip = state.extraSkip,
  } = {}) => {
    dispatch(startLoadingAction());
    let notificationsResponse = await api.front.getContributorNotifications({
      number,
      extraSkip,
    });
    const hateoasCollectionDto = mapToHateoasCollectionDto(
      notificationsResponse,
      Notification
    );
    let {
      collection: notificationsData,
      metadata: notificationsMetadata,
      actions: notificationsActions,
    } = hateoasCollectionDto;
    let notificationsList = state.notifications;
    let notificationIds = state.notificationIds;

    notificationsData.forEach((notification) => {
      notification.dismissedForUser
        ? notificationsList.dismissed.push(notification)
        : notificationsList.toRead.push(notification);
      notificationIds.push(notification.id);
    });
    dispatch(
      updateAllAction({
        isLoading: false,
        notifications: notificationsList,
        initialized: true,
        actions: notificationsActions,
        notificationIds,
        ...notificationsMetadata,
      })
    );
    return { notificationsList };
  };

  const dismissAllUserNotifications = async () => {
    if (state.totalToRead > 0) {
      api.front.dismissContributorNotifications();
      dispatch(dismissNotificationsAction());
    }
  };

  const loadMoreNotifications = async () => {
    fetchNotifications({
      number: state.number + 1,
      extraSkip: state.extraSkip,
    });
  };

  return (
    <Notifications
      notifications={state.notifications}
      totalToRead={state.totalToRead}
      isLoading={state.isLoading}
      hasImportantNotification={state.hasImportantNotification}
      onClose={dismissAllUserNotifications}
      onLoadMore={loadMoreNotifications}
      notificationActions={state.actions}
    />
  );
};

NotificationsContainer.defaultProps = {};

NotificationsContainer.propTypes = {};

export default NotificationsContainer;
