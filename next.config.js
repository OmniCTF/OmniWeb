const { withContentlayer } = require('next-contentlayer2')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const ContentSecurityPolicy = `
  default-src 'self';

  script-src
    'self'
    'unsafe-eval'
    'unsafe-inline'
    giscus.app
    analytics.umami.is
    cloud.umami.is
    pagead2.googlesyndication.com
    googlesyndication.com
    googleads.g.doubleclick.net
    www.googletagservices.com
    adservice.google.com
    tpc.googlesyndication.com;

  script-src-elem
    'self'
    'unsafe-inline'
    giscus.app
    analytics.umami.is
    cloud.umami.is
    pagead2.googlesyndication.com
    googlesyndication.com
    googleads.g.doubleclick.net
    www.googletagservices.com
    adservice.google.com
    tpc.googlesyndication.com;

  style-src
    'self'
    'unsafe-inline'
    fonts.googleapis.com;

  font-src
    'self'
    data:
    fonts.gstatic.com;

  img-src
    'self'
    data:
    blob:
    https:;

  connect-src
    'self'
    https:
    wss:;

  frame-src
    'self'
    giscus.app
    googleads.g.doubleclick.net
    tpc.googlesyndication.com;

  media-src 'self' *.s3.amazonaws.com;
`;


const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/** @type {import('next').NextConfig} */
const baseConfig = {
  output,
  basePath,
  reactStrictMode: true,
  trailingSlash: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  devIndicators: false,
  eslint: {
    dirs: ['app', 'components', 'layouts', 'scripts'],
  },
  images: {
  domains: [
    'cdn.discordapp.com',
    'media.discordapp.net',
    'media.canva.com',
    'static.canva.com',
    'marketplace.canva.com',
    'picsum.photos',
    'caido.io',
    'spectrumconstanta.ro',
    'yt3.ggpht.com',
    'cdn.simpleicons.org',
  ],
},
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), baseConfig)
}
