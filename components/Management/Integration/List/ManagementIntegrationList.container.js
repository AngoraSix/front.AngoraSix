import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import ManagementIntegration from '../../../../models/ManagementIntegration';
import SourceSync from '../../../../models/SourceSync';
import { mapToHateoasCollectionDto } from '../../../../utils/rest/hateoas/hateoasUtils';
import ManagementIntegrationList from './ManagementIntegrationList.component';
import ManagementIntegrationListReducer, { generateInitialState, replaceIntegration, replaceIntegrationSourceSync } from './ManagementIntegrationList.reducer';

const ManagementIntegrationListContainer = ({
  projectManagementId,
  managementIntegrationsResponseData,
}) => {
  const hateoasCollectionDto = mapToHateoasCollectionDto(
    managementIntegrationsResponseData,
    ManagementIntegration
  );

  const [integrationsState, dispatch] = useReducer(ManagementIntegrationListReducer, generateInitialState(hateoasCollectionDto));

  const updateIntegration = (integrationDto) => {
    const integration = integrationDto instanceof ManagementIntegration ? integrationDto : new ManagementIntegration(integrationDto);
    dispatch(replaceIntegration(integration));
  }

  const updateSourceSync = (sourceSyncDto) => {
    const sourceSync = sourceSyncDto instanceof SourceSync ? sourceSyncDto : new SourceSync(sourceSyncDto);
    dispatch(replaceIntegrationSourceSync(sourceSync));
  }

  return (
    <ManagementIntegrationList
      managementIntegrations={integrationsState.collection}
      projectManagementId={projectManagementId}
      updateIntegration={updateIntegration}
      updateSourceSync={updateSourceSync}
    />
  );
};

ManagementIntegrationListContainer.defaultProps = {
};

ManagementIntegrationListContainer.propTypes = {
  managementIntegrationsResponseData: PropTypes.object.isRequired,
  projectManagementId: PropTypes.string.isRequired,
};

export default ManagementIntegrationListContainer;
