import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class ProjectManagementTasksAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async resolveProjectManagementTasks(projectManagementId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get(
      `/project-management/${projectManagementId}/stats`,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    );
    return data;
  }
}

export default ProjectManagementTasksAPI;
