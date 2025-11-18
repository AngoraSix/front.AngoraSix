import config from '../config'
import { obtainInfraHeaders } from '../utils/infra'

class ProjectManagementIntegrationsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance
  }

  async listSourceSyncsForProjectManagement(projectManagementId, token) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token, false)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )

    const { data } = await this.axios.get(
      `/project-management/${projectManagementId}/source-sync`,
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

  async registerSourceSyncForProjectManagement(
    projectManagementId,
    sourceKey,
    configBody,
    token
  ) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token, false)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )

    const { data } = await this.axios.post(
      `/project-management/${projectManagementId}/source-sync`,
      {
        source: sourceKey,
        projectManagementId,
        config: {
          accessToken: configBody.accessToken,
        },
      },
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

  async patchSourceSync(patchBody, sourceSyncId, token) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token, false)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )
    const { data } = await this.axios.patch(
      `/source-sync/${sourceSyncId}`,
      patchBody,
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

  async getSourceSync(sourceSyncId, token) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token, false)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )

    const { data } = await this.axios.get(`/source-sync/${sourceSyncId}`, {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    })
    return data
  }

  async getSourceSyncState(sourceSyncId, token) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token, false)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )

    const { data } = await this.axios.get(
      `/source-sync/${sourceSyncId}/state`,
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

  async startPlatformUsersMatch(sourceSyncId, { projectContributors }, token) {
    const headers = this.axios.getCommonHeaders()
    const authHeaders = this.axios.getAuthorizationHeaders(token, false)
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    )

    const { data } = await this.axios.post(
      `/source-sync/${sourceSyncId}/mappings/users`,
      {
        projectContributors: projectContributors.map((contributor) => ({
          ...contributor,
          contributorId: contributor.id,
        })),
      },
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

export default ProjectManagementIntegrationsAPI
