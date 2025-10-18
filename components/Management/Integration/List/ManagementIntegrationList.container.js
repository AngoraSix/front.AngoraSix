import PropTypes from 'prop-types';
import React, { useReducer, useState } from 'react';
import api from '../../../../api';
import { THIRD_PARTY } from '../../../../constants/constants';
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
  const [interestNotice, setInterestNotice] = useState('');
  const [isInterestOpen, setIsInterestOpen] = useState(false);

  const updateSourceSync = (sourceSyncDto) => {
    const sourceSync = sourceSyncDto instanceof SourceSync ? sourceSyncDto : new SourceSync(sourceSyncDto);
    dispatch(replaceSourceSync(sourceSync));
  }

  const onExpressInterest = async (toolKey) => {
    try {
      await api.front.saveSurveyResponse(
        {
          tool: toolKey,
          projectManagementId,
          source: 'management-integrations',
        },
        'management-integrations-interest'
      );
      const toolName = THIRD_PARTY[toolKey]?.name || toolKey;
      setInterestNotice(`No habilitado por ahora. Registramos tu interés en ${toolName}. Por el momento solo tenemos soporte para Trello.`);
    } catch (e) {
      setInterestNotice('No pudimos registrar tu interés. Intentá de nuevo más tarde.');
    } finally {
      setIsInterestOpen(true);
      setTimeout(() => setIsInterestOpen(false), 4500);
    }
  };
  return (
    <ManagementIntegrationList
      managementIntegrations={integrationsState.collection}
      projectManagementId={projectManagementId}
      updateSourceSync={updateSourceSync}
      onExpressInterest={onExpressInterest}
      interestNotice={interestNotice}
      isInterestOpen={isInterestOpen}
      onCloseInterest={() => setIsInterestOpen(false)}
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
