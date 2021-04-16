const websites = [
  {
    baseURL: '/',
    baseDomain: 'https://fredmercy.ca',
    locale: 'en',
    name: '[fredmercy.ca -> english]',
    contentSrc: './src/content/en/**/*.md'
  },
  {
    baseURL: '/fr',
    baseDomain: 'https://fredmercy.ca',
    locale: 'fr',
    name: '[fredmercy.ca -> français]',
    contentSrc: './src/content/fr/**/*.md'
  }
]

const adapters = [
  // for posts
  require('./adapters/posts/post-meta'),
  require('./adapters/posts/order'),
  require('./adapters/posts/adjacents'),
  require('./adapters/posts/rss-feed'),

  // for pages
  require('./adapters/pages/page-meta'),
  require('./adapters/pages/relationship'),

  // for any type
  require('./adapters/global/post-index-as-parent'),
  require('./adapters/global/shortcodes'),
  require('./adapters/global/modules'),
  require('./adapters/global/sitemap-xml'),
  require('./adapters/global/aliases'),
  require('./adapters/global/link-checker'),
  require('./adapters/global/export-to-json'),
  require('./adapters/global/posts-by-months'),
  require('./adapters/global/html'),
]

module.exports = { websites, adapters }
