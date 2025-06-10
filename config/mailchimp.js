import { getFromEnvsOrElse } from "../utils/config";

class MailChimp {
  constructor(env) {
    this.audienceId = getFromEnvsOrElse(env, 'MAILCHIMP_AUDIENCE_ID', 'mailchimp-audience-id');
    this.apiKey = getFromEnvsOrElse(env, 'MAILCHIMP_API_KEY', 'mailchimp-api-key');
    this.serverPrefix = getFromEnvsOrElse(env, 'MAILCHIMP_SERVER_PREFIX', 'mailchimp-server-prefix');
  }
}

export default MailChimp;
