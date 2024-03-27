const START_LOADING = 'Notifications/START_LOADING';
const FINISH_LOADING = 'Notifications/FINISH_LOADING';
const UPDATE_NOTIFICATIONS = 'Notifications/UPDATE_NOTIFICATIONS';
const NEW_NOTIFICATION = 'Notifications/NEW_NOTIFICATION';
const UPDATE_TOTALTOREAD = 'Notifications/UPDATE_TOTALTOREAD';
const DISMISS_NOTIFICATIONS = 'Notifications/DISMISS_NOTIFICATIONS';
const UPDATE_PAGE = 'Notifications/UPDATE_PAGE';
const UPDATE_ALL = 'Notifications/UPDATE_ALL';

const NEW_NOTIFICATION_OPERATION_TYPES = {
  ADD: 'add',
  UPDATE: 'update',
};

export const startLoadingAction = () => ({ type: START_LOADING });
export const finishLoadingAction = () => ({ type: FINISH_LOADING });
export const updateNotificationsAction = (payload) => ({
  type: UPDATE_NOTIFICATIONS,
  payload,
});
export const newNotificationAction = (payload) => ({
  type: NEW_NOTIFICATION,
  payload,
});
export const dismissNotificationsAction = (payload) => ({
  type: DISMISS_NOTIFICATIONS,
  payload,
});
export const updatePageAction = (payload) => ({ type: UPDATE_PAGE, payload });
export const updateTotalToReadAction = (payload) => ({
  type: UPDATE_TOTALTOREAD,
  payload,
});
export const updateAllAction = (payload) => ({ type: UPDATE_ALL, payload });

export const INITIAL_STATE = {
  isLoading: false,
  notifications: {
    toRead: [],
    dismissed: [],
  },
  notificationIds: [],
  number: 0,
  totalToRead: 0,
  total: 0,
  totalPages: 0,
  extraSkip: 0,
  hasImportantNotification: false,
  initialized: false,
  actions: {},
};

const NotificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_NOTIFICATIONS:
      return {
        ...state,
        companies: action.payload,
      };
    case NEW_NOTIFICATION:
      const notification = action.payload;
      if (state.notificationIds.includes(notification.id)) {
        // disregard update
        return state;
      }
      const updatedNotifications = _obtainUpdatedNotifications(
          notification,
          state.notifications
        ),
        totalDiff =
          updatedNotifications.toRead.length +
          updatedNotifications.dismissed.length -
          (state.notifications.toRead.length +
            state.notifications.dismissed.length),
        totalToReadDiff =
          updatedNotifications.toRead.length -
          state.notifications.toRead.length,
        updatedTotalToRead = state.totalToRead + totalToReadDiff,
        updatedTotal = state.total + totalDiff,
        updatedSkip = state.extraSkip + 1;
      return {
        ...state,
        notifications: updatedNotifications,
        totalToRead: updatedTotalToRead,
        extraSkip: updatedSkip,
        total: updatedTotal,
        notificationIds: [...state.notificationIds, notification.id],
        hasImportantNotification:
          _checkImportantNotifications(updatedNotifications),
      };
    case DISMISS_NOTIFICATIONS:
      const dismissedNotifications = {
          dismissed: [...state.notifications.dismissed],
        },
        [dismissableToRead, nonDismissableToRead] = [
          ...state.notifications.toRead,
        ].reduce(
          (result, element) => {
            result[!element.needsExplicitDismiss ? 0 : 1].push(element);
            return result;
          },
          [[], []]
        );

      dismissedNotifications.dismissed.unshift(
        ...dismissableToRead.map((n) => {
          n.dismissedForUser = true;
          return n;
        })
      );
      dismissedNotifications.toRead = nonDismissableToRead;
      return {
        ...state,
        notifications: dismissedNotifications,
        hasImportantNotification: false,
        totalToRead: 0,
      };
    case UPDATE_PAGE:
      return {
        ...state,
        number: action.payload,
      };
    case UPDATE_TOTALTOREAD:
      return {
        ...state,
        totalToRead: action.payload,
      };
    case UPDATE_ALL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const _obtainUpdatedNotifications = (notification, notifications) => {
  let updatedNotifications = {
    toRead: [...notifications.toRead],
    dismissed: [...notifications.dismissed],
  };
  updatedNotifications.toRead.unshift(notification);
  return updatedNotifications;
};

const _checkImportantNotifications = (notifications) => {
  return notifications.toRead.some(
    (n) => n.alertLevel === 'warn' || n.alertLevel === 'error'
  );
};

export default NotificationsReducer;
