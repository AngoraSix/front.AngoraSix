import {
  createObjectFromFlatParams,
  createObjectWithFlatParams,
  toType,
} from '../utils/helpers';
import Project from './Project';

export default class ProjectManagement {
  #project;
  constructor({ id, constitution, projectId, project, status }) {
    this.id = id;
    this.constitution = constitution;
    this.projectId = projectId;
    this.project = project;
    this.status = status;
  }

  static fromFormData(formData) {
    let projectManagementObject = createObjectFromFlatParams(formData);
    return new ProjectManagement(projectManagementObject);
  }

  completeRequiredFields(project) {
    this.projectId = this.projectId || project.id;
  }

  toFormData() {
    return createObjectWithFlatParams(this);
  }

  /**
   * @param {Project} project
   */
  set project(project) {
    this.#project = toType(project, Project, true);
  }

  get project() {
    return this.#project;
  }

  toFormData(fieldSuffix = '') {
    return {
      [`${fieldSuffix}id`]: this.id,
      [`${fieldSuffix}constitution`]: this.constitution?.toFormData(),
      [`${fieldSuffix}projectId`]: this.projectId,
      [`${fieldSuffix}project`]: this.project?.toFormData(),
      [`${fieldSuffix}status`]: this.status,
    };
  }

  toJSON() {
    return {
      id: this.id,
      constitution: this.constitution,
      status: this.status,
      projectId: this.projectId,
      project: this.project,
    };
  }
}
