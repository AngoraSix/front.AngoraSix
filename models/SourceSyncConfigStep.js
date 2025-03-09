import { hateoasPropertyToFieldMakerField } from '../utils/rest/hateoas/hateoasUtils';

export default class SourceSyncStatusStep {
  constructor({ stepKey, requiredDataForStep }) {
    this.stepKey = stepKey;
    this.requiredDataForStep = requiredDataForStep?.map((data) => hateoasPropertyToFieldMakerField(data));
  }
}
