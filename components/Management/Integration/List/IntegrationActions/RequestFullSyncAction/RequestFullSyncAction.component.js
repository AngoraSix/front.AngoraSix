import RequestFullSyncIcon from '@mui/icons-material/RestartAlt';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const RequestFullSyncAction = ({ sourceKey, sourceSyncId, onRequestFullSync }) => {
  const { t } = useTranslation('management.integration.list');

  return (
    <Tooltip title={t('management.integration.list.actions.fullsync.tooltip.template').replace(':sourceKey', sourceKey)}>
      <React.Fragment>
        <Button
          className={`IntegrationItem__Actions__Button RequestFullSyncAction__Button`}
          color="primary"
          variant="contained"
          startIcon={<RequestFullSyncIcon />}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() => onRequestFullSync(sourceSyncId)}
        >
          {t('management.integration.list.actions.fullsync.text')}
        </Button>
        <IconButton
          aria-label="register"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => onRequestFullSync(sourceSyncId)}
        >
          <RequestFullSyncIcon />
        </IconButton>
      </React.Fragment>
    </Tooltip >
  );
};

RequestFullSyncAction.propTypes = {
  sourceKey: PropTypes.string.isRequired,
  onRequestFullSync: PropTypes.func.isRequired,
  sourceSyncId: PropTypes.string.isRequired,
};

export default RequestFullSyncAction;
