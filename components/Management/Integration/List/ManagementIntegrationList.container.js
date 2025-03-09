import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import SourceSync from '../../../../models/SourceSync';
import { mapToHateoasCollectionDto } from '../../../../utils/rest/hateoas/hateoasUtils';
import ManagementIntegrationList from './ManagementIntegrationList.component';
import ManagementIntegrationListReducer, { generateInitialState, replaceSourceSync } from './ManagementIntegrationList.reducer';

const ManagementIntegrationListContainer = ({
  projectManagementId,
  sourceSyncsResponseData,
}) => {
  const hateoasCollectionDto = mapToHateoasCollectionDto(
    sourceSyncsResponseData,
    SourceSync
  );
  

  const [integrationsState, dispatch] = useReducer(ManagementIntegrationListReducer, generateInitialState(hateoasCollectionDto));

  const updateSourceSync = (sourceSyncDto) => {
    const sourceSync = sourceSyncDto instanceof SourceSync ? sourceSyncDto : new SourceSync(sourceSyncDto);
    dispatch(replaceSourceSync(sourceSync));
  }
  return (
    <ManagementIntegrationList
      managementIntegrations={integrationsState.collection}
      projectManagementId={projectManagementId}
      updateSourceSync={updateSourceSync}
    />
  );
};

ManagementIntegrationListContainer.defaultProps = {
};

ManagementIntegrationListContainer.propTypes = {
  sourceSyncsResponseData: PropTypes.object.isRequired,
  projectManagementId: PropTypes.string.isRequired,
};

export default ManagementIntegrationListContainer;
