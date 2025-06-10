import { getFromEnvsOrElse } from "../utils/config";

class Google {
    constructor(env) {
        this.measurementId = getFromEnvsOrElse(env, 'NEXT_PUBLIC_GA_MEASUREMENT_ID', 'google-measurement-id');
        this.conversionLabel = getFromEnvsOrElse(env, 'NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL', 'google-conversion-label');
        this.conversionId = getFromEnvsOrElse(env, 'NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID', 'google-conversion-id');
    }
}

export default Google;
