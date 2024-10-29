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

export const resolveRoute = (route, ...args) => {
  const isAbsoluteUrl = new RegExp('^(?:[a-z+]+:)?//', 'i');
  if (isAbsoluteUrl.test(route)) {
    const absUrl = new URL(route);
    return `${absUrl.protocol}//${absUrl.host}${replaceParams(
      absUrl.pathname,
      ...args
    )}${replaceParams(absUrl.search, ...args)}`;
  } else {
    return replaceParams(route, ...args);
  }
};

const replaceParams = (path, ...args) => {
  return args.reduce(
    // replace each path pattern
    (url, replaceString) =>
      url.replace(/:\w+/, replaceString),
    path
  );
};
