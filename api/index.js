import config from '../config';
import BaseAPI from './BaseAPI';
import ClubsAPI from './club';
import ContributorsAPI from './contributors';
import FrontAPI from './front';
import ManagementIntegrationsAPI from './managementIntegrations';
import ManagementAccountsAPI from './managementAccounts';
import ProjectsAPI from './projects';
import NotificationsAPI from './notifications';
import ManagementTasksAPI from './managementTasks';

class API {
  constructor() {
    this.applyEnvConfig();
  }

  get front() {
    return this.frontAPI;
  }

  get projects() {
    return this.projectsAPI;
  }

  get managementIntegrations() {
    return this.managementIntegrationsAPI;
  }

  get managementTasks() {
    return this.managementTasksAPI;
  }

  get managementAccounts() {
    return this.managementAccountsAPI;
  }

  get clubs() {
    return this.clubsAPI;
  }

  get media() {
    return this.mediaAPI;
  }

  get notifications() {
    return this.notificationsAPI;
  }

  get contributors() {
    return this.contributorsAPI;
  }

  applyEnvConfig() {
    this.axios = new BaseAPI({
      serverBaseURL: config.api.serverBaseURL,
      browserBaseURL: config.api.browserBaseURL,
    });
    this.frontAPI = new FrontAPI(
      new BaseAPI({
        baseURL: '/',
      }),
      config.api.frontLocalhost
    );
    this.projectsAPI = new ProjectsAPI(_getServiceAPI('projects', this.axios));
    this.managementIntegrationsAPI = new ManagementIntegrationsAPI(_getServiceAPI('managementIntegrations', this.axios));
    this.managementTasksAPI = new ManagementTasksAPI(_getServiceAPI('managementTasks', this.axios));
    this.managementAccountsAPI = new ManagementAccountsAPI(_getServiceAPI('managementAccounts', this.axios));
    this.contributorsAPI = new ContributorsAPI(_getServiceAPI('contributors', this.axios));
    this.clubsAPI = new ClubsAPI(_getServiceAPI('clubs', this.axios));
    this.notificationsAPI = new NotificationsAPI(
      _getServiceAPI('notifications', this.axios)
    );
  }
}

const _getServiceAPI = (service, axiosInstance) => {
  const serviceOverrideBaseURL = config.api.servicesOverrideBaseURLs[service],
    apiGatewayPath = config.api.servicesAPIGatewayPath[service];

  return serviceOverrideBaseURL
    ? new BaseAPI({
      ...axiosInstance.getDefaults(),
      baseURL: serviceOverrideBaseURL,
    })
    : apiGatewayPath
      ? new BaseAPI({
        ...axiosInstance.getDefaults(),
        baseURL: `${axiosInstance.getBaseURL()}${apiGatewayPath}`,
      })
      : axiosInstance;
};

const api = new API();

export default api;
