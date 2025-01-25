class Api {
  constructor(env) {
    this.serverBaseURL = env.API_SERVER_BASE_URL || 'https://gerserver.com.ar/';
    this.browserBaseURL =
      env.API_BROWSER_BASE_URL || 'https://gerbrowser.com.ar/';
    this.servicesOverrideBaseURLs = {
      projects: env.API_PROJECTS_SERVER_BASE_URL,
    };
    this.servicesAPIGatewayPath = {
      projects: env.API_PROJECTS_SERVER_APIGATEWAY_PATH || '/projects',
      managementIntegrations: env.API_MANAGEMENTINTEGRATIONS_SERVER_APIGATEWAY_PATH || '/management/integrations',
      contributors: env.API_CONTRIBUTORS_SERVER_APIGATEWAY_PATH || '/contributors',
      clubs: env.API_CLUBS_SERVER_APIGATEWAY_PATH || '/clubs',
    };
    this.servicesAPIParams = {
      clubsProjectManagementMembersType:
        env.APIPARAMS_CLUBS_WELLKNOWN_PROJECTMGMTMEMBERS ||
        'project-management-members',
    };
  }
}

export default Api;
