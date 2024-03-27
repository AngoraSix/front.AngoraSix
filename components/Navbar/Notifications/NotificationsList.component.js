import { Box, Button, List, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import ListSkeleton from '../../common/Skeletons/ListSkeleton.component';
import NotificationItem from './NotificationItem';

const NotificationsList = ({
  notifications,
  onLoadMore,
  isLoading,
  notificationActions,
}) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  let allNotifications = [...notifications.toRead, ...notifications.dismissed];
  const canLoadMore = notificationActions.next;
  return (
    <Box
      className={`NotificationsList NotificationsList__Panel ${
        !allNotifications.length ? 'Empty' : ''
      }`}
      style={{
        backgroundColor: alpha(theme.palette.primary.dark, 0.25),
      }}
    >
      <List className="NotificationsList__List">
        {allNotifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
        {!isLoading && !allNotifications.length && (
          <Typography>{t('navbar.notifications.no-notifications')}</Typography>
        )}
      </List>
      {isLoading && <ListSkeleton />}
      {!!canLoadMore && !isLoading && (
        <Box className="NotificationsList__LoadMore">
          <Button
            className="NotificationsList__LoadMore__Button"
            onClick={onLoadMore}
            variant="contained"
            color="primary"
            disableElevation
          >
            {t('navbar.notifications.see-more')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

NotificationsList.propTypes = {
  notifications: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  notificationActions: PropTypes.object,
};

export default NotificationsList;
