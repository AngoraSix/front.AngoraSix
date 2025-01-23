const REPLACE_INTEGRATION = 'ManagementIntegrationList/REPLACE_INTEGRATION';
const REPLACE_INTEGRATION_SOURCE_SYNC = 'ManagementIntegrationList/REPLACE_INTEGRATION_SOURCE_SYNC';

export const replaceIntegration = (payload) => ({
  type: REPLACE_INTEGRATION,
  payload,
});

export const replaceIntegrationSourceSync = (payload) => ({
  type: REPLACE_INTEGRATION_SOURCE_SYNC,
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
    case REPLACE_INTEGRATION:
      return {
        ...state,
        collection: { ...state.collection, [action.payload.source]: action.payload },
      };
    case REPLACE_INTEGRATION_SOURCE_SYNC:
      const sourceKey = action.payload.source
      const stateIntegration = state.collection[sourceKey];
      return {
        ...state,
        collection: {
          ...state.collection,
          [sourceKey]: {
            ...stateIntegration,
            sourceSync: action.payload
          }
        },
      };
    default:
      return state;
  }
};

export default ManagementIntegrationListReducer;
