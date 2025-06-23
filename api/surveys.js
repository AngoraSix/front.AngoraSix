import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class SurveysAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async saveSurveyResponse(surveyResponse, surveyKey, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data: savedSurvey } = await this.axios.post(
      `/${surveyKey}/responses`,
      surveyResponse,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    );
    return savedSurvey;
  }

  async fetchSurveyResponse(surveyKey, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data: persistedSurvey } = await this.axios.get(
      `/${surveyKey}/responses`,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    );
    return persistedSurvey;
  }
}

export default SurveysAPI;
