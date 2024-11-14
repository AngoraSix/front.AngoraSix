
const UPDATE_STEP_FIELDS = 'DataExchangeFormForm/UPDATE_STEP_FIELDS';
const FORM_WAS_SUBMITTED =
  'DataExchangeFormForm/FORM_WAS_SUBMITTED';
const PROCESSING_FORM =
  'DataExchangeFormForm/PROCESSING_FORM';
const NEW_STEP = 'DataExchangeFormForm/NEW_STEP';

export const updateFieldsAction = (payload) => ({
  type: UPDATE_STEP_FIELDS,
  payload,
});

export const wasSubmitted = (payload) => ({
  type: FORM_WAS_SUBMITTED,
  payload,
});

export const isProcessing = (payload) => ({
  type: PROCESSING_FORM,
  payload,
});

export const newStep = (payload) => ({
  type: NEW_STEP,
  payload,
});

export const INITIAL_STATE = {
  formData: {},
  actions: {},
  wasSubmitted: false,
  isProcessing: false,
  dataExchangeStatus: '',
  currentStepObj: {
    index: 0,
    key: '',
  }
};

const DataExchangeFormFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_STEP_FIELDS:
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case FORM_WAS_SUBMITTED:
      return {
        ...state,
        wasSubmitted: action.payload,
      };
    case PROCESSING_FORM:
      return {
        ...state,
        isProcessing: action.payload,
      };
    case NEW_STEP:
      const { actions, requiredDataForStep, dataExchangeStatus, currentStepObj } = action.payload;
      const currentStepIndex = state.currentStepObj.index + 1;
      return {
        ...state,
        currentStepIndex,
        dataExchangeStatus,
        requiredDataForStep,
        actions,
        currentStepObj,
        formData: {
          ...state.formData,
          [currentStepIndex]: {}
        },
        wasSubmitted: false,
      };
    default:
      return state;
  }
};

export default DataExchangeFormFormReducer;
