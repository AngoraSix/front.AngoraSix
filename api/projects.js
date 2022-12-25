class ProjectsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
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
}

export default ProjectsAPI;
