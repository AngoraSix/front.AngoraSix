
import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class ProjectsCoreAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getProject(projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get(`/${projectId}`, {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    });
    return data;
  }

  async saveProject(project, token, projectId) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      this.axios.getBaseURL()
    );


    const { data } = await this.axios[projectId ? 'put' : 'post'](
      `/${projectId || ''}`,
      project,
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

export default ProjectsCoreAPI;
