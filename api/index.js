import config from '../config';
import BaseAPI from './BaseAPI';
import ClubsAPI from './club';
import ContributorsAPI from './contributors';
import FrontAPI from './front';
import ProjectsManagementAPI from './management';
import ManagementAccountingAPI from './managementAccounting';
import ManagementIntegrationsAPI from './managementIntegrations';
import ManagementTasksAPI from './managementTasks';
import NotificationsAPI from './notifications';
import ProjectsCoreAPI from './projects';
import SurveysAPI from './surveys';
import MessagingAPI from './messaging';

class API {
  constructor() {
    this.applyEnvConfig();
  }

  get front() {
    return this.frontAPI;
  }

  get surveys() {
    return this.SurveysAPI;
  }

  get messaging() {
    return this.MessagingAPI;
  }

  get projects() {
    return this.projectsCoreApi;
  }

  get management() {
    return this.projectsManagementAPI;
  }

  get managementIntegrations() {
    return this.managementIntegrationsAPI;
  }

  get managementTasks() {
    return this.managementTasksAPI;
  }

  get managementAccounting() {
    return this.managementAccountingAPI;
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
    this.projectsCoreApi = new ProjectsCoreAPI(_getServiceAPI('projectsCore', this.axios));
    this.projectsManagementAPI = new ProjectsManagementAPI(_getServiceAPI('projectsManagement', this.axios));
    this.managementIntegrationsAPI = new ManagementIntegrationsAPI(_getServiceAPI('managementIntegrations', this.axios));
    this.managementTasksAPI = new ManagementTasksAPI(_getServiceAPI('managementTasks', this.axios));
    this.managementAccountingAPI = new ManagementAccountingAPI(_getServiceAPI('managementAccounting', this.axios));
    this.contributorsAPI = new ContributorsAPI(_getServiceAPI('contributors', this.axios));
    this.clubsAPI = new ClubsAPI(_getServiceAPI('clubs', this.axios));
    this.notificationsAPI = new NotificationsAPI(
      _getServiceAPI('notifications', this.axios)
    );
    this.SurveysAPI = new SurveysAPI(_getServiceAPI('surveys', this.axios));
    this.MessagingAPI = new MessagingAPI(_getServiceAPI('messaging', this.axios));
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
