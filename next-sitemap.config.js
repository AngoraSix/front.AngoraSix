/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://angorasix.com',
  generateRobotsTxt: true,
  exclude: [
    '/api/*',
    '/projects/*',
    '/clubs/*',
    '/managements/*',
    '/welcome/post-registration',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/welcome/', '/pricing', '/about', '/legal/'],
        disallow: ['/api/', '/clubs/', '/projects/', '/managements/', '/welcome/post-registration'],
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps here if needed
    ],
  },
}
