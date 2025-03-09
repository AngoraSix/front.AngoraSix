import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import SpinnerSkeleton from '../../../common/Skeletons/SpinnerSkeleton.component';
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
      const RegisteringComponent = () => (<SpinnerSkeleton />);
      return RegisteringComponent;
    default:
      const NotSupportedComponent = () => (<Typography
        align="center"
        variant="h6"
        component="h2"
        color="primary"
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
