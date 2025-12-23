import config from '../config'
import { obtainInfraHeaders } from '../utils/infra'

/**
 * API for interacting with messaging services (@TODO REMOVE with Trello-FNxJ9zGB).
 *
 * BaseURL: /messaging
 */
class MessagingAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance
  }

  async wakeup(token) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token, false)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )

    const response = await this.axios.post(
      `/wakeup`,
      {},
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    )
    return response.data
  }
}

export default MessagingAPI
