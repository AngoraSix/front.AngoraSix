import { REQUIRED_SECTIONS } from './ProjectManagementForm.properties';

const UPDATE_FIELDS = 'ProjectManagementForm/UPDATE_FIELDS';
const UPDATE_FORM_WAS_SUBMITTED =
  'ProjectManagementForm/UPDATE_FORM_WAS_SUBMITTED';
const UPDATE_COMPLETED_FORM_SECTION =
  'ProjectManagementForm/UPDATE_COMPLETED_FORM_SECTION';

export const updateFieldsAction = (payload) => ({
  type: UPDATE_FIELDS,
  payload,
});

export const updateFormWasSubmitted = (payload) => ({
  type: UPDATE_FORM_WAS_SUBMITTED,
  payload,
});

export const updatedCompletedFormSection = (section, isCompleted) => ({
  type: UPDATE_COMPLETED_FORM_SECTION,
  payload: { section, isCompleted },
});

export const INITIAL_STATE = {
  formData: {
    status: 'idea',
    bylaws: [],
  },
  completedSections: {
    [REQUIRED_SECTIONS.CORE]: false,
    [REQUIRED_SECTIONS.SECTIONS]: false,
  },
  wasSubmitted: false,
};

const ProjectManagementFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FIELDS:
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case UPDATE_COMPLETED_FORM_SECTION:
      return {
        ...state,
        completedSections: {
          ...state.completedSections,
          [action.payload.section]: action.payload.isCompleted,
        },
      };
    case UPDATE_FORM_WAS_SUBMITTED:
      return {
        ...state,
        wasSubmitted: action.payload,
      };
    default:
      return state;
  }
};

export default ProjectManagementFormReducer;
