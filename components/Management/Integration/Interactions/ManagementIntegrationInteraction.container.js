import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import api from '../../../../api';
import { ROUTES } from '../../../../constants/constants';
import { resolveRoute } from '../../../../utils/api/apiHelper';
import { INTEGRATION_QUERY_PARAMS, INTERACTION_PHASE } from '../ManagementIntegration.properties';
import ManagementIntegrationInteraction from './ManagementIntegrationInteraction.component';

const ManagementIntegrationInteractionContainer = ({
  managementId, sourceKey, interactionPhase
}) => {
  const interactionState = INTERACTION_PHASE[interactionPhase];
  const router = useRouter();

  useEffect(() => {
    async function processRegistering() {
      // Obtain Token from URL - fragment for now
      const hash = window.location.hash.slice(1);
      const params = new URLSearchParams(hash);
      const tokenValue = params.get('token');
      const registrationResponse = await api.front.registerSourceSync(sourceKey, managementId, tokenValue);

      const finishConfigSourceSyncRoute = `${resolveRoute(
        ROUTES.management.integrations.sourceSync.finish,
        managementId,
        registrationResponse.id,
      )}${INTEGRATION_QUERY_PARAMS.multipleStepProcess in router.query ? `?${INTEGRATION_QUERY_PARAMS.multipleStepProcess}` : ''}`;

      router.push(finishConfigSourceSyncRoute)
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
