
const UPDATE_STEP_FIELDS = 'DataExchangeFormForm/UPDATE_STEP_FIELDS';
const FORM_WAS_SUBMITTED =
  'DataExchangeFormForm/FORM_WAS_SUBMITTED';
const PROCESSING_FORM =
  'DataExchangeFormForm/PROCESSING_FORM';

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

export const INITIAL_STATE = {
  formData: {},
  wasSubmitted: false,
  isProcessing: false,
  currentStepIndex: 0
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
    default:
      return state;
  }
};

export default DataExchangeFormFormReducer;
