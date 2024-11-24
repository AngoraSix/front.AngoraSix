import SyncIcon from '@mui/icons-material/Sync';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const SyncConfigAction = ({ sourceKey, integrationId, onSyncConfig }) => {
  const { t } = useTranslation('management.integration.list');

  return (
    <Tooltip title={t('management.integration.list.actions.sync.tooltip.template').replace(':sourceKey', sourceKey)}>
      <React.Fragment>
        <Button
          className={`IntegrationItem__Actions__Button SyncConfigAction__Button`}
          color="primary"
          variant="contained"
          startIcon={<SyncIcon />}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() => onSyncConfig(integrationId)}
        >
          {t('management.integration.list.actions.sync.text')}
        </Button>
        <IconButton
          aria-label="register"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => onSyncConfig(integrationId)}
        >
          <SyncIcon />
        </IconButton>
      </React.Fragment>
    </Tooltip >
  );
};

SyncConfigAction.propTypes = {
  actionData: PropTypes.object.isRequired,
  onSyncConfig: PropTypes.func.isRequired,
  integrationId: PropTypes.string.isRequired,
};

export default SyncConfigAction;
