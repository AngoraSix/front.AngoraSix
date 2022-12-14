class ProjectsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async fetchProjectPresentations(attributes) {
    const { data: projectPresentationdata } = await this.axios.get(
      `/presentations?${attributes}`
    );
    return projectPresentationdata;
  }

  async fetchProjects(attributes = {}, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const { data: projectData } = await this.axios.get(`/core`, {
      params: attributes,
      headers: {
        ...headers,
        ...authHeaders,
      },
    });
    return projectData;
  }

  async saveProject(project, token, projectId) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);

    let projectPresentations = project.presentations;
    delete project.presentations;

    const { data: savedProject } = await this.axios[projectId ? 'put' : 'post'](
      `/core/${projectId || ''}`,
      project,
      {
        headers: {
          ...headers,
          ...authHeaders,
        },
      }
    );

    let createdPresentations = projectPresentations;
    // we won't be saving Project Presentations if we're just updating the Project
    if (!projectId && projectPresentations) {
      createdPresentations = await Promise.all(
        projectPresentations
          .map((pr) => {
            pr.projectId = savedProject.id;
            return pr;
          })
          .map((pr) =>
            this.saveProjectPresentation(pr, null, savedProject.id, token)
          )
      );
    }
    return { ...savedProject, presentations: createdPresentations };
  }

  async saveProjectPresentation(
    projectPresentation,
    projectPresentationId,
    projectId,
    token
  ) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);

    const { data } = await this.axios[projectPresentationId ? 'put' : 'post'](
      `/${projectId}/presentations/${projectPresentationId || ''}`,
      projectPresentation,
      {
        headers: {
          ...headers,
          ...authHeaders,
        },
      }
    );
    return data;
  }

  async getProjectPresentation(projectPresentationId, projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const { data } = await this.axios.get(
      `/${projectId}/presentations/${projectPresentationId}`,
      {
        headers: {
          ...headers,
          ...authHeaders,
        },
      }
    );
    return data;
  }

  async getProject(projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const { data } = await this.axios.get(`/core/${projectId}`, {
      headers: {
        ...headers,
        ...authHeaders,
      },
    });
    return data;
  }
}

export default ProjectsAPI;
