import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import DataExchange from '../../../../../models/DataExchange';
import { toType } from '../../../../../utils/helpers';
import DataExchangeForm from './DataExchangeForm.component';
import DataExchangeFormReducer, {
  INITIAL_STATE,
  isProcessing,
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
    currentStepIndex
  });

  // // we want to support updating several fields at once => value can be an array of fields
  const onFormChange = (stepIndex, property) => (eventOrValue) => {
    const partialFormData =
      Array.isArray(eventOrValue) && property == null
        ? Object.assign({}, ...eventOrValue.map(([p, v]) => ({ [p]: v })))
        : {
          [property]: eventOrValue.target
            ? eventOrValue.target.value
            : eventOrValue,
        };

    dispatch(updateFieldsAction({ [stepIndex]: partialFormData }));
  };

  const onContinueExchange = () => {
    dispatch(isProcessing(true));
    if (requiredDataForStep.every(item => {
      const stepFormData = formState.formData[formState.currentStepIndex]
      return Object.hasOwn(stepFormData, item.key) && stepFormData[item.key] != null && stepFormData[item.key] != '';
    })) {
      console.log("@TODO SEGUIR ACA");
    } else {
      dispatch(wasSubmitted(true));
    }
    dispatch(isProcessing(false));
  }

  // const setIsSectionCompleted = (section) => (isCompleted) => {
  //   dispatch(updatedCompletedFormSection(section, isCompleted));
  // };

  // const onSubmit = async () => {
  //   doLoad(true);
  //   if (Object.values(formState.completedSections).some((v) => !v)) {
  //     dispatch(updateFormWasSubmitted(true));
  //   } else {
  //     try {
  //       let dataExchangeToSubmit = DataExchange.fromFormData(
  //         formState.formData
  //       );
  //       dataExchangeToSubmit.completeRequiredFields(project);
  //       //@TODO check required fields or trigger error

  //       const dataExchangeResponse = await api.front.saveDataExchange(
  //         dataExchangeToSubmit,
  //         dataExchange?.id,
  //         project.id
  //       );

  //       onSuccess(
  //         t('management.edit.form.notifications.success.saved')
  //       );

  //       const viewURL = isTriggeredAction
  //         ? resolveRoute(ROUTES.projects.edit, project.id)
  //         : resolveRoute(
  //             ROUTES.projects.management.view,
  //             dataExchangeResponse.projectId,
  //             dataExchangeResponse.id
  //           );
  //       router.push(viewURL);
  //     } catch (err) {
  //       logger.error(err);
  //       onError('Error Saving Project Management');
  //     }
  //   }
  //   doLoad(false);
  // };

  const actionFns = {
    onContinueExchange
  }

  return (
    <DataExchangeForm
      formData={formState.formData}
      requiredStepFields={requiredDataForStep}
      source={dataExchangeObj.source}
      currentStepObj={currentStepObj}
      onFormChange={onFormChange}
      actions={dataExchangeObj.actions}
      actionFns={actionFns}
      wasSubmitted={formState.wasSubmitted}
      isProcessing={formState.isProcessing}
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
