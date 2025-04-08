import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

const SUPPORTED_PARAMS = {
  recentPeriodDays: 'recentPeriodDays',
  sortField: 'sortField',
};

const _normalizeParams = (params, allowedKeys = Object.values(SUPPORTED_PARAMS)) => {
  // Ensure params is an object. If not, default to an empty object.
  return Object.fromEntries(
    Object.entries(params || {}).filter(
      ([key, value]) => allowedKeys.includes(key) && value !== undefined && value !== null
    )
  );
}

class ProjectManagementTasksAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async resolveProjectManagementTasks(projectManagementId, token, params) {

    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const normalizedParams = _normalizeParams(params);

    const { data } = await this.axios.get(
      `/project-management/${projectManagementId}/stats`,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
        params: normalizedParams
      }
    );
    return data;
  }
}

export default ProjectManagementTasksAPI;
