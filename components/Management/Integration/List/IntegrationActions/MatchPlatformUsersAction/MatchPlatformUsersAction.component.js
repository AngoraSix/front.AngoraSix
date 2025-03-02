import UsersMatchIcon from '@mui/icons-material/People';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const MatchPlatformUsersAction = ({ sourceKey, sourceSyncId, integrationId, onTriggerMatchPlatformUsers }) => {
  const { t } = useTranslation('management.integration.list');

  return (
    <Tooltip title={t('management.integration.list.actions.matchplatformusers.tooltip.template').replace(':sourceKey', sourceKey)}>
      <React.Fragment>
        <Button
          className={`IntegrationItem__Actions__Button MatchPlatformUsersAction__Button`}
          color="primary"
          variant="contained"
          startIcon={<UsersMatchIcon />}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() => onTriggerMatchPlatformUsers(sourceSyncId, integrationId)}
        >
          {t('management.integration.list.actions.matchplatformusers.text')}
        </Button>
        <IconButton
          aria-label="register"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => onTriggerMatchPlatformUsers(sourceSyncId, integrationId)}
        >
          <UsersMatchIcon />
        </IconButton>
      </React.Fragment>
    </Tooltip >
  );
};

MatchPlatformUsersAction.propTypes = {
  integrationId: PropTypes.string.isRequired,
  sourceKey: PropTypes.string.isRequired,
  sourceSyncId: PropTypes.string.isRequired,
  onTriggerMatchPlatformUsers: PropTypes.func.isRequired,
};

export default MatchPlatformUsersAction;
