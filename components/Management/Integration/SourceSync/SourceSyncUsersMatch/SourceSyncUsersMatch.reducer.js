const UPDATE_MATCH = 'SourceSyncUsersMatch/UPDATE_MATCH';
const SETUP_STATE = 'SourceSyncUsersMatch/SETUP_STATE';

export const updateContributorMatchAction = (payload) => ({
  type: UPDATE_MATCH,
  payload,
});

export const setupState = (payload) => ({
  type: SETUP_STATE,
  payload,
});

export const INITIAL_STATE = {
  matches: {},
  initialized: false
};

const SourceSyncUsersMatchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_MATCH:
      const mergedMatches = { ...state.matches };
      Object.keys(action.payload).forEach(key => {
        // Merge the update into the original object for that key.
        mergedMatches[key] = {
          ...mergedMatches[key],
          ...action.payload[key]
        };
      });
      return {
        ...state,
        matches: mergedMatches,
      };
    case SETUP_STATE:
      const { userMatchingFieldSpecs, contributorsData } = action.payload;
      const fields = userMatchingFieldSpecs.collection.reduce((acc, fieldSpec) => {
        const contributorData = contributorsData.find(contributor => contributor.id === fieldSpec.name)
        const value = fieldSpec.options?.selectedValues[0]
        acc[fieldSpec.name] = {
          value,
          contributorData,
          options: fieldSpec.options,
          selectedIndex: fieldSpec.options?.inline?.findIndex(option => option.value === value),
        };
        return acc;
      }, {});
      return {
        ...state,
        matches: { ...fields },
        initialized: true,
      };
    default:
      return state;
  }
};

export default SourceSyncUsersMatchReducer;
