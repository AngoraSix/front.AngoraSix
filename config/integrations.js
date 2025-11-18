import { getFromEnvsOrElse } from '../utils/config'

class Integrations {
  constructor(env) {
    this.registration = {
      actions: {
        redirectAuthorization: {
          registrationUrlTemplate: getFromEnvsOrElse(
            env,
            'A6_APP_INTEGRATIONS_REGISTRATION_CALLBACK_URL_TEMPLATE',
            'http://localhost:10700/managements/:managementId/integrations/authorization/:sourceKey/register'
          ),
        },
      },
    }
    this.userMatching = {
      keys: {
        unassignedInclude: getFromEnvsOrElse(
          env,
          'A6_PUBLIC_APP_INTEGRATIONS_USERMATCHING_UNASSIGNEDINCLUDEKEY',
          'unassignedInclude'
        ),
        unassignedExclude: getFromEnvsOrElse(
          env,
          'A6_PUBLIC_APP_INTEGRATIONS_USERMATCHING_UNASSIGNEDEXCLUDEKEY',
          'unassignedExclude'
        ),
      },
    }
  }
}

export default Integrations
