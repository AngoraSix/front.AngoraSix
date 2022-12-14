import KeycloakProvider from 'next-auth/providers/keycloak';

export const oauthFrameworkConfig = {
  debug:
    process.env.A6_APP_OAUTH_FW_DEBUG &&
    process.env.A6_APP_OAUTH_FW_DEBUG === 'true',
  jwt: {
    secret: process.env.A6_APP_OAUTH_JWT_SECRET || 'jw7Secre7',
  },
  secret: process.env.A6_APP_MAIN_SECRET || 'aSecre7',
  session: {
    strategy: 'jwt',
  },
};

export const oauthBuiltinProviderConfig = KeycloakProvider({
  clientId: process.env.A6_APP_OAUTH_CLIENT_ID || 'clientId',
  clientSecret: process.env.A6_APP_OAUTH_CLIENT_SECRET || 'clientSecret',
  issuer: process.env.A6_APP_OAUTH_PROVIDER_ISSUER || 'realms/myrealm/',
  token: process.env.A6_APP_OAUTH_PROVIDER_TOKEN_ENDPOINT || undefined,
});

/*
Not used -> now using built-in provider...does it provide token endpoint for refresh token?
*/
export const oauthProviderConfig = {
  id: 'angorasixkeycloak',
  name: 'AngorasixKeycloak',
  type: 'oauth',
  version: '2.0',
  wellKnown:
    process.env.A6_APP_OAUTH_PROVIDER_DISCOVERY_ENDPOINT ||
    '/myrealm/.well-known/openid-configuration',
  authorization: {
    url: process.env.A6_APP_OAUTH_PROVIDER_AUTHORIZATION_ENDPOINT || undefined,
    params: {
      scope:
        process.env.A6_APP_OAUTH_PROVIDER_AUTHORIZATION_SCOPES ||
        'openid email profile',
    },
  },
  token: process.env.A6_APP_OAUTH_PROVIDER_TOKEN_ENDPOINT || undefined,
  userinfo: process.env.A6_APP_OAUTH_PROVIDER_USERINFO_ENDPOINT || undefined,
  idToken: true,
  issuer: process.env.A6_APP_OAUTH_PROVIDER_ISSUER || 'realms/myrealm/',
  checks: ['pkce', 'state'],
  async profile(profile, tokens) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      identityProvider: profile.identityProvider
    };
  },

  clientId: process.env.A6_APP_OAUTH_CLIENT_ID || 'clientId',
  clientSecret: process.env.A6_APP_OAUTH_CLIENT_SECRET || 'clientSecret',
};
