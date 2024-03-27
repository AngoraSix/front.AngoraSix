import PropTypes from 'prop-types';
import React from 'react';
import LinkAction from './LinkAction';

const NOTIFICATION_ACTION_STRATEGIES = {
  link: LinkAction,
};

const NotificationActions = ({
  actions = {},
  dismissedForUser,
  onNotificationAction,
}) => {
  return (
    <div className="NotificationItem__Actions">
      {Object.entries(actions)
        .map(([actionKey, actionData = {}]) => {
          const ActionComponent = NOTIFICATION_ACTION_STRATEGIES[actionKey];
          return ActionComponent ? (
            <ActionComponent
              key={actionKey}
              {...actionData}
              dismissedForUser={dismissedForUser}
              onNotificationAction={onNotificationAction}
            />
          ) : null;
        })
        .filter((x) => x)}
    </div>
  );
};

NotificationActions.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default NotificationActions;
