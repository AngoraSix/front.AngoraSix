const REPLACE_INTEGRATION = 'ManagementIntegration/REPLACE_INTEGRATION';

export const replaceIntegration = (payload) => ({
  type: REPLACE_INTEGRATION,
  payload,
});

const INITIAL_STATE = {
  collection: [],
  metadata: null,
  actions: {},
};

export const generateInitialState = (hateoasCollectionDto) =>{
  const mappedHateoasCollection = {
    collection: hateoasCollectionDto.collection.reduce((acc, item) => {
      acc[item.source] = item;
      return acc;
    }, {})
  }
  return {
    ...INITIAL_STATE,
    ...mappedHateoasCollection
  };
};

const ManagementIntegrationListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REPLACE_INTEGRATION:
      return {
        ...state,
        collection: { ...state.collection, [action.payload.source]: action.payload },
      };
    default:
      return state;
  }
};

export default ManagementIntegrationListReducer;
