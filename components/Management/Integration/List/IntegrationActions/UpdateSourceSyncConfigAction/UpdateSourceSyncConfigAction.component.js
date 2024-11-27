import ConfigIcon from '@mui/icons-material/Settings';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const UpdateSourceSyncConfigAction = ({ sourceKey, sourceSyncId, onUpdateSourceSyncConfig }) => {
  const { t } = useTranslation('management.integration.list');

  return (
    <Tooltip title={t('management.integration.list.actions.updatesyncconfig.tooltip.template').replace(':sourceKey', sourceKey)}>
      <React.Fragment>
        <Button
          className={`IntegrationItem__Actions__Button UpdateSourceSyncConfigAction__Button`}
          color="primary"
          variant="contained"
          startIcon={<ConfigIcon />}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() => onUpdateSourceSyncConfig(sourceSyncId)}
        >
          {t('management.integration.list.actions.updatesyncconfig.text')}
        </Button>
        <IconButton
          aria-label="register"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => onUpdateSourceSyncConfig(sourceSyncId)}
        >
          <ConfigIcon />
        </IconButton>
      </React.Fragment>
    </Tooltip >
  );
};

UpdateSourceSyncConfigAction.propTypes = {
  actionData: PropTypes.object.isRequired,
  onUpdateSourceSyncConfig: PropTypes.func.isRequired,
  integrationId: PropTypes.string.isRequired,
};

export default UpdateSourceSyncConfigAction;
