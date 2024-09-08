import axios from 'axios';
import logger from '../logger';

export const obtainGoogleHeaders = async (baseUrl) => {
  const headers = {};
  try {
    const { data: idToken } = await axios.get(
      `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${baseUrl}`,
      {
        headers: {
          'Metadata-Flavor': 'Google',
        },
      }
    );
    headers['X-Serverless-Authorization'] = `Bearer ${idToken}`;
  } catch (err) {
    logger.error('Error obtaining GCP Id Token', err);
  }

  return headers;
};
