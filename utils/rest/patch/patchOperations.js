import JSONPatch from './JSONPatch';

export const PATCH_SUPPORTED_OPERATIONS = {
  ADD: 'add',
  REMOVE: 'remove',
  REPLACE: 'replace',
};

const checkSupportedOperation = (operation) =>
  Object.values(PATCH_SUPPORTED_OPERATIONS).includes(operation)
    ? operation
    : undefined;

const OPERATIONS_PATH_HANDLING = {
  [PATCH_SUPPORTED_OPERATIONS.ADD]: (field) => `/${field}/+`,
  [PATCH_SUPPORTED_OPERATIONS.REMOVE]: (field) => `/${field}/-`,
  [PATCH_SUPPORTED_OPERATIONS.REPLACE]: (field) => `/${field}`,
};

const createPatchBody = (operation, field, value) => [
  new JSONPatch({
    op: checkSupportedOperation(operation),
    path: OPERATIONS_PATH_HANDLING[operation](field),
    value,
  }),
];

export default createPatchBody;
