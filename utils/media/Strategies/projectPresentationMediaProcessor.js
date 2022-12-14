import presentationSectionMediaProcessor from './presentationSectionMediaProcessor';

export default async (projectPresentation) => {
  if (projectPresentation.sections) {
    projectPresentation.sections = await Promise.all(
      projectPresentation.sections.map(async (s) => {
        return presentationSectionMediaProcessor(s);
      })
    );
  }
  return projectPresentation;
};
