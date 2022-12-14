import api from '../../api';
import { INPUT_FIELD_TYPES } from '../../constants';
import Media from '../../models/Media';

const YOUTUBEURL_REGEX =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
const YOUTUBEID_LENGTH = 11;

const _extractId = (value) => {
  // if it's a youtube url we'll retrieve the corresponding path value, otherwise the value (valid if length is 11)
  const youtubeMatch = value.match(YOUTUBEURL_REGEX);
  const videoId = youtubeMatch ? youtubeMatch[2] : value;
  return [videoId.length == YOUTUBEID_LENGTH, videoId];
};

const _requestThumbnail = async (videoId) => {
  return await api.thirdParties.fetchYoutubeVideoTumbnail(videoId);
};

export const processYoutubeUrl = async (value) => {
  if (typeof value !== 'string') return null;
  let [isValid, id] = _extractId(value),
    videoThumbnail;
  if (isValid) {
    videoThumbnail = await _requestThumbnail(id);
  }
  return new Media({
    mediaType: INPUT_FIELD_TYPES.YOUTUBEVIDEO,
    key: id,
    thumbnailUrl: videoThumbnail,
    resourceId: id,
  });
};

export const isYoutubeURL = (text) => {
  if (typeof text !== 'string') return false;
  const [isValid] = _extractId(text);
  return isValid;
};
