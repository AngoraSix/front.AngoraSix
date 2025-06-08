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
    // console.log("ACCOUNT");
    // console.log(data);

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
    return {
      project: {
        ownership: {
          balance: 50,
          forecastedBalance: {
            "06-2025": 50,
            "07-2025": 60,
            "08-2025": 73.56,
            "09-2025": 77.11,
            "10-2025": 68.98,
            "11-2025": 50.12,
            "12-2025": 66.76,
            "01-2026": 57,
            "02-2026": 89,
            "03-2026": 55,
            "04-2026": 65,
            "05-2026": 45,
            "06-2026": 89
          },
          currency: 'caps',
        },
        finance: [
          {
            currency: 'usd',
            forecastedBalance: {
            "06-2025": 20,
            "07-2025": 30,
            "08-2025": 43.56,
            "09-2025": 17.11,
            "10-2025": 28.98,
            "11-2025": 30.12,
            "12-2025": 46.76,
            "01-2026": 17,
            "02-2026": 29,
            "03-2026": 25,
            "04-2026": 25,
            "05-2026": 25,
            "06-2026": 39
          },
            balance: 20,
          },
          {
            currency: 'ars',
            forecastedBalance: {
            "06-2025": 370,
            "07-2025": 350,
            "08-2025": 343.56,
            "09-2025": 337.11,
            "10-2025": 368.98,
            "11-2025": 380.12,
            "12-2025": 266.76,
            "01-2026": 357,
            "02-2026": 339,
            "03-2026": 365,
            "04-2026": 325,
            "05-2026": 355,
            "06-2026": 349
          },
            balance: 370,
          },
        ],
      },
      contributor: {
        ownership: {
          balance: 10,
          forecastedBalance: {
            "06-2025": 110,
            "07-2025": 110,
            "08-2025": 113.56,
            "09-2025": 117.11,
            "10-2025": 118.98,
            "11-2025": 110.12,
            "12-2025": 116.76,
            "01-2026": 117,
            "02-2026": 119,
            "03-2026": 115,
            "04-2026": 115,
            "05-2026": 115,
            "06-2026": 119
          },
          currency: 'caps',
        },
        finance: [
          {
            currency: 'usd',
            forecastedBalance: {
            "06-2025": 220,
            "07-2025": 230,
            "08-2025": 243.56,
            "09-2025": 217.11,
            "10-2025": 228.98,
            "11-2025": 230.12,
            "12-2025": 246.76,
            "01-2026": 217,
            "02-2026": 229,
            "03-2026": 225,
            "04-2026": 225,
            "05-2026": 225,
            "06-2026": 239
          },
            balance: 30,
          },{
            currency: 'ars',
            forecastedBalance: {
            "06-2025": 220,
            "07-2025": 230,
            "08-2025": 243.56,
            "09-2025": 217.11,
            "10-2025": 228.98,
            "11-2025": 230.12,
            "12-2025": 246.76,
            "01-2026": 217,
            "02-2026": 229,
            "03-2026": 225,
            "04-2026": 225,
            "05-2026": 225,
            "06-2026": 239
          },
            balance: 220,
          },
        ],
      },
    }

    return data;
  }
}

export default ProjectManagementAccountingAPI;
