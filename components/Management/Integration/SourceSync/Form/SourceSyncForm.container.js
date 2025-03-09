import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../../../../api';
import { ROUTES } from '../../../../../constants/constants';
import SourceSync from '../../../../../models/SourceSync';
import { resolveRoute } from '../../../../../utils/api/apiHelper';
import { toType } from '../../../../../utils/helpers';
import { INTEGRATION_QUERY_PARAMS, INTERCOMMUNICATION_KEYS } from '../../ManagementIntegration.properties';
import SourceSyncForm from './SourceSyncForm.component';
import { SOURCE_SYNC_STATUS } from './SourceSyncForm.properties';
import SourceSyncFormReducer, {
  INITIAL_STATE,
  isProcessing,
  updateFieldsAction,
  wasSubmitted
} from './SourceSyncForm.reducer';

const SourceSyncFormContainer = ({ sourceSync }) => {
  const sourceSyncObj = toType(sourceSync, SourceSync);
  const router = useRouter();

  const currentStepIndex = sourceSyncObj.config.steps.length - 1;
  const currentStep = sourceSyncObj.config.steps.at(currentStepIndex);
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
      const currentStepIndex = sourceSyncObj.config.steps.length - 1;
      const currentStep = sourceSyncObj.config.steps.at(currentStepIndex);
      const currentStepObj = {
        index: currentStepIndex,
        key: currentStep.stepKey
      }
      const sourceSyncStatus = sourceSyncObj.status.status;
      if (sourceSyncStatus === SOURCE_SYNC_STATUS.REGISTERED) {
        const isMultipleStepProcess = INTEGRATION_QUERY_PARAMS.multipleStepProcess in router.query;
        if (isMultipleStepProcess) {
          const matchPlatformUsersPage = `${resolveRoute(
            ROUTES.management.integrations.sourceSync.usersMatch,
            sourceSyncObj.projectManagementId,
            sourceSyncObj.id,
          )}${isMultipleStepProcess ? `?${INTEGRATION_QUERY_PARAMS.multipleStepProcess}` : ''}`;
          setTimeout(() => {
            router.push(matchPlatformUsersPage);
          }, 500);
        } else {
          window.opener.postMessage({ type: INTERCOMMUNICATION_KEYS.sourceSyncConfigCompleted, data: sourceSyncResponse }, window.location.origin);
          setTimeout(() => {
            window.close();
          }, 1000);
        }
      } else {
        dispatch(isProcessing(false));
      }
    } else {
      dispatch(wasSubmitted(true));
    }
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
