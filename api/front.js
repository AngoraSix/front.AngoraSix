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
    sort = '<dismissed,>creationInstant',
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

  async getSourceSync(sourceSyncId) {
    const { data } = await this.axios.get(
      `api/integrations/${sourceSyncId}`
    );
    return data;
  }

  async registerSourceSync(sourceKey, projectManagementId, tokenValue) {
    const integrationRegistrationBody = {
      accessToken: tokenValue,
    };
    const { data } = await this.axios.post(
      `api/integrations/authorization/${projectManagementId}/${sourceKey}/register`,
      integrationRegistrationBody
    );
    return data;
  }

  async disableIntegration(sourceSyncId) {
    const { data } = await this.axios.patch(
      `api/integrations/${sourceSyncId}`,
      createPatchBody(PATCH_SUPPORTED_OPERATIONS.REPLACE, 'status/status', "DISABLED")
    );
    return data;
  }

  async submitSourceSyncStep(sourceSyncId, stepIndex, stepData) {
    const { data } = await this.axios.patch(
      `api/integrations/${sourceSyncId}`,
      createPatchBody(PATCH_SUPPORTED_OPERATIONS.REPLACE, `config/steps/${stepIndex}`, stepData)
    );
    return data;
  }

  async requestFullSync(sourceSyncId) {
    const { data } = await this.axios.patch(
      `api/integrations/${sourceSyncId}`,
      createPatchBody(PATCH_SUPPORTED_OPERATIONS.ADD, `events`, { type: 'REQUEST_FULL_SYNC' })
    );
    return data;
  }

  async registerMappingUsers(sourceSyncId, usersMappingData) {
    const { data } = await this.axios.patch(
      `api/integrations/${sourceSyncId}`,
      createPatchBody(PATCH_SUPPORTED_OPERATIONS.REPLACE, `mappings/users`, usersMappingData)
    );
    return data;
  }

  async getSourceSyncState(sourceSyncId) {
    const { data } = await this.axios.get(
      `api/integrations/${sourceSyncId}`,
    )
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

  async getProjectManagement(managementId) {
    const { data } = await this.axios.get(`/api/managements/${managementId}`);
    return data;
  }

  async getWellKnownClub(projectManagementId, clubType) {
    const { data } = await this.axios.get(
      `api/clubs/well-known/project-management/${projectManagementId}/${clubType}`
    );
    return data;
  }

  async startPlatformUsersMatch(sourceSyncId, projectContributors) {
    const { data } = await this.axios.post(`api/integrations/${sourceSyncId}/mappings/users`,
      {
        projectContributors
      });
    return data;
  }

  //any object passed as the 'surveyResponseBody' will be persisted as is, no particular structure enforced  
  async saveSurveyResponse(surveyResponseBody, surveyKey) {
    const { data } = await this.axios.post(`api/surveys/${surveyKey}/responses`, surveyResponseBody);
    return data;
  }

  //any object passed as the 'surveyResponseBody' will be persisted as is, no particular structure enforced  
  async getSurveyResponse(surveyKey) {
    const { data } = await this.axios.get(`api/surveys/${surveyKey}/responses`);
    return data;
  }

  async suscribe(email, {
    newsletterList = false,
    betaList = false,
    source = "general",
  } = {}) {
    const response = await this.axios.post(`api/subscribe`, {
      email,
      source,
      newsletterList,
      betaList
    }, {
      validateStatus: (status) => {
        return status < 500; // 4xx will be handled
      },
    });
    return response;
  }
}

export default FrontAPI;
