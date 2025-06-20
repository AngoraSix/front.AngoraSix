import { getFromEnvsOrElse } from "../utils/config"

class Google {
  constructor(env) {
    this.analyticsPropertyId = getFromEnvsOrElse(env, "A6_PUBLIC_APP_GOOGLE_GA_PROPERTY_ID", "google-analytics-property-id")
  }
}

export default Google
