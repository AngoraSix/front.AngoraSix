import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import api from '../../../../api';
import ManagementIntegrationInteraction from './ManagementIntegrationInteraction.component';
import { INTERACTION_PHASE, INTERCOMMUNICATION_KEYS } from '../ManagementIntegration.properties';

const ManagementIntegrationInteractionContainer = ({
  managementId, sourceKey, interactionPhase
}) => {
  const [interactionState, setInteractionState] = useState(INTERACTION_PHASE[interactionPhase]);

  useEffect(() => {
    async function processRegistering() {
      // Obtain Token from URL - fragment for now
      const hash = window.location.hash.slice(1);
      const params = new URLSearchParams(hash);
      const tokenValue = params.get('token');
      const registrationResponse = await api.front.registerIntegration(sourceKey, managementId, tokenValue);

      window.opener.postMessage({ type: INTERCOMMUNICATION_KEYS.registrationCompleted, data: registrationResponse }, window.location.origin);
      window.close();
    }
    if (interactionState === INTERACTION_PHASE.register) {
      processRegistering()
    }
  }, [interactionState, managementId, sourceKey]);
  return (
    <ManagementIntegrationInteraction
      sourceKey={sourceKey}
      managementId={managementId}
      interactionState={interactionState}
    />
  );
};

ManagementIntegrationInteractionContainer.defaultProps = {
};

ManagementIntegrationInteractionContainer.propTypes = {
  managementId: PropTypes.string.isRequired,
  sourceKey: PropTypes.string.isRequired,
  interactionPhase: PropTypes.string.isRequired,
};

export default ManagementIntegrationInteractionContainer;
