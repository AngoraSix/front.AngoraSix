export default class Media {
  constructor({ mediaType, key, thumbnailUrl = '', resourceId, file, url }) {
    this.mediaType = mediaType;
    this.resourceId = resourceId || thumbnailUrl;
    this.thumbnailUrl = thumbnailUrl;
    this.file = file;
    this.key = `${mediaType}-${key || resourceId}`;
    this.url = url; // if url is set it means Media is already uploaded
  }

  completeRequiredFields() {
    delete this.file;
  }

  static isMedia(object) {
    if (
      object == null ||
      !object instanceof Media ||
      !(typeof object === 'object' && !Array.isArray(object))
    ) {
      return false;
    }
    return !!object.mediaType;
  }

  static isMedia(object) {
    if (
      object == null ||
      !object instanceof Media ||
      !(typeof object === 'object' && !Array.isArray(object))
    ) {
      return false;
    }
    return !!object.mediaType;
  }

  toFormData() {
    return this;
  }
}
