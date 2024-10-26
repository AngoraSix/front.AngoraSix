import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { INTERACTION_PHASE } from '../ManagementIntegration.properties';

const ManagementIntegrationInteraction = ({ interactionState }) => {

  const { t } = useTranslation('management.integration.interactions');

  const InteractionComponent = ResolveInteractionComponent(interactionState, t);

  return (
    <Box className="ManagementIntegrationInteraction ManagementIntegrationInteraction__Container">
      <InteractionComponent />
    </Box>
  );
};

const ResolveInteractionComponent = (interactionState, t) => {
  switch (interactionState) {
    case INTERACTION_PHASE.register:
      const RegisteringComponent = () => (<React.Fragment><Box className="ManagementIntegrationInteraction__Text"><Typography
        align="center"
        variant="h6"
        component="h2"
        color="primary.main"
      >
        {t('management.integration.interactions.in-progress.text')}
      </Typography>
      </Box>
        <Box className="ManagementIntegrationInteraction__Content" sx={{ display: 'flex' }}>
          <CircularProgress className="ManagementIntegrationInteraction__Spinner" size="4rem" />
        </Box>
      </React.Fragment>);
      return RegisteringComponent;

    case INTERACTION_PHASE.onInput:
      const OnInputComponent = () => (
        <Typography variant="body1">
          On INPUT HERE...
        </Typography>
      );
      return OnInputComponent;
    default:
      const NotSupportedComponent = () => (<Typography
        align="center"
        variant="h6"
        component="h2"
        color="primary.main"
      >
        {t('management.integration.interactions.not-supported.text')}
      </Typography>);
      return NotSupportedComponent;
  }
};

ManagementIntegrationInteraction.defaultProps = {
};

ManagementIntegrationInteraction.propTypes = {
  interactionState: PropTypes.string,
};

export default ManagementIntegrationInteraction;
