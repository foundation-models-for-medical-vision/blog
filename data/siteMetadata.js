/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Foundation Models for Medical Vision',
  author: 'Jun Ma',
  headerTitle: 'Blog',
  description: 'Foundation Models for Medical Vision',
  language: 'en-us',
  theme: 'light', // system, dark or light
  siteUrl: 'https://junma.ai/blog',
  siteRepo: 'https://github.com/JunMa11/foundation-models-blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: '',
  github: 'https://github.com/JunMa11',
  x: 'https://x.com/JunMa_AI4Health',
  linkedin: 'https://www.linkedin.com/in/jun-ma-867b34224/',
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  // Newsletter: using Google Forms instead of built-in provider
  // Link: https://forms.gle/bLxGb5SEpdLCUChQ7
  newsletter: {
    provider: '',
  },
  // Comments disabled per project requirements
  comments: {
    provider: '',
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
