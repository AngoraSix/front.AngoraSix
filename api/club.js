import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class ClubsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getWellKnownClub(projectId, clubType, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get(
      `/clubs/well-known/${projectId}/${clubType}`,
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

export default ClubsAPI;
