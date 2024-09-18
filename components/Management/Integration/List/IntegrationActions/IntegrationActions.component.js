import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { INTEGRATION_ACTIONS_SUPPORTED_KEYS } from './IntegrationActions.properties';
import RedirectAuthoziationRegistrationAction from './RedirectAuthoziationRegistrationAction';

const INTEGRATIONS_ACTION_STRATEGIES = {
  [INTEGRATION_ACTIONS_SUPPORTED_KEYS.REDIRECT_AUTHORIZATION]: RedirectAuthoziationRegistrationAction,
};

const IntegrationActions = ({ sourceKey, actions, actionFns }) => {
  return (
    <Box className="IntegrationItem__Actions">
      {Object.entries(actions)
        .map(([actionKey, actionData = {}]) => {
          const ActionComponent = INTEGRATIONS_ACTION_STRATEGIES[actionKey];
          return ActionComponent ? (
            <ActionComponent
              key={actionKey}
              sourceKey={sourceKey}
              actionKey={actionKey}
              actionData={actionData}
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
  sourceKey: PropTypes.string.isRequired
};

export default IntegrationActions;
