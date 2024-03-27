import { processHateoasActions } from './hateoasUtils';

export default class HateoasCollectionDto {
  constructor(hateoasResponse = {}, Type, embeddedField) {
    this.collection = processHateoasCollection(
      hateoasResponse,
      Type,
      embeddedField
    );
    this.actions = processHateoasActions(hateoasResponse);
    this.metadata = new HateoasCollectionMetadata(hateoasResponse.page);
  }
}

export class HateoasCollectionMetadata {
  constructor(metadata = {}) {
    this.totalToRead = metadata.totalToRead;
    this.size = metadata.size;
    this.totalElements = metadata.totalElements;
    this.totalPages = metadata.totalPages;
    this.number = metadata.number;
    this.extraSkip = metadata.extraSkip;
  }
}

const processHateoasCollection = (
  hateoasResponse = {},
  Type,
  embeddedField
) => {
  const embedded = hateoasResponse._embedded || {};
  const collection =
    (embeddedField
      ? embedded[embeddedField]
      : embedded[Object.keys(embedded)[0]]) || [];
  return Type ? collection.map((value) => new Type(value)) : collection;
};
