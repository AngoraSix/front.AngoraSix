export const getPublicEnv = () => {
  const A6_APP_PREFIX = 'A6_PUBLIC_APP_';
  const A6_ENV_KEYS = Object.keys(process.env).filter((key) =>
    key.toLowerCase().startsWith(A6_APP_PREFIX.toLowerCase())
  );

  const A6_ENV = A6_ENV_KEYS.reduce((prev, currentKey) => {
    prev[currentKey] = process.env[currentKey];
    return prev;
  }, {});

  return A6_ENV;
};


const SECRETS_PATTERNS = ['SECRET', 'PASS', 'APIKEY'];

export const removeSecrets = (env) => {
  const safeEnvEntries = Object.entries(env).filter(([key]) => {
    return !SECRETS_PATTERNS.some(secretKeyPattern => key.toLowerCase().includes(secretKeyPattern.toLowerCase()))
  });

  // regenerate object from entries
  return Object.fromEntries(safeEnvEntries);
}
