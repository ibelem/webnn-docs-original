import nextra from 'nextra'
 
const withNextra = nextra({
  defaultShowCopyCode: true,
  latex: true,
  contentDirBasePath: '/',
  unstable_shouldAddLocaleToLinks: true
  // ... Other Nextra config options
})
 
// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'microsoft.github.io',
        port: '',
        pathname: '/webnn-developer-preview/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'webmachinelearning.github.io',
        port: '',
        search: '',
      },
    ],
  },
})