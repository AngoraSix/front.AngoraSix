export default class Bylaw {
  constructor({ scope, definition }) {
    this.scope = scope;
    this.definition = definition;
  }

  completeRequiredFields(project) {}

  // Media is processed as a whole in a form, we don't update indivdual fields
  toFormData(fieldSuffix = '') {
    return {
      [`${fieldSuffix}scope`]: this.scope,
      [`${fieldSuffix}definition`]: this.definition,
    };
  }

  toJSON() {
    return {
      scope: this.scope,
      definition: this.definition,
    };
  }
}
