import { getToken } from 'next-auth/jwt';
import api from '../../api';
import config from '../../config';
import { oauthFrameworkConfig } from '../../config/oauth';
import { getEnv } from '../env';

export const obtainValidatedToken = async (req) => {
  const env = getEnv();
  config.applyEnvConfig(env);
  api.applyEnvConfig(env);
  const token = await getToken({
    req,
    secret: oauthFrameworkConfig.jwt.secret,
  });
  const validatedToken =
    token?.error !== 'RefreshAccessTokenError' ? token : null;
  return validatedToken;
};

export const resolveLocale = (destination, { locale, defaultLocale }) => {
  return locale != defaultLocale ? `/${locale}${destination}` : destination;
};
