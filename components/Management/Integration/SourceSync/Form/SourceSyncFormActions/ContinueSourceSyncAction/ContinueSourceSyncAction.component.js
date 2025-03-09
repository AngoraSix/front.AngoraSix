
import ContinueIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const ContinueSourceSyncAction = ({ onContinueSync }) => {
  const { t } = useTranslation('management.integration.sourcesync');

  return (
    <Tooltip title={t('management.integration.sourcesync.finish.actions.continue.tooltip')}>
      <React.Fragment>
        <Button
          className={`SourceSyncFormItem__Actions__Button ContinueSourceSyncAction__Button`}
          color="primary"
          variant="contained"
          endIcon={<ContinueIcon />}
          size="small"
          onClick={() => onContinueSync()}
        >
          {t('management.integration.sourcesync.finish.actions.continue.text')}
        </Button>
      </React.Fragment>
    </Tooltip >
  );
};

ContinueSourceSyncAction.propTypes = {
  onContinueSync: PropTypes.func.isRequired,
};

export default ContinueSourceSyncAction;
