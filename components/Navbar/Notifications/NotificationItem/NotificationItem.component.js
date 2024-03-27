import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ReportIcon from '@mui/icons-material/ReportOutlined';
import WarningIcon from '@mui/icons-material/WarningAmberOutlined';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import NotificationActions from './NotificationActions';

const ALERT_LEVEL_COLOR_MAPPING = {
  SUCCESS: 'success',
  WARN: 'warning',
  INFO: 'info',
  ERROR: 'error',
};

const ALERT_LEVEL_ICON_MAPPING = {
  SUCCESS: CheckCircleIcon,
  WARN: WarningIcon,
  INFO: InfoIcon,
  ERROR: ReportIcon,
};

const NotificationItem = ({ notification, onNotificationAction }) => {
  const theme = useTheme();
  const router = useRouter();
  const { locale } = router;

  const notificationColorId =
    notification.alertLevel &&
    ALERT_LEVEL_COLOR_MAPPING[notification.alertLevel.toUpperCase()];

  const NotificationIcon =
    notification.alertLevel &&
    ALERT_LEVEL_ICON_MAPPING[notification.alertLevel.toUpperCase()];

  const notificationTitle =
    notification.title?.i18n?.[locale] ||
    notification.title?.i18n?.[en] ||
    notification.title?.i18n?.[0] ||
    'Error reading title';
  const notificationMessage =
    notification.message?.i18n?.[locale] ||
    notification.message?.i18n?.[en] ||
    notification.message?.i18n?.[0] ||
    'Error reading message';
  const imageUrl =
    notification?.media?.thumbnailUrl || notification?.media?.url;
  return (
    <React.Fragment>
      <ListItem
        className={`NotificationItem ${
          notification.dismissedForUser ? 'NotificationItem--dismissed' : ''
        }`}
        style={{
          backgroundColor: notification.dismissedForUser
            ? null
            : theme.palette.primary.light,
        }}
        alignItems="flex-start"
      >
        <ListItemAvatar className="NotificationItem__Image">
          {imageUrl ? (
            <Avatar src={imageUrl} />
          ) : (
            <Avatar>
              {notification.dismissedForUser ? (
                <NotificationsNoneIcon />
              ) : (
                <NotificationsActiveIcon />
              )}
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          className={`NotificationItem__TextContainer`}
          primary={
            <React.Fragment>
              <NotificationIcon
                className="NotificationItem__AlertIcon"
                color={notificationColorId}
                fontSize="small"
              />
              <Typography
                className={`NotificationItem__Title NotificationItem__Text ${
                  notification.dismissedForUser
                    ? 'NotificationItem__Text--dismissed'
                    : ''
                }`}
                variant="subtitle1"
              >
                {notificationTitle}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <Typography
              component="span"
              variant="body2"
              className={`NotificationItem__Message NotificationItem__Title NotificationItem__Text ${
                notification.dismissedForUser
                  ? 'NotificationItem__Text--dismissed'
                  : ''
              }`}
              color="textPrimary"
            >
              {notificationMessage}
            </Typography>
          }
        />
        {notification.actions && (
          <NotificationActions
            actions={notification.actions}
            dismissedForUser={notification.dismissedForUser}
            onNotificationAction={onNotificationAction}
          />
        )}
      </ListItem>
    </React.Fragment>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default NotificationItem;
