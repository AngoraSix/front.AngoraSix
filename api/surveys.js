import config from '../../Cooperativemos/config';
import { obtainInfraHeaders } from '../../Cooperativemos/utils/infra';

class SurveysAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async saveSurveyResponse(surveyResponse, surveyKey) {
    const headers = this.axios.getCommonHeaders();
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      this.axios.getBaseURL()
    );

    const { data: savedSurvey } = await this.axios.post(
      `/${surveyKey}/responses`,
      surveyResponse,
      {
        headers: {
          ...headers,
          ...infraHeaders,
        },
      }
    );
    return savedSurvey;
  }

  async fetchSurveyResponse(surveyKey) {
    const headers = this.axios.getCommonHeaders();
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      this.axios.getBaseURL()
    );

    const { data: persistedSurvey } = await this.axios.get(
      `/${surveyKey}/responses`,
      {
        headers: {
          ...headers,
          ...infraHeaders,
        },
      }
    );
    return persistedSurvey;
  }
}

export default SurveysAPI;
