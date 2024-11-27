import {
  createObjectFromFlatParams,
  createObjectWithFlatParams,
  toType,
} from '../utils/helpers';
import { processHateoasActions } from '../utils/rest/hateoas/hateoasUtils';
import SourceSyncStatus from './SourceSyncStatus';
import moment from 'moment';

export default class SourceSync {
  #status;
  constructor(object) {
    const { source, integrationId, status, id } = object;
    this.source = source?.toLowerCase();
    this.integrationId = integrationId;
    this.status = status;
    this.id = id;
    this.actions = processHateoasActions(object);
  }

  static fromFormData(formData) {
    let projectObject = createObjectFromFlatParams(formData);
    return new SourceSync(projectObject);
  }

  toFormData() {
    createObjectWithFlatParams(this);
  }

  /**
   * @param {SourceSyncStatus} status
   */
  set status(status) {
    this.#status = toType(status, SourceSyncStatus, true);
  }

  get status() {
    return this.#status;
  }

  toFormData(fieldSuffix = '') {
    return {
      [`${fieldSuffix}id`]: this.id,
      [`${fieldSuffix}source`]: this.source,
      [`${fieldSuffix}integrationId`]: this.integrationId,
      [`${fieldSuffix}status`]: this.status?.toFormData(),
    };
  }

  toJSON() {
    return {
      id: this.id,
      source: this.source,
      integrationId: this.integrationId,
      status: this.status,
    };
  }
}

