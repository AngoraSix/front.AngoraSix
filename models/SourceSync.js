import {
  toType
} from '../utils/helpers';
import { processHateoasActions } from '../utils/rest/hateoas/hateoasUtils';
import SourceSyncConfig from './SourceSyncConfig';
import SourceSyncStatus from './SourceSyncStatus';

export default class SourceSync {
  #status;
  #config;
  constructor(object) {
    const { source, projectManagementId, status, config, id } = object;
    this.id = id;
    this.source = source?.toLowerCase();
    this.projectManagementId = projectManagementId;
    this.status = status;
    this.config = config;
    this.actions = processHateoasActions(object);
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

  /**
   * @param {SourceSyncConfig} config
   */
  set config(config) {
    this.#config = toType(config, SourceSyncConfig, true);
  }

  get config() {
    return this.#config;
  }
}

