import { hateoasPropertyToFieldMakerField } from '../utils/rest/hateoas/hateoasUtils';

export default class SourceSyncStatusStep {
  constructor({ stepKey, requiredDataForStep }) {
    this.stepKey = stepKey;
    this.requiredDataForStep = requiredDataForStep?.map((data) => hateoasPropertyToFieldMakerField(data));
  }

  toFormData(fieldSuffix = '') {
    return {
      [`${fieldSuffix}stepKey`]: this.stepKey,
      [`${fieldSuffix}requiredDataForStep`]: JSON.stringify(this.requiredDataForStep),
    };
  }

  toJSON() {
    return {
      stepKey: this.stepKey,
      requiredDataForStep: this.requiredDataForStep,
    };
  }
}
