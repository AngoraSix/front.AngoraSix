import PropTypes from 'prop-types';
import React, { useReducer, useState } from 'react';
import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation('management.integration.list');
  const hateoasCollectionDto = mapToHateoasCollectionDto(
    sourceSyncsResponseData,
    SourceSync
  );

  const [integrationsState, dispatch] = useReducer(
    ManagementIntegrationListReducer,
    generateInitialState(hateoasCollectionDto)
  );
  const [interestNotice, setInterestNotice] = useState('');
  const [isInterestOpen, setIsInterestOpen] = useState(false);
  const [isExpressingInterest, setIsExpressingInterest] = useState(false);
  const [customToolValue, setCustomToolValue] = useState('');
  const [isCustomSubmitting, setIsCustomSubmitting] = useState(false);
  const [interestSeverity, setInterestSeverity] = useState('info');

  const updateSourceSync = (sourceSyncDto) => {
    const sourceSync =
      sourceSyncDto instanceof SourceSync
        ? sourceSyncDto
        : new SourceSync(sourceSyncDto);
    dispatch(replaceSourceSync(sourceSync));
  };

  const onExpressInterest = async (toolKey, toolLabel) => {
    const toolName = toolLabel || THIRD_PARTY[toolKey]?.name || toolKey;
    let success = false;
    setIsExpressingInterest(true);
    try {
      await api.front.saveSurveyResponse(
        {
          toolKey,
          toolName,
          projectManagementId,
          source: 'management-integrations',
        },
        'management-integrations-interest'
      );
      setInterestNotice(
        t('management.integration.list.interest.notice', { tool: toolName })
      );
      setInterestSeverity('info');
      success = true;
    } catch (e) {
      setInterestNotice(t('management.integration.list.interest.error'));
      setInterestSeverity('warning');
    } finally {
      setIsExpressingInterest(false);
      setIsInterestOpen(true);
    }
    return success;
  };

  const onCustomToolSubmit = async () => {
    const trimmedValue = customToolValue.trim();
    if (!trimmedValue) {
      return;
    }
    setIsCustomSubmitting(true);
    const success = await onExpressInterest('custom', trimmedValue);
    if (success) {
      setCustomToolValue('');
    }
    setIsCustomSubmitting(false);
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
      interestSeverity={interestSeverity}
      customToolValue={customToolValue}
      onCustomToolChange={setCustomToolValue}
      onCustomToolSubmit={onCustomToolSubmit}
      isExpressingInterest={isExpressingInterest}
      isCustomSubmitting={isCustomSubmitting}
    />
  );
};

ManagementIntegrationListContainer.defaultProps = {};

ManagementIntegrationListContainer.propTypes = {
  sourceSyncsResponseData: PropTypes.object.isRequired,
  projectManagementId: PropTypes.string.isRequired,
};

export default ManagementIntegrationListContainer;
