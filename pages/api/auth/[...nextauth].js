import moment from 'moment';
import NextAuth from 'next-auth';
import {
  oauthFrameworkConfig,
  oauthProviderConfig,
} from '../../../config/oauth';
import logger from '../../../utils/logger';

export const oauthCallbacksConfig = {
  async jwt({ token, user, account }) {
    if (account?.provider) {
      token.provider = account.provider
    }
    if (account && user) {
      return {
        accessToken: account.access_token,
        accessTokenExpires: account.expires_at,
        provider: account.provider,
        refreshToken: account.refresh_token,
        user,
      };
    }
    // Return previous token if the access token has not expired yet
    if (moment().isBefore(moment.unix(token.accessTokenExpires))) {
      return token;
    }
    // 3. If expired: **throw an error to force signIn** // Does this actuallyt happen? is it different to try refresh and otherwise signin
    // return { ...token, error: 'SessionExpired' };

    // Access token has expired, try to update it
    return {
      ...(await refreshAccessToken(token)),
      user: token.user,
    };
  },
  session({ session, token }) {
    session.user = token.user;
    session.error = token.error;
    session.provider = token.provider
    return session;
  },
};

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  try {
    const response = await axios.post(
      oauthProviderConfig.token,
      { grant_type: 'refresh_token', refresh_token: token.refreshToken },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        auth: {
          username: oauthProviderConfig.clientId,
          password: oauthProviderConfig.clientSecret,
        },
      }
    );

    if (response.status >= 300) {
      throw new Error('Error refreshing token');
    }

    let accessTokenBody = response.data;

    if (oauthFrameworkConfig.debug) {
      logger.info(`Refreshed Access Token: ${accessTokenBody.access_token}`);
    }
    console.log("GERGERGERGERREFRESHHHHHGERGERGER", accessTokenBody.access_token, accessTokenBody.expires_in, accessTokenBody.refresh_token);

    return {
      accessToken: accessTokenBody.access_token,
      accessTokenExpires: moment().unix() + accessTokenBody.expires_in,
      refreshToken: accessTokenBody.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (err) {
    logger.error(err);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const oauthConfig = {
  providers: [oauthProviderConfig],
  callbacks: oauthCallbacksConfig,
  ...oauthFrameworkConfig,
};

export default NextAuth(oauthConfig);
