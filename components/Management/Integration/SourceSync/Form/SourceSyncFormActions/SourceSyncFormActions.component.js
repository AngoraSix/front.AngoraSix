import { LoadingButton } from '@mui/lab';
import { Box, CircularProgress, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ContinueSourceSyncAction from './ContinueSourceSyncAction';
import { SOURCE_SYNC_FORM_ACTIONS_SUPPORTED_KEYS } from './SourceSyncFormActions.properties';

const SOURCE_SYNC_FORM_ACTION_STRATEGIES = {
  [SOURCE_SYNC_FORM_ACTIONS_SUPPORTED_KEYS.CONTINUE_SOURCE_SYNC]: ContinueSourceSyncAction,
};

const SourceSyncFormActions = ({ actions, actionFns, isProcessing }) => {
  return (
    <Box className="SourceSyncForm__Actions">
      {isProcessing ?
        <React.Fragment>
          <LoadingButton
            className={`SourceSyncForm__Actions__Button SourceSyncForm__Actions__Button__Processing`}
            color="primary"
            variant="contained"
            loading
            size="small"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
          </LoadingButton>
          <IconButton
            className={`SourceSyncForm__Actions__Button SourceSyncForm__Actions__Button__Processing`}
            aria-label="processing"
            color="primary"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <CircularProgress size="1.6rem" />
          </IconButton>
        </React.Fragment>
        : Object.entries(actions)
          .map(([actionKey]) => {
            const ActionComponent = SOURCE_SYNC_FORM_ACTION_STRATEGIES[actionKey];
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

SourceSyncFormActions.defaultProps = {
  actions: {},
  actionFns: {},
};

SourceSyncFormActions.propTypes = {
  actions: PropTypes.object.isRequired,
  actionFns: PropTypes.object.isRequired,
  isProcessing: PropTypes.bool,
};

export default SourceSyncFormActions;
