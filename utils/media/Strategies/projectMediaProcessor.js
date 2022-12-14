import projectPresentationMediaProcessor from './projectPresentationMediaProcessor';

export default async (project) => {
  if (project.presentations?.length) {
    project.presentations = await Promise.all(
      project.presentations.map((pr) => projectPresentationMediaProcessor(pr))
    );
  }
  return project;
};
