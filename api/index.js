import config from '../config';
import BaseAPI from './BaseAPI';
import ContributorsAPI from './contributors';
import FrontAPI from './front';
import ProjectsAPI from './projects';
import ManagementIntegrationsAPI from './managementIntegrations';

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

  get clubs() {
    return this.clubsAPI;
  }

  get media() {
    return this.mediaAPI;
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
      })
    );
    this.projectsAPI = new ProjectsAPI(_getServiceAPI('projects', this.axios));
    this.managementIntegrationsAPI = new ManagementIntegrationsAPI(_getServiceAPI('managementIntegrations', this.axios));
    this.contributorsAPI = new ContributorsAPI(
      _getServiceAPI('contributors', this.axios)
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
