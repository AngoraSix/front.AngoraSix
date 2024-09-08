import { obtainInfraHeaders } from '../utils/infra';
import config from '../config';

class ProjectManagementIntegrationsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async listIntegrationsForProjectManagement(projectManagementId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get(`/project-management/${projectManagementId}`, {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    });
    return data;
  }
}

export default ProjectManagementIntegrationsAPI;
