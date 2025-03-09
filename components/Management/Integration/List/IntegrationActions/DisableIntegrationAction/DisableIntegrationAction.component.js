import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const DisableIntegrationAction = ({ sourceKey, actionKey, actionData, projectManagementId, sourceSyncId, onDisableIntegration }) => {
  const { t } = useTranslation('management.integration.list');

  return (
    <Tooltip title={t('management.integration.list.actions.disable.tooltip.template').replace(':sourceKey', sourceKey)}>
      <React.Fragment>
        <Button
          className={`IntegrationItem__Actions__Button DisableIntegrationAction__Button`}
          color="primary"
          variant="contained"
          startIcon={<DeleteIcon />}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() => onDisableIntegration(sourceSyncId)}
        >
          {t('management.integration.list.actions.disable.text')}
        </Button>
        <IconButton
          aria-label="register"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => onDisableIntegration(sourceSyncId)}
        >
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    </Tooltip >
  );
};

DisableIntegrationAction.propTypes = {
  actionData: PropTypes.object.isRequired,
  onDisableIntegration: PropTypes.func.isRequired,
  sourceSyncId: PropTypes.string.isRequired,
};

export default DisableIntegrationAction;
