import {
  toType
} from '../utils/helpers';
import { processHateoasActions } from '../utils/rest/hateoas/hateoasUtils';

export default class InlineFieldSpec {
  #options;
  constructor(object) {
    const { name, type, options, promptData } = object;
    this.name = name;
    this.type = type;
    this.options = options;
    this.actions = processHateoasActions(object);
    this.promptData = promptData;
  }

  /**
   * @param {InlineFieldOptions} options
   */
  set options(options) {
    this.#options = toType(options, InlineFieldOptions, true);
  }

  get options() {
    return this.#options;
  }
}


class InlineFieldOptions {
  constructor({ selectedValues, inline }) {
    this.selectedValues = selectedValues;
    this.inline = inline?.map((i) => new OptionSpec(i));
  }
}

class OptionSpec {
  constructor({ prompt, value, promptData }) {
    this.prompt = prompt;
    this.value = value;
    this.promptData = promptData;
  }
}


