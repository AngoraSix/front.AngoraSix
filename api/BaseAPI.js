import axios from 'axios';
import TokenRequiredError from '../utils/errors/TokenRequiredError';

class BaseAPI {
  constructor({ browserBaseURL = null, serverBaseURL = null, baseURL = null }) {
    if (!browserBaseURL && !serverBaseURL && !baseURL) {
      throw new Error(
        'BaseAPI Error - You should set at least baseURL (or browserBaseURL and serverBaseURL)'
      );
    }

    this.axiosBrowser = axios.create({
      baseURL: browserBaseURL || baseURL,
    });

    this.axiosServer = axios.create({
      baseURL: serverBaseURL || baseURL,
    });
  }

  setCommonHeaders(headers) {
    this.axiosBrowser.defaults.headers.common = {
      ...this.axiosBrowser.defaults.headers.common,
      ...headers,
    };
    this.axiosServer.defaults.headers.common = {
      ...this.axiosServer.defaults.headers.common,
      ...headers,
    };
  }

  getCommonHeaders() {
    return this.getCurrentAxiosInstance().defaults.headers.common;
  }

  getBaseURL() {
    return this.getCurrentAxiosInstance().defaults.baseURL;
  }

  getDefaults() {
    return this.getCurrentAxiosInstance().defaults;
  }

  getAuthorizationHeaders = (token, isRequired = true) => {
    if (token?.accessToken) {
      return { Authorization: `Bearer ${token.accessToken}` };
    } else if (isRequired) {
      throw new TokenRequiredError(
        'BaseAPI Error - Authorization header is required but user is not authenticated'
      );
    } else {
      return {};
    }
  };

  getCurrentAxiosInstance() {
    const axiosInstance =
      typeof window !== 'undefined' ? this.axiosBrowser : this.axiosServer;
    return axiosInstance;
  }

  async _executeRequest(type = 'request', ...args) {
    const axiosInstance = this.getCurrentAxiosInstance();
    return axiosInstance[type](...args);
  }

  // axios.request(config)
  async request(...args) {
    return this._executeRequest('request', ...args);
  }

  // axios.get(url[, config])
  async get(...args) {
    return this._executeRequest('get', ...args);
  }

  // axios.delete(url[, config])
  async delete(...args) {
    return this._executeRequest('delete', ...args);
  }

  // axios.head(url[, config])
  async head(...args) {
    return this._executeRequest('head', ...args);
  }

  // axios.options(url[, config])
  async options(...args) {
    return this._executeRequest('options', ...args);
  }

  // axios.post(url[, data[, config]])
  async post(...args) {
    return this._executeRequest('post', ...args);
  }

  // axios.put(url[, data[, config]])
  async put(...args) {
    return this._executeRequest('put', ...args);
  }

  // axios.patch(url[, data[, config]])
  async patch(...args) {
    return this._executeRequest('patch', ...args);
  }
}

export default BaseAPI;
