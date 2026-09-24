const siteMetadata = {
  title: 'OmniCTF',
  author: 'Elure',
  headerTitle: 'OmniCTF',
  description: 'You Play. You Hack. You Write.',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://omnictf.com',
  siteRepo: 'https://github.com/OmniCTF/OmniWeb',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/og-card.png`,
  xHandle: '@OmniCYBR',
  keywords: [
    'OmniCTF',
    'CTF',
    'capture the flag',
    'cybersecurity competition',
    'CTF Romania',
    'Constanta CTF',
    'hacking competition',
    'jeopardy CTF',
    'KOTH',
    'OMNICYBR',
  ],
  mastodon: '#',
  email_support: 'support@omnictf.com',
  email_sponsors: 'sponsors@omnictf.com',
  github: 'https://github.com/OmniCTF',
  x: 'https://x.com/OmniCYBR',

  facebook: 'http://facebook.com/omnictf',
  youtube: 'https://www.youtube.com/@OmniCYBR',
  linkedin: 'https://www.linkedin.com/company/omnicybr',
  instagram: 'https://www.instagram.com/omnicybr/',
  ctftime: 'https://ctftime.org/team/383015',
  locale: 'en-US',

  stickyNav: false,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    provider: '',
  },
  comments: {
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable

      metadata: '0',

      theme: 'transparent_dark',

      darkTheme: 'transparent_dark',

      themeURL: '',

      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
