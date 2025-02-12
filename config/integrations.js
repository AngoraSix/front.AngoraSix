import { getFromEnvsOrElse } from "../utils/config";

class Integrations {
  constructor(env) {
    this.registration = {
      actions: {
        redirectAuthorization: {
          registrationUrlTemplate: getFromEnvsOrElse(env, 'A6_APP_INTEGRATIONS_REGISTRATION_CALLBACK_URL_TEMPLATE', 'http://localhost:10700/managements/:managementId/integrations/authorization/:sourceKey/register'),
        }
      }
    }
  }
}

export default Integrations;
