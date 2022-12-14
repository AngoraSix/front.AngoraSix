export const getEnv = () => {
  const A6_APP_PREFIX = 'A6_APP_';
  const A6_ENV_KEYS = Object.keys(process.env).filter((key) =>
    key.toLowerCase().startsWith(A6_APP_PREFIX.toLowerCase())
  );

  const A6_ENV = A6_ENV_KEYS.reduce((prev, currentKey) => {
    prev[currentKey] = process.env[currentKey];
    prev[currentKey.slice(A6_APP_PREFIX.length)] = process.env[currentKey];
    return prev;
  }, {});

  return A6_ENV;
};
