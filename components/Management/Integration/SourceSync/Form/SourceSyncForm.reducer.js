
const UPDATE_STEP_FIELDS = 'SourceSyncFormForm/UPDATE_STEP_FIELDS';
const FORM_WAS_SUBMITTED =
  'SourceSyncFormForm/FORM_WAS_SUBMITTED';
const PROCESSING_FORM =
  'SourceSyncFormForm/PROCESSING_FORM';
const NEW_STEP = 'SourceSyncFormForm/NEW_STEP';

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
  sourceSyncStatus: '',
  currentStepObj: {
    index: 0,
    key: '',
  }
};

const SourceSyncFormFormReducer = (state = INITIAL_STATE, action) => {
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
      const { actions, requiredDataForStep, sourceSyncStatus, currentStepObj } = action.payload;
      const currentStepIndex = state.currentStepObj.index + 1;
      return {
        ...state,
        currentStepIndex,
        sourceSyncStatus,
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

export default SourceSyncFormFormReducer;
