const { i18n } = require('./next-i18next.config');

module.exports = {
  webpack: (config, { buildId, dev }) => {
    config.resolve.symlinks = false;
    // To avoid issues with google-auth-library (which should be used only on SERVER side!)
    config.resolve.fallback = {
      fs: false,
      child_process: false,
      net: false,
      tls: false,
    };
    return config;
  },

  i18n,
  images: {
    domains: ['storage.googleapis.com', 'i.ytimg.com', 'googleusercontent.com', 'localhost', 'gateway'],
  },
  output: 'standalone',
};