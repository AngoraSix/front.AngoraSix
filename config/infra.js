import { getFromEnvsOrElse } from "../utils/config";

class Infra {
  constructor(env) {
    this.googleCloudRunAuthEnabled =
      getFromEnvsOrElse(env, 'A6_APP_INFRA_GOOGLE_CLOUDRUN_AUTH_ENABLED') === 'true';
  }
}

export default Infra;
