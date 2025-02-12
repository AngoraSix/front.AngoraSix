import { getFromEnvsOrElse } from "../utils/config";

class Api {
  constructor(env) {
    this.serverBaseURL = getFromEnvsOrElse(env, 'A6_APP_API_SERVER_BASE_URL', 'https://gerserver.com.ar/');
    this.browserBaseURL =
      getFromEnvsOrElse(env, 'A6_PUBLIC_APP_API_BROWSER_BASE_URL', 'https://gerbrowser.com.ar/')
    this.servicesOverrideBaseURLs = {
      projects: getFromEnvsOrElse(env, 'A6_APP_API_PROJECTS_SERVER_BASE_URL', null)
    };
    this.servicesAPIGatewayPath = {
      projects: getFromEnvsOrElse(env, 'A6_APP_API_PROJECTS_SERVER_APIGATEWAY_PATH', '/projects'),
      managementIntegrations: getFromEnvsOrElse(env, 'A6_APP_API_MANAGEMENTINTEGRATIONS_SERVER_APIGATEWAY_PATH', '/management/integrations'),
      contributors: getFromEnvsOrElse(env, 'A6_APP_API_CONTRIBUTORS_SERVER_APIGATEWAY_PATH', '/contributors'),
      clubs: getFromEnvsOrElse(env, 'A6_APP_API_CLUBS_SERVER_APIGATEWAY_PATH', '/clubs'),
      notifications:
        getFromEnvsOrElse(env, 'A6_APP_API_NOTIFICATIONS_SERVER_APIGATEWAY_PATH', '/notifications'),
    };
    this.servicesAPIParams = {
      clubsProjectManagementMembersType:
        getFromEnvsOrElse(env, 'A6_APP_APIPARAMS_CLUBS_WELLKNOWN_PROJECTMGMTMEMBERS', 'project-management-members'),
    };
    this.frontLocalhost = getFromEnvsOrElse(env, 'A6_PUBLIC_APP_API_EVENTSOURCE_LOCALHOST', 'https://localhost/');
  }
}

export default Api;
