import InfoIcon from '@mui/icons-material/Info';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const GetSourceSyncAction = ({ sourceKey, sourceSyncId, onGetSourceSync }) => {
  const { t } = useTranslation('management.integration.list');

  return (
    <Tooltip
      title={t(
        'management.integration.list.actions.getsourcesync.tooltip.template'
      ).replace(':sourceKey', sourceKey)}
    >
      <React.Fragment>
        <Button
          className={`IntegrationItem__Actions__Button GetSourceSyncAction__Button`}
          color="primary"
          variant="contained"
          startIcon={<InfoIcon />}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() => onGetSourceSync(sourceSyncId)}
        >
          {t('management.integration.list.actions.getsourcesync.text')}
        </Button>
        <IconButton
          aria-label="register"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => onGetSourceSync(sourceSyncId)}
        >
          <InfoIcon />
        </IconButton>
      </React.Fragment>
    </Tooltip>
  );
};

GetSourceSyncAction.propTypes = {
  actionData: PropTypes.object.isRequired,
  onGetSourceSync: PropTypes.func.isRequired,
  sourceSyncId: PropTypes.string.isRequired,
};

export default GetSourceSyncAction;
