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
    // return {
    //   project: {
    //     ownership: {
    //       balance: 70.10,
    //       forecastedBalance: {
    //         "06-2025": 70.10,
    //         "07-2025": 84.12,
    //         "08-2025": 98.14,
    //         "09-2025": 107.95,
    //         "10-2025": 117.76,
    //         "11-2025": 127.58,
    //         "12-2025": 133.18,
    //         "01-2026": 140.19,
    //         "02-2026": 147.20,
    //         "03-2026": 154.21,
    //         "04-2026": 158.42,
    //         "05-2026": 158.42,
    //         "06-2026": 158.42
    //       },
    //       currency: 'caps',
    //     },
    //     finance: [
    //       {
    //         currency: 'equity',
    //         forecastedBalance: {
    //           "06-2025": 28.04,
    //           "07-2025": 56.08,
    //           "08-2025": 81.31,
    //           "09-2025": 105.15,
    //           "10-2025": 126.17,
    //           "11-2025": 147.20,
    //           "12-2025": 168.23,
    //           "01-2026": 185.06,
    //           "02-2026": 196.27,
    //           "03-2026": 203.28,
    //           "04-2026": 206.08,
    //           "05-2026": 207.49,
    //           "06-2026": 207.49
    //         },
    //         balance: 28.04,
    //       },
    //       {
    //         currency: 'usd',
    //         forecastedBalance: {
    //           "06-2025": 981.35,
    //           "07-2025": 1121.55,
    //           "08-2025": 1051.45,
    //           "09-2025": 1156.60,
    //           "10-2025": 1226.69,
    //           "11-2025": 1472.03,
    //           "12-2025": 1436.98,
    //           "01-2026": 1436.98,
    //           "02-2026": 1401.93,
    //           "03-2026": 1366.89,
    //           "04-2026": 1359.88,
    //           "05-2026": 1261.74,
    //           "06-2026": 1226.69
    //         },
    //         balance: 981.35,
    //       }
    //     ],
    //   },
    //   contributor: {
    //     ownership: {
    //       balance: 50,
    //       forecastedBalance: {
    //         "06-2025": 50,
    //         "07-2025": 60,
    //         "08-2025": 70,
    //         "09-2025": 77,
    //         "10-2025": 84,
    //         "11-2025": 91,
    //         "12-2025": 95,
    //         "01-2026": 100,
    //         "02-2026": 105,
    //         "03-2026": 110,
    //         "04-2026": 113,
    //         "05-2026": 113,
    //         "06-2026": 113
    //       },
    //       currency: 'caps',
    //     },
    //     finance: [
    //       {
    //         currency: 'equity',
    //         forecastedBalance: {
    //           "06-2025": 20,
    //           "07-2025": 40,
    //           "08-2025": 58,
    //           "09-2025": 75,
    //           "10-2025": 90,
    //           "11-2025": 105,
    //           "12-2025": 120,
    //           "01-2026": 132,
    //           "02-2026": 140,
    //           "03-2026": 145,
    //           "04-2026": 147,
    //           "05-2026": 148,
    //           "06-2026": 148
    //         },
    //         balance: 20,
    //       }, {
    //         currency: 'usd',
    //         forecastedBalance: {
    //           "06-2025": 700,
    //           "07-2025": 800,
    //           "08-2025": 750,
    //           "09-2025": 825,
    //           "10-2025": 875,
    //           "11-2025": 1050,
    //           "12-2025": 1025,
    //           "01-2026": 1025,
    //           "02-2026": 1000,
    //           "03-2026": 975,
    //           "04-2026": 970,
    //           "05-2026": 900,
    //           "06-2026": 875
    //         },
    //         balance: 700,
    //       },
    //     ],
    //   },
    // }

    return data;
  }
}

export default ProjectManagementAccountingAPI;
