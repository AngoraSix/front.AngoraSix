import { LoadingButton } from '@mui/lab';
import { Box, CircularProgress, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { INTEGRATION_ACTIONS_SUPPORTED_KEYS } from './IntegrationActions.properties';
import RedirectAuthoziationRegistrationAction from './RedirectAuthorizationRegistrationAction';
import DisableIntegrationAction from './DisableIntegrationAction';
import ConfigSourceSyncAction from './ConfigSourceSyncAction';
import RequestFullSyncAction from './RequestFullSyncAction';
import UpdateSourceSyncConfigAction from './UpdateSourceSyncConfigAction';

const INTEGRATIONS_ACTION_STRATEGIES = {
  [INTEGRATION_ACTIONS_SUPPORTED_KEYS.REDIRECT_AUTHORIZATION]: RedirectAuthoziationRegistrationAction,
  [INTEGRATION_ACTIONS_SUPPORTED_KEYS.DISABLE_INTEGRATION]: DisableIntegrationAction,
  [INTEGRATION_ACTIONS_SUPPORTED_KEYS.CONFIG_SOURCE_SYNC]: ConfigSourceSyncAction,
  [INTEGRATION_ACTIONS_SUPPORTED_KEYS.REQUEST_FULL_SYNC]: RequestFullSyncAction,
  [INTEGRATION_ACTIONS_SUPPORTED_KEYS.UPDATE_SOURCE_SYNC_CONFIG]: UpdateSourceSyncConfigAction,
};

const IntegrationActions = ({sourceKey, projectManagementId, integrationId, sourceSyncId, actions, actionFns, isProcessing }) => {
  return (
    <Box className="IntegrationItem__Actions">
      {isProcessing ?
        <React.Fragment>
          <LoadingButton
            className={`IntegrationItem__Actions__Button IntegrationItem__Actions__Button__Processing`}
            color="primary"
            variant="contained"
            loading
            size="small"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
          </LoadingButton>
          <IconButton
            className={`IntegrationItem__Actions__Button IntegrationItem__Actions__Button__Processing`}
            aria-label="processing"
            color="primary"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <CircularProgress size="1.6rem" />
          </IconButton>
        </React.Fragment>
        : Object.entries(actions)
          .map(([actionKey, actionData = {}]) => {
            const ActionComponent = INTEGRATIONS_ACTION_STRATEGIES[actionKey];
            return ActionComponent ? (
              <ActionComponent
                key={actionKey}
                sourceKey={sourceKey}
                actionKey={actionKey}
                actionData={actionData}
                integrationId={integrationId}
                sourceSyncId={sourceSyncId}
                projectManagementId={projectManagementId}
                {...actionFns}
              />
            ) : null;
          })
          .filter((x) => x)}
    </Box>
  );
};

IntegrationActions.defaultProps = {
  actions: {},
  actionFns: {},
  sourceKey: ''
};

IntegrationActions.propTypes = {
  actions: PropTypes.object.isRequired,
  actionFns: PropTypes.object.isRequired,
  sourceKey: PropTypes.string.isRequired,
  projectManagementId: PropTypes.string.isRequired,
  integrationId: PropTypes.string,
  sourceSyncId: PropTypes.string,
  isProcessing: PropTypes.bool,
};

export default IntegrationActions;
