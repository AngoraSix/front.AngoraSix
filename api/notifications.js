import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class NotificationsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getNotifications(
    token,
    {
      number = 0,
      size = 20,
      sort = '<dismissed,>creationInstant',
      extraSkip = 0,
    }
  ) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get(
      `/?pageSize=${size}&page=${number}&sort=${sort}&extraSkip=${extraSkip}`,
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

  async listenContributorNotifications(token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    var eventSourceConfig = {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
        Accept: 'text/event-stream',
      },
    };

    const baseUrl = this.axios.getCurrentAxiosInstance().defaults.baseURL;
    let eventSource = new EventSource(
      `${baseUrl}/notifications?resliten=true`,
      eventSourceConfig
    );
    return eventSource;
  }

  async patchNotifications(patchBody, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const response = await this.axios.patch(`/`, patchBody, {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    });
    return response;
  }
}

export default NotificationsAPI;
