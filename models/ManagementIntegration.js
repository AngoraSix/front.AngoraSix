import {
  createObjectFromFlatParams,
  createObjectWithFlatParams,
  toType,
} from '../utils/helpers';
import { processHateoasActions } from '../utils/rest/hateoas/hateoasUtils';
import ManagementIntegrationConfig from './ManagementIntegrationConfig';
import ManagementIntegrationStatus from './ManagementIntegrationStatus';
import SourceSync from './SourceSync';

export default class ManagementIntegration {
  #status;
  #config;
  #sourceSync;
  constructor(object) {
    const { source, projectManagementId, status, config, sourceSync, id } = object;
    this.source = source?.toLowerCase();
    this.projectManagementId = projectManagementId;
    this.status = status;
    this.config = config;
    this.sourceSync = sourceSync;
    this.id = id;
    this.actions = processHateoasActions(object);
  }

  static fromFormData(formData) {
    let projectObject = createObjectFromFlatParams(formData);
    return new ManagementIntegration(projectObject);
  }

  toFormData() {
    createObjectWithFlatParams(this);
  }

  /**
   * @param {ManagementIntegrationStatus} status
   */
  set status(status) {
    this.#status = toType(status, ManagementIntegrationStatus, true);
  }

  get status() {
    return this.#status;
  }

  /**
   * @param {ManagementIntegrationConfig} status
   */
  set config(config) {
    this.#config = toType(config, ManagementIntegrationConfig, true);
  }

  get config() {
    return this.#config;
  }

  /**
   * @param {SourceSync} status
   */
  set sourceSync(sourceSync) {
    this.#sourceSync = toType(sourceSync, SourceSync, true);
  }

  get sourceSync() {
    return this.#sourceSync;
  }

  toFormData(fieldSuffix = '') {
    return {
      [`${fieldSuffix}id`]: this.id,
      [`${fieldSuffix}source`]: this.source,
      [`${fieldSuffix}projectManagementId`]: this.projectManagementId,
      [`${fieldSuffix}status`]: this.status?.toFormData(),
      [`${fieldSuffix}config`]: this.config.toFormData(),
      [`${fieldSuffix}sourceSync`]: this.sourceSync.toFormData(),
    };
  }

  toJSON() {
    return {
      id: this.id,
      source: this.source,
      projectManagementId: this.projectManagementId,
      status: this.status,
      config: this.config,
      sourceSync: this.sourceSync,
    };
  }
}

