import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class ProjectManagementAccountingAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async resolveProjectManagementAccounting(projectManagementId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    console.log("ACCOUNT000");
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
    console.log("ACCOUNT");
    console.log(data);
    // const mockData = {
    //   project: {
    //     ownership: {
    //       balance: 50,
    //       currency: 'caps',
    //     },
    //     finance: [
    //       {
    //         currency: 'usd',
    //         balance: 75,
    //       },
    //     ],
    //   },
    //   contributor: {
    //     ownership: {
    //       balance: 10,
    //       currency: 'caps',
    //     },
    //     finance: [
    //       {
    //         currency: 'usd',
    //         balance: 30,
    //       },
    //     ],
    //   },
    // };

    return data;
  }
}

export default ProjectManagementAccountingAPI;
