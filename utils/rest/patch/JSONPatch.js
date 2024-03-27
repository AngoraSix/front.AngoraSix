import { PATCH_SUPPORTED_OPERATIONS } from './patchOperations';

export default class JSONPatch {
  constructor({ op, path, value }) {
    if (!Object.values(PATCH_SUPPORTED_OPERATIONS).includes(op))
      throw new Error(`Unsupported JSONPatch operation: ${op}`);
    this.op = op;
    this.path = path;
    this.value = value;
  }

  toFormData() {
    return this;
  }
}
