import {
  createObjectFromFlatParams,
  createObjectWithFlatParams,
  toType,
} from '../utils/helpers';
import Bylaw from './Bylaw';

export default class Constitution {
  #bylaws;
  constructor({ bylaws }) {
    this.bylaws = bylaws;
  }

  static fromFormData(formData) {
    let constitutionObject = createObjectFromFlatParams(formData);
    return new Constitution(constitutionObject);
  }

  completeRequiredFields() {}

  toFormData() {
    return createObjectWithFlatParams(this);
  }

  /**
   * @param {Bylaw} bylaws
   */
  set bylaws(bylaws) {
    this.#bylaws = toType(bylaws, Bylaw);
  }

  get bylaws() {
    return this.#bylaws;
  }

  toFormData(fieldSuffix = '') {
    return Object.assign(
      {},
      ...(this.bylaws?.flatMap((s, i) =>
        s.toFormData(`${fieldSuffix}bylaws[${i}].`)
      ) || [])
    );
  }

  toJSON() {
    return {
      bylaws: this.bylaws,
    };
  }
}
