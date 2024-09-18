class Integrations {
  constructor(env) {
    this.registration = {
      actions: {
        redirectAuthorization: {
          registrationUrlTemplate: env.AN_APP_INTEGRATIONS_REGISTRATION_CALLBACK_URL_TEMPLATE || 'http://localhost:10700/api/integrations/authorization/:source/register',
        }
      }
    }
  }
}

export default Integrations;
