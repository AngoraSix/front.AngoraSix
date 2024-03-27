import NotificationsToReadIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import NotificationsList from './NotificationsList.component';

const Notifications = ({
  notifications,
  totalToRead,
  onLoadMore,
  onClose,
  isLoading,
  hasImportantNotification,
  notificationActions,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const onNotificationsClick = () => {
    if (isNotificationsOpen || hasImportantNotification) {
      onClose();
    }
    setIsNotificationsOpen(!(isNotificationsOpen || hasImportantNotification));
  };

  return (
    <React.Fragment>
      <div className="Navbar__Column Navbar__NotificationsIcon">
        <IconButton onClick={onNotificationsClick}>
          {totalToRead ? (
            <Badge badgeContent={totalToRead} color="error" max={99}>
              <NotificationsToReadIcon />
            </Badge>
          ) : (
            <NotificationsNoneIcon />
          )}
        </IconButton>
      </div>
      {(isNotificationsOpen || hasImportantNotification) && (
        <NotificationsList
          notifications={notifications}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
          notificationActions={notificationActions}
        />
      )}
    </React.Fragment>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.object.isRequired,
  totalToRead: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  notificationActions: PropTypes.object,
};

export default Notifications;
