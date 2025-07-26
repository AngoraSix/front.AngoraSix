
import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

/**
 * API for managing project management data.
 * 
 * BaseURL: /projects (add /{projectId}/management for per-Project, or /management/*)
 */
class ProjectsManagementAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getProjectManagement(managementId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const response = await this.axios.get(
      `/management/${managementId}`,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    );
    return response.data
  }

  async getProjectManagementForProject(projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const response = await this.axios.get(
      `/${projectId}/management`,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
        validateStatus: function (status) {
          return (status >= 200 && status < 300) || status === 404; // Accept 404 for non-existing management
        }
      }
    );
    return response;
  }

  async saveProjectManagement(
    projectManagement,
    projectManagementId,
    projectId,
    token
  ) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      this.axios.getBaseURL()
    );

    const { data } = await this.axios[projectManagementId ? 'put' : 'post'](
      projectManagementId ? `/${projectManagementId}` : `/${projectId}/management`,
      projectManagement,
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

export default ProjectsManagementAPI;