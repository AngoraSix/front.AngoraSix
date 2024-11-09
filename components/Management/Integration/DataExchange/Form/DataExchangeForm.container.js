import React, { useReducer } from 'react';
import DataExchange from '../../../../../models/DataExchange';
import { toType } from '../../../../../utils/helpers';
import DataExchangeForm from './DataExchangeForm.component';

import PropTypes from 'prop-types';
import DataExchangeFormReducer, {
  INITIAL_STATE,
  updateFieldsAction
} from './DataExchangeForm.reducer';

const DataExchangeFormContainer = ({ dataExchange }) => {
  const dataExchangeObj = toType(dataExchange, DataExchange);

  const currentStep = dataExchangeObj.status.steps.at(-1);
  const currentStepObj = {
    number: dataExchangeObj.status.steps.length,
    key: currentStep.stepKey
  }
  const requiredDataForStep = currentStep.requiredDataForStep;
  const formData = requiredDataForStep.map(data => ({ [data.key]: data.value }));

  const [formState, dispatch] = useReducer(DataExchangeFormReducer, {
    ...INITIAL_STATE,
    formData: { ...formData },
  });

  // // we want to support updating several fields at once => value can be an array of fields
  const onFormChange = (property) => (eventOrValue) => {
    const partialFormData =
      Array.isArray(eventOrValue) && property == null
        ? Object.assign({}, ...eventOrValue.map(([p, v]) => ({ [p]: v })))
        : {
          [property]: eventOrValue.target
            ? eventOrValue.target.value
            : eventOrValue,
        };

    dispatch(updateFieldsAction(partialFormData));
  };

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

  return (
    <DataExchangeForm
      formData={formState.formData}
      requiredStepFields={requiredDataForStep}
      source={dataExchangeObj.source}
      currentStepObj={currentStepObj}
      onFormChange={onFormChange}
    // onSubmit={onSubmit}
    // setIsSectionCompleted={setIsSectionCompleted}
    // wasSubmitted={formState.wasSubmitted}
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
