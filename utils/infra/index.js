import { obtainGoogleHeaders } from './googleInfra';

export const obtainInfraHeaders = async (infraConfigs, baseUrl) => {
  if (infraConfigs.googleCloudRunAuthEnabled) {
    return await obtainGoogleHeaders(baseUrl);
  }
  return {};
};
