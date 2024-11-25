import SyncIcon from '@mui/icons-material/Sync';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const StartSourceSyncAction = ({ sourceKey, integrationId, onStartSourceSync }) => {
  const { t } = useTranslation('management.integration.list');

  return (
    <Tooltip title={t('management.integration.list.actions.sync.tooltip.template').replace(':sourceKey', sourceKey)}>
      <React.Fragment>
        <Button
          className={`IntegrationItem__Actions__Button StartSourceSyncAction__Button`}
          color="primary"
          variant="contained"
          startIcon={<SyncIcon />}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() => onStartSourceSync(integrationId)}
        >
          {t('management.integration.list.actions.sync.text')}
        </Button>
        <IconButton
          aria-label="register"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => onStartSourceSync(integrationId)}
        >
          <SyncIcon />
        </IconButton>
      </React.Fragment>
    </Tooltip >
  );
};

StartSourceSyncAction.propTypes = {
  actionData: PropTypes.object.isRequired,
  onStartSourceSync: PropTypes.func.isRequired,
  integrationId: PropTypes.string.isRequired,
};

export default StartSourceSyncAction;
