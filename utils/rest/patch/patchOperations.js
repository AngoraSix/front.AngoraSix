export const PATCH_SUPPORTED_OPERATIONS = {
  ADD: 'add',
  REMOVE: 'remove',
};

const checkSupportedOperation = (operation) =>
  Object.values(PATCH_SUPPORTED_OPERATIONS).includes(operation)
    ? operation
    : undefined;

const OPERATIONS_PATH_HANDLING = {
  [PATCH_SUPPORTED_OPERATIONS.ADD]: (field) => `/${field}/-`,
  [PATCH_SUPPORTED_OPERATIONS.REMOVE]: (field) => `/${field}/-`,
};

export default (operation, field, value) => [
  {
    op: checkSupportedOperation(operation),
    path: OPERATIONS_PATH_HANDLING[operation](field),
    value,
  },
];
