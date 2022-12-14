import { uploadMedia } from '../mediaProcessor';

export default async (presentationSection) => {
  const sectionMedia = presentationSection.media || [];
  const [uploadedMainMedia, ...uploadedMedia] = await Promise.all([
    uploadMedia(presentationSection.mainMedia),
    ...sectionMedia.map((m) => uploadMedia(m)),
  ]);
  presentationSection.mainMedia = uploadedMainMedia;
  presentationSection.media = uploadedMedia;
  return presentationSection;
};
