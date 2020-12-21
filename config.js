const zorg = require('./zorg')
const website = zorg()

website.use({
  'post-meta': require('./zorg/middlewares/posts/post-meta'),
  'order': require('./zorg/middlewares/posts/order'),
  'adjacents': require('./zorg/middlewares/posts/adjacents'),
  'comments': require('./zorg/middlewares/posts/comments'),
  'rss-feed': require('./zorg/middlewares/posts/rss-feed'),

  'page-meta': require('./zorg/middlewares/pages/page-meta'),
  'relationship': require('./zorg/middlewares/pages/relationship'),

  'post-index-as-parent': require('./zorg/middlewares/global/post-index-as-parent'),
  'posts-by-months': require('./zorg/middlewares/global/posts-by-months'),
  'shortcodes': require('./zorg/middlewares/global/shortcodes'),
  'content': require('./zorg/middlewares/global/content'),
  'ui-data': require('./zorg/middlewares/global/ui-data'),
  'json': require('./zorg/middlewares/global/json'),
  // 'export-to-json': require('./zorg/middlewares/global/export-to-json'),
  'sitemap-xml': require('./zorg/middlewares/global/sitemap-xml'),
  'html': require('./zorg/middlewares/global/html')
})

module.exports = website
