import createPatchBody, {
  PATCH_SUPPORTED_OPERATIONS,
} from '../utils/rest/patch/patchOperations';

class FrontAPI {
  constructor(axiosInstance, localhost = 'https://localhost/') {
    this.axios = axiosInstance;
    this.localhost = localhost;
  }


  async getContributorNotifications({
    number = 0,
    extraSkip = 0,
    size = 20,
    sort = '<dismissed,>instantOfCreation',
  }) {
    const { data } = await this.axios.get(
      `api/notifications?size=${size}&number=${number}&sort=${sort}&extraSkip=${extraSkip}`
    );
    return data;
  }

  streamContributorNotifications() {
    const baseUrl = this.localhost;
    let eventSource = new EventSource(`${baseUrl}api/notifications`);
    return eventSource;
  }

  async saveProjectManagement(
    projectManagementBody,
    projectManagementId,
    projectId
  ) {
    const { data } = projectManagementId
      ? await this.axios.put(
        `api/projects/${projectId}/management/${projectManagementId}`,
        projectManagementBody
      )
      : await this.axios.post(
        `api/projects/${projectId}/management`,
        projectManagementBody
      );
    return data;
  }

  async getIntegration(integrationId) {
    const { data } = await this.axios.get(
      `api/integrations/${integrationId}`
    );
    return data;
  }

  async registerIntegration(sourceKey, projectManagementId, tokenValue) {
    const integrationRegistrationBody = {
      token: tokenValue,
      projectManagementId
    };
    const { data } = await this.axios.post(
      `api/integrations/authorization/${sourceKey}/register`,
      integrationRegistrationBody
    );
    return data;
  }

  async disableIntegration(integrationId) {
    const { data } = await this.axios.patch(
      `api/integrations/${integrationId}`,
      createPatchBody(PATCH_SUPPORTED_OPERATIONS.REPLACE, 'status/status', "DISABLED")
    );
    return data;
  }

  async submitSourceSyncStep(sourceSyncId, stepIndex, stepData) {
    const { data } = await this.axios.patch(
      `api/integrations/source-sync/${sourceSyncId}`,
      createPatchBody(PATCH_SUPPORTED_OPERATIONS.REPLACE, `status/steps/${stepIndex}`, stepData)
    );
    return data;
  }

  async requestFullSync(sourceSyncId) {
    const { data } = await this.axios.patch(
      `api/integrations/source-sync/${sourceSyncId}`,
      createPatchBody(PATCH_SUPPORTED_OPERATIONS.ADD, `events`, { type: 'REQUEST_FULL_SYNC' })
    );
    return data;
  }

  async getContributors(contributorIds) {
    const contributorIdsArray = Array.isArray(contributorIds)
      ? contributorIds
      : [contributorIds];
    const { data: membersData } = await this.axios.get(`/api/contributors`, {
      params: { contributorIds: contributorIdsArray.join() },
    });
    return membersData;
  }

  async inviteContributor(clubId, inviteData) {
    const { data } = await this.axios.post(`/api/clubs/${clubId}/invitations`, inviteData);
    return data;
  }
}

export default FrontAPI;
