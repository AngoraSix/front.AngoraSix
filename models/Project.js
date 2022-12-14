import { createObjectFromFlatParams } from '../utils/helpers';

export default class Project {
  constructor({ id, name, adminId }) {
    this.id = id;
    this.name = name;
    this.adminId = adminId;
  }

  static fromFormData(formData) {
    let projectObject = createObjectFromFlatParams(formData);
    return new Project(projectObject);
  }

  toFormData(fieldSuffix = '') {
    return Object.assign(
      {
        [`${fieldSuffix}id`]: this.id,
        [`${fieldSuffix}name`]: this.name,
        [`${fieldSuffix}adminId`]: this.adminId,
      },
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      adminId: this.adminId,
    };
  }
}
