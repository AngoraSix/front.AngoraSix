import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class ProjectManagementAccountsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async resolveProjectManagementAccounts(projectManagementId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    // const { data } = await this.axios.get(
    //   `/accounts/project-management/${projectManagementId}/stats`,
    //   {
    //     headers: {
    //       ...headers,
    //       ...authHeaders,
    //       ...infraHeaders,
    //     },
    //   }
    // );
    const mockData = {
      project: {
        ownership: {
          balance: 50,
          currency: 'caps',
        },
        finance: [
          {
            currency: 'usd',
            balance: 75,
          },
        ],
      },
      contributor: {
        ownership: {
          balance: 10,
          currency: 'caps',
        },
        finance: [
          {
            currency: 'usd',
            balance: 30,
          },
        ],
      },
    };

    return mockData;
  }
}

export default ProjectManagementAccountsAPI;
