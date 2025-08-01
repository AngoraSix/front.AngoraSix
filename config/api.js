import { getFromEnvsOrElse } from "../utils/config";

class Api {
  constructor(env) {
    this.serverBaseURL = getFromEnvsOrElse(env, 'A6_APP_API_SERVER_BASE_URL', 'https://gerserver.com.ar/');
    this.browserBaseURL =
      getFromEnvsOrElse(env, 'A6_PUBLIC_APP_API_BROWSER_BASE_URL', 'https://gerbrowser.com.ar/')
    this.servicesOverrideBaseURLs = {
      projects: getFromEnvsOrElse(env, 'A6_APP_API_PROJECTS_SERVER_BASE_URL', null),
      surveys: getFromEnvsOrElse(env, 'A6_APP_API_SURVEYS_SERVER_BASE_URL', null),
    };
    this.servicesAPIGatewayPath = {
      surveys: getFromEnvsOrElse(env, 'A6_APP_API_SURVEYS_SERVER_APIGATEWAY_PATH', '/surveys'),
      projectsCore: getFromEnvsOrElse(env, 'A6_APP_API_PROJECTSCORE_SERVER_APIGATEWAY_PATH', '/projects/core'),
      projectsManagement: getFromEnvsOrElse(env, 'A6_APP_API_MANAGEMENT_SERVER_APIGATEWAY_PATH', '/projects'),// can be /projectId/management or /management 
      managementIntegrations: getFromEnvsOrElse(env, 'A6_APP_API_MANAGEMENTINTEGRATIONS_SERVER_APIGATEWAY_PATH', '/management/integrations'),
      managementTasks: getFromEnvsOrElse(env, 'A6_APP_API_MANAGEMENTTASKS_SERVER_APIGATEWAY_PATH', '/management/tasks'),
      managementAccounting: getFromEnvsOrElse(env, 'A6_APP_API_MANAGEMENTACCOUNTS_SERVER_APIGATEWAY_PATH', '/management/accounting'),
      contributors: getFromEnvsOrElse(env, 'A6_APP_API_CONTRIBUTORS_SERVER_APIGATEWAY_PATH', '/contributors'),
      clubs: getFromEnvsOrElse(env, 'A6_APP_API_CLUBS_SERVER_APIGATEWAY_PATH', '/clubs'),
      notifications:
        getFromEnvsOrElse(env, 'A6_APP_API_NOTIFICATIONS_SERVER_APIGATEWAY_PATH', '/notifications'),
    };
    this.servicesAPIParams = {
      clubsProjectManagementMembersType:
        getFromEnvsOrElse(env, 'A6_PUBLIC_APP_APIPARAMS_CLUBS_WELLKNOWN_PROJECTMGMTMEMBERS', 'PROJECT_MANAGEMENT_MEMBERS'),
    };
    this.frontLocalhost = getFromEnvsOrElse(env, 'A6_PUBLIC_APP_API_EVENTSOURCE_LOCALHOST', 'https://localhost/');
  }
}

export default Api;
