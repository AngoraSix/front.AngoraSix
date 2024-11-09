import ImportIcon from '@mui/icons-material/DownloadForOffline';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const ImportDataAction = ({ sourceKey, integrationId, onImportData }) => {
  const { t } = useTranslation('management.integration.list');

  return (
    <Tooltip title={t('management.integration.list.actions.import.tooltip.template').replace(':sourceKey', sourceKey)}>
      <React.Fragment>
        <Button
          className={`IntegrationItem__Actions__Button ImportDataAction__Button`}
          color="primary"
          variant="contained"
          startIcon={<ImportIcon />}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() => onImportData(integrationId)}
        >
          {t('management.integration.list.actions.import.text')}
        </Button>
        <IconButton
          aria-label="register"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => onImportData(integrationId)}
        >
          <ImportIcon />
        </IconButton>
      </React.Fragment>
    </Tooltip >
  );
};

ImportDataAction.propTypes = {
  actionData: PropTypes.object.isRequired,
  onImportData: PropTypes.func.isRequired,
  integrationId: PropTypes.string.isRequired,
};

export default ImportDataAction;
