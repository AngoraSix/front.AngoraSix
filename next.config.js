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
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  i18n,
  images: {
    domains: ['lh3.googleusercontent.com', 'trello-members.s3.amazonaws.com', 'storage.googleapis.com', 'i.ytimg.com', 'googleusercontent.com', 'localhost', 'gateway'],
  },
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/welcome/cooperative',
        destination: '/welcome/community-driven',
        permanent: true
      },
      {
        source: '/es/welcome/cooperative',
        destination: '/es/welcome/community-driven',
        permanent: true
      }
    ]
  },
};