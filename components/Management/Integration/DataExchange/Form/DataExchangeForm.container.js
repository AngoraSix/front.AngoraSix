import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../../../../api';
import DataExchange from '../../../../../models/DataExchange';
import { toType } from '../../../../../utils/helpers';
import { INTERCOMMUNICATION_KEYS } from '../../ManagementIntegration.properties';
import DataExchangeForm from './DataExchangeForm.component';
import { DATA_EXCHANGE_STATUS } from './DataExchangeForm.properties';
import DataExchangeFormReducer, {
  INITIAL_STATE,
  isProcessing,
  newStep,
  updateFieldsAction,
  wasSubmitted
} from './DataExchangeForm.reducer';

const DataExchangeFormContainer = ({ dataExchange }) => {
  const dataExchangeObj = toType(dataExchange, DataExchange);

  const currentStepIndex = dataExchangeObj.status.steps.length - 1;
  const currentStep = dataExchangeObj.status.steps.at(currentStepIndex);
  const currentStepObj = {
    index: currentStepIndex,
    key: currentStep.stepKey
  }
  const requiredDataForStep = currentStep.requiredDataForStep;
  const formData = requiredDataForStep.map(data => ({ [data.key]: data.value }));

  const [formState, dispatch] = useReducer(DataExchangeFormReducer, {
    ...INITIAL_STATE,
    formData: { ...formData },
    actions: dataExchangeObj.actions,
    requiredDataForStep,
    currentStepObj,
    dataExchangeStatus: dataExchangeObj.status.status
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

  const onContinueExchange = async () => {
    dispatch(isProcessing(true));
    if (formState.requiredDataForStep.every(item => _hasBeenFilled(item))) {
      const dataExchangeResponse = await api.front.submitDataExchangeStep(dataExchange.id, formState.currentStepObj.index, formState.formData[formState.currentStepObj.index]);
      const dataExchangeObj = toType(dataExchangeResponse, DataExchange);
      const currentStepIndex = dataExchangeObj.status.steps.length - 1;
      const currentStep = dataExchangeObj.status.steps.at(currentStepIndex);
      const currentStepObj = {
        index: currentStepIndex,
        key: currentStep.stepKey
      }
      const dataExchangeStatus = dataExchangeObj.status.status;
      dispatch(newStep({
        actions: dataExchangeObj.actions,
        requiredDataForStep: dataExchangeObj.status.steps.at(dataExchangeObj.status.steps.length - 1).requiredDataForStep,
        dataExchangeStatus,
        currentStepObj
      }));
      if (dataExchangeStatus === DATA_EXCHANGE_STATUS.COMPLETED) {
        window.opener.postMessage({ type: INTERCOMMUNICATION_KEYS.importDataCompleted, data: dataExchangeResponse }, window.location.origin);
        setTimeout(() => {
          window.close();
        }, 3500);
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
    onContinueExchange
  }

  return (
    <DataExchangeForm
      formData={formState.formData}
      requiredStepFields={formState.requiredDataForStep}
      source={dataExchangeObj.source}
      currentStepObj={formState.currentStepObj}
      onFormChange={onFormChange}
      actions={formState.actions}
      actionFns={actionFns}
      wasSubmitted={formState.wasSubmitted}
      isProcessing={formState.isProcessing}
      dataExchangeStatus={formState.dataExchangeStatus}
    />
  );
};

DataExchangeFormContainer.defaults = {
  dataExchange: {},
};

DataExchangeFormContainer.propTypes = {
  dataExchange: PropTypes.object,
};

export default DataExchangeFormContainer;
