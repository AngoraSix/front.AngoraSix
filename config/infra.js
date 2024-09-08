class Infra {
  constructor(env) {
    this.googleCloudRunAuthEnabled =
      env.AN_APP_INFRA_GOOGLE_CLOUDRUN_AUTH_ENABLED === 'true';
  }
}

export default Infra;
