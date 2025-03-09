const REPLACE_SOURCE_SYNC = 'ManagementIntegrationList/REPLACE_SOURCE_SYNC';

export const replaceSourceSync = (payload) => ({
  type: REPLACE_SOURCE_SYNC,
  payload,
});

const INITIAL_STATE = {
  collection: [],
  metadata: null,
  actions: {},
};

export const generateInitialState = (hateoasCollectionDto) => {
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
    case REPLACE_SOURCE_SYNC:
      return {
        ...state,
        collection: { ...state.collection, [action.payload.source]: action.payload },
      };
    default:
      return state;
  }
};

export default ManagementIntegrationListReducer;
