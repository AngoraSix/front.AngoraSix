import config from '../config'
import { obtainInfraHeaders } from '../utils/infra'

class ClubsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance
  }

  async getWellKnownClub(projectManagementId, clubType, token) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )

    const { data } = await this.axios.get(
      `/well-known/project-management/${projectManagementId}/${clubType}`,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    )
    return data
  }

  async inviteContributor(clubId, invitationData, token) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )

    const { data } = await this.axios.post(
      `/${clubId}/invitations`,
      invitationData,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    )
    return data
  }

  async acceptInvitation(clubId, invitationToken, token) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )

    const { data } = await this.axios.post(
      `/${clubId}/invitations/${invitationToken}`,
      {},
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    )
    return data
  }

  async searchWellKnownClubsForContributor(clubType, contributorId, token) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )

    const { data } = await this.axios.get(
      `/well-known?type=${clubType}&memberContributorId=${contributorId}`,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    )
    return data
  }
}

export default ClubsAPI
