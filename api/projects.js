class ProjectsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
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

  async getProjectManagement(projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const { data } = await this.axios.get(
      `/${projectId}/management`,
      {
        headers: {
          ...headers,
          ...authHeaders,
        },
      }
    );
    return data;
  }

  async saveProjectManagement(
    projectManagement,
    projectManagementId,
    projectId,
    token
  ) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);

    const { data } = await this.axios[projectManagementId ? 'put' : 'post'](
      `/${projectId}/management/${projectManagementId || ''}`,
      projectManagement,
      {
        headers: {
          ...headers,
          ...authHeaders,
        },
      }
    );
    return data;
  }
}

export default ProjectsAPI;
