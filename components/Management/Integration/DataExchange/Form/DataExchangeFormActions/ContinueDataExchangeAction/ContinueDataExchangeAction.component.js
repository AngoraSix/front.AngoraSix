
import ContinueIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const ContinueDataExchangeAction = ({ onContinueExchange }) => {
  const { t } = useTranslation('management.integration.dataexchange');

  return (
    <Tooltip title={t('management.integration.dataexchange.new.actions.continue.tooltip')}>
      <React.Fragment>
        <Button
          className={`DataExchangeFormItem__Actions__Button ContinueDataExchangeAction__Button`}
          color="primary"
          variant="contained"
          endIcon={<ContinueIcon />}
          size="small"
          onClick={() => onContinueExchange()}
        >
          {t('management.integration.dataexchange.new.actions.continue.text')}
        </Button>
      </React.Fragment>
    </Tooltip >
  );
};

ContinueDataExchangeAction.propTypes = {
  onContinueExchange: PropTypes.func.isRequired,
};

export default ContinueDataExchangeAction;
