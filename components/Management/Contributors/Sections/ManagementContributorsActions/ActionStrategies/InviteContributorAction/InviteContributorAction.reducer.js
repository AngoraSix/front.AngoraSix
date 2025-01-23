
const UPDATE_FIELD = 'InviteContributorAction/UPDATE_FIELD';
const FORM_WAS_SUBMITTED =
  'InviteContributorAction/FORM_WAS_SUBMITTED';
const SET_DIALOG_OPENED =
  'InviteContributorAction/SET_DIALOG_OPENED';

export const updateFieldAction = (payload) => ({
  type: UPDATE_FIELD,
  payload,
});

export const wasSubmitted = (payload) => ({
  type: FORM_WAS_SUBMITTED,
  payload,
});

export const setDialogOpened = (payload) => ({
  type: SET_DIALOG_OPENED,
  payload,
});


export const INITIAL_STATE = {
  formData: {},
  wasSubmitted: false,
  openedDialog: false
};

const InviteContributorActionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case FORM_WAS_SUBMITTED:
      return {
        ...state,
        wasSubmitted: action.payload,
      };
    case SET_DIALOG_OPENED:
      return {
        ...state,
        openedDialog: action.payload,
      };
    default:
      return state;
  }
};

export default InviteContributorActionReducer;
