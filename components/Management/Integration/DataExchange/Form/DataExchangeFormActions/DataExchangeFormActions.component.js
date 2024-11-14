import { LoadingButton } from '@mui/lab';
import { Box, CircularProgress, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ContinueDataExchangeAction from './ContinueDataExchangeAction';
import { DATA_EXCHANGE_FORM_ACTIONS_SUPPORTED_KEYS } from './DataExchangeFormActions.properties';

const DATA_EXCHANGE_FORM_ACTION_STRATEGIES = {
  [DATA_EXCHANGE_FORM_ACTIONS_SUPPORTED_KEYS.CONTINUE_DATA_EXCHANGE]: ContinueDataExchangeAction,
};

const DataExchangeFormActions = ({ actions, actionFns, isProcessing }) => {
  return (
    <Box className="DataExchangeForm__Actions">
      {isProcessing ?
        <React.Fragment>
          <LoadingButton
            className={`DataExchangeForm__Actions__Button DataExchangeForm__Actions__Button__Processing`}
            color="primary"
            variant="contained"
            loading
            size="small"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
          </LoadingButton>
          <IconButton
            className={`DataExchangeForm__Actions__Button DataExchangeForm__Actions__Button__Processing`}
            aria-label="processing"
            color="primary"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <CircularProgress size="1.6rem" />
          </IconButton>
        </React.Fragment>
        : Object.entries(actions)
          .map(([actionKey]) => {
            const ActionComponent = DATA_EXCHANGE_FORM_ACTION_STRATEGIES[actionKey];
            return ActionComponent ? (
              <ActionComponent
                key={actionKey}
                {...actionFns}
              />
            ) : null;
          })
          .filter((x) => x)}
    </Box>
  );
};

DataExchangeFormActions.defaultProps = {
  actions: {},
  actionFns: {},
};

DataExchangeFormActions.propTypes = {
  actions: PropTypes.object.isRequired,
  actionFns: PropTypes.object.isRequired,
  isProcessing: PropTypes.bool,
};

export default DataExchangeFormActions;
