import api from '../../api';
import config from '../../config';
import { MEDIA_TYPES } from '../../constants';
import Media from '../../models/Media';
import PresentationSection from '../../models/PresentationSection';
import Project from '../../models/Project';
import ProjectPresentation from '../../models/ProjectPresentation';
import logger from '../logger';
import { isImage, processImage } from './image';
import presentationSectionUploadAllMedia from './Strategies/presentationSectionMediaProcessor';
import projectUploadAllMedia from './Strategies/projectMediaProcessor';
import projectPresentationUploadAllMedia from './Strategies/projectPresentationMediaProcessor';
import { isYoutubeURL, processYoutubeUrl } from './youtube';

export const uploadMedia = async (media) => {
  const file = media.file;
  let resourceId = media.resourceId;
  let thumbnailUrl = media.thumbnailUrl;
  let mediaURL = media.url;
  if (!media.url) {
    if (file && (file instanceof File || typeof file === 'object')) {
      [mediaURL, thumbnailUrl] = await api.front.uploadFile(file);
      resourceId = mediaURL.split('/').pop();
    } else if (media.mediaType === MEDIA_TYPES.VIDEO_YOUTUBE) {
      const resolvedEmbedUrl =
        config.thirdParties.youtube.embedUrlPattern.replace(
          ':resourceId',
          media.resourceId
        );
      mediaURL = resolvedEmbedUrl;
    }
  }
  return new Media({
    mediaType: media.mediaType,
    url: mediaURL,
    thumbnailUrl,
    resourceId,
  });
};

export const uploadAllMedia = (model) => {
  switch (true) {
    case model instanceof Project:
      return projectUploadAllMedia(model);
    case model instanceof ProjectPresentation:
      return projectPresentationUploadAllMedia(model);
    case model instanceof PresentationSection:
      return presentationSectionUploadAllMedia(model);
    default:
      logger.error(
        `Error - Trying to upload Media for: ${JSON.stringify(model)}`
      );
  }
};

const _processInputElement = async (mediaDataElement, allowedMediaTypes) => {
  if (mediaDataElement instanceof Media) {
    return mediaDataElement;
  }

  if (
    isImage(mediaDataElement) &&
    allowedMediaTypes.includes(MEDIA_TYPES.IMAGE)
  ) {
    return processImage(mediaDataElement);
  }
  if (
    isYoutubeURL(mediaDataElement) &&
    allowedMediaTypes.includes(MEDIA_TYPES.VIDEO_YOUTUBE)
  ) {
    return processYoutubeUrl(mediaDataElement);
  }
};
// Resolve media depending on different output, always retrieves an array
const resolveToMediaArray = async (mediaInput = [], allowedMediaTypes = []) => {
  mediaInput =
    Array.isArray(mediaInput) || mediaInput instanceof FileList
      ? Array.from(mediaInput)
      : [mediaInput];
  return (
    await Promise.all(
      mediaInput.map((m) => _processInputElement(m, allowedMediaTypes))
    )
  ).filter((media) => !!media);
};

export default resolveToMediaArray;
