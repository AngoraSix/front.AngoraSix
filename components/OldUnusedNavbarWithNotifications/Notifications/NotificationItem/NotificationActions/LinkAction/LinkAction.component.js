import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const LinkAction = ({ url, text, dismissedForUser }) => {
  const theme = useTheme();
  const { t } = useTranslation('common');

  return (
    <React.Fragment>
      <a href={url} target="_blank">
        <Button
          variant="outlined"
          className={`NotificationItem__Actions__Button LinkAction__Button ${dismissedForUser
            ? 'NotificationItem__Actions__Button--dismissed'
            : ''
            }`}
          size="small"
          startIcon={<OpenInNewIcon />}
          style={{
            backgroundColor: dismissedForUser
              ? null
              : theme.palette.primary.main,
          }}
        >
          <Typography
            className={`${dismissedForUser ? 'NotificationItem__Text--dismissed' : ''
              }`}
          >
            {text || t('navbar.notifications.browse')}
          </Typography>
        </Button>
      </a>
    </React.Fragment>
  );
};

LinkAction.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
  dismissedForUser: PropTypes.bool.isRequired,
};

export default LinkAction;
