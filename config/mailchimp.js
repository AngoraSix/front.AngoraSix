import { getFromEnvsOrElse } from "../utils/config";

class MailChimp {
  constructor(env) {
    this.audienceId = getFromEnvsOrElse(env, 'A6_APP_MAILCHIMP_AUDIENCE_ID', 'mailchimp-audience-id');
    this.apiKey = getFromEnvsOrElse(env, 'A6_APP_MAILCHIMP_API_KEY', 'mailchimp-api-key');
    this.serverPrefix = getFromEnvsOrElse(env, 'A6_APP_MAILCHIMP_SERVER_PREFIX', 'mailchimp-server-prefix');
  }
}

export default MailChimp;
