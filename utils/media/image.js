import { INPUT_FIELD_TYPES } from '../../constants';
import Media from '../../models/Media';

const _readImageFile = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  });
};

const _getImageSrc = (file) => {
  let src = null;
  if (file) {
    if (typeof file === 'object' && file.blob) {
      src = file.blob;
    } else if (typeof file === 'string') {
      src = file;
    }
  }
  return src;
};

const _loadImageSrc = async (imageFile) => {
  let newImageSrc = imageFile ? _getImageSrc(imageFile) : null;
  try {
    if (!newImageSrc) {
      newImageSrc = await _readImageFile(imageFile);
    }
  } catch (err) {
    // do nothing.
  }
  return newImageSrc;
};

export const processImage = async (mediaDataElement) => {
  const blobURL = await _loadImageSrc(mediaDataElement);
  mediaDataElement.blob = blobURL;
  return new Media(
    {mediaType: INPUT_FIELD_TYPES.IMAGE,
    key: mediaDataElement.name,
    thumbnailUrl: blobURL,
    resourceId: null,
    file: mediaDataElement}
  );
};

export const isImage = (mediaDataElement) => {
  return (
    mediaDataElement instanceof File &&
    mediaDataElement.type?.startsWith('image/')
  );
};
