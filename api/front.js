class FrontAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async saveProjectManagement(
    projectManagementBody,
    projectManagementId,
    projectId
  ) {
    const { data } = projectManagementId
      ? await this.axios.put(
          `api/projects/${projectId}/management/${projectManagementId}`,
          projectManagementBody
        )
      : await this.axios.post(
          `api/projects/${projectId}/management`,
          projectManagementBody
        );
    return data;
  }
}

export default FrontAPI;
