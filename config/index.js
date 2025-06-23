import Api from './api';
import Site from './site';
import ThirdParties from './thirdparties';
import Infra from './infra';
import Integrations from './integrations';
import Mailchimp from './mailchimp';
import Google from './google';

class A6Config {
  constructor(env = {}) {
    this.applyEnvConfig(env);
  }

  get site() {
    return this.siteConfig;
  }

  get api() {
    return this.apiConfig;
  }

  get thirdParties() {
    return this.thirdPartiesConfig;
  }

  get infra() {
    return this.infraConfig;
  }

  get integrations() {
    return this.integrationsConfig;
  }

  get mailchimp() {
    return this.mailchimpConfig;
  }

  get google() {
    return this.googleConfig;
  }

  applyEnvConfig(env = {}) {
    this.buildNo = env.BUILD || 'dev';
    this.siteConfig = new Site(env);
    this.apiConfig = new Api(env);
    this.thirdPartiesConfig = new ThirdParties(env);
    this.infraConfig = new Infra(env);
    this.integrationsConfig = new Integrations(env);
    this.mailchimpConfig = new Mailchimp(env);
    this.googleConfig = new Google(env);
  }
}

const config = new A6Config();

export default config;
