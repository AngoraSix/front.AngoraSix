import createPatchBody, {
  PATCH_SUPPORTED_OPERATIONS,
} from '../utils/rest/patch/patchOperations';

class FrontAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
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
      `api/managements/integrations/${integrationId}`,
      createPatchBody(PATCH_SUPPORTED_OPERATIONS.REPLACE, 'status/status', "DISABLED")
    );
    return data;
  }
}

export default FrontAPI;
