import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../../../../api';
import SourceSync from '../../../../../models/SourceSync';
import { toType } from '../../../../../utils/helpers';
import { INTERCOMMUNICATION_KEYS } from '../../ManagementIntegration.properties';
import SourceSyncForm from './SourceSyncForm.component';
import { SOURCE_SYNC_STATUS } from './SourceSyncForm.properties';
import SourceSyncFormReducer, {
  INITIAL_STATE,
  isProcessing,
  newStep,
  updateFieldsAction,
  wasSubmitted
} from './SourceSyncForm.reducer';

const SourceSyncFormContainer = ({ sourceSync }) => {
  const sourceSyncObj = toType(sourceSync, SourceSync);

  const currentStepIndex = sourceSyncObj.status.steps.length - 1;
  const currentStep = sourceSyncObj.status.steps.at(currentStepIndex);
  const currentStepObj = {
    index: currentStepIndex,
    key: currentStep.stepKey
  }
  const requiredDataForStep = currentStep.requiredDataForStep;
  const formData = requiredDataForStep.map(data => ({ [data.key]: data.value }));

  const [formState, dispatch] = useReducer(SourceSyncFormReducer, {
    ...INITIAL_STATE,
    formData: { ...formData },
    actions: sourceSyncObj.actions,
    requiredDataForStep,
    currentStepObj,
    sourceSyncStatus: sourceSyncObj.status.status
  });

  // // we want to support updating several fields at once => value can be an array of fields
  const onFormChange = (stepIndex, property) => (eventOrValue) => {
    const value = eventOrValue.target
      ? eventOrValue.target.value
      : eventOrValue;
    const partialFormData =
      Array.isArray(eventOrValue) && property == null
        ? Object.assign({}, ...eventOrValue.map(([p, v]) => ({ [p]: v })))
        : {
          [property]: Array.isArray(value) ? value : [value],
        };

    dispatch(updateFieldsAction({ [stepIndex]: partialFormData }));
  };

  const onContinueSync = async () => {
    dispatch(isProcessing(true));
    if (formState.requiredDataForStep.every(item => _hasBeenFilled(item))) {
      const sourceSyncResponse = await api.front.submitSourceSyncStep(sourceSync.id, formState.currentStepObj.index, formState.formData[formState.currentStepObj.index]);
      const sourceSyncObj = toType(sourceSyncResponse, SourceSync);
      const currentStepIndex = sourceSyncObj.status.steps.length - 1;
      const currentStep = sourceSyncObj.status.steps.at(currentStepIndex);
      const currentStepObj = {
        index: currentStepIndex,
        key: currentStep.stepKey
      }
      const sourceSyncStatus = sourceSyncObj.status.status;
      dispatch(newStep({
        actions: sourceSyncObj.actions,
        requiredDataForStep: sourceSyncObj.status.steps.at(sourceSyncObj.status.steps.length - 1).requiredDataForStep,
        sourceSyncStatus,
        currentStepObj
      }));
      if (sourceSyncStatus === SOURCE_SYNC_STATUS.COMPLETED) {
        window.opener.postMessage({ type: INTERCOMMUNICATION_KEYS.syncConfigCompleted, data: sourceSyncResponse }, window.location.origin);
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    } else {
      dispatch(wasSubmitted(true));
    }
    dispatch(isProcessing(false));
  }

  const _hasBeenFilled = (item) => {
    const stepFormData = formState.formData[formState.currentStepObj.index]
    return Object.hasOwn(stepFormData, item.key) && stepFormData[item.key] != null && stepFormData[item.key] != '';
  }

  const actionFns = {
    onContinueSync
  }

  return (
    <SourceSyncForm
      formData={formState.formData}
      requiredStepFields={formState.requiredDataForStep}
      source={sourceSyncObj.source}
      currentStepObj={formState.currentStepObj}
      onFormChange={onFormChange}
      actions={formState.actions}
      actionFns={actionFns}
      wasSubmitted={formState.wasSubmitted}
      isProcessing={formState.isProcessing}
      sourceSyncStatus={formState.sourceSyncStatus}
    />
  );
};

SourceSyncFormContainer.defaults = {
  sourceSync: {},
};

SourceSyncFormContainer.propTypes = {
  sourceSync: PropTypes.object,
};

export default SourceSyncFormContainer;
