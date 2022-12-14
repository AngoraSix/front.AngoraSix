export const LOAD_APP_DATA = 'APP/LOAD_APP_DATA';
export const SET_IS_LOADING = 'APP/SET_IS_LOADING';

export const loadAppData = (payload = {}) => ({ type: LOAD_APP_DATA, payload });
export const appIsLoading = (payload = false) => ({
  type: SET_IS_LOADING,
  payload,
});

const INITIAL_STATE = {
  isLoading: false,
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_APP_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
