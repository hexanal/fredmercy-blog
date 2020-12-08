const website = require('./zorg/builder')()

website.use({
  'post-meta': require('./zorg/middlewares/posts/post-meta'),
  'order': require('./zorg/middlewares/posts/order'),
  'adjacents': require('./zorg/middlewares/posts/adjacents'),
  'comments': require('./zorg/middlewares/posts/comments'),

  'page-meta': require('./zorg/middlewares/pages/page-meta'),
  'relationship': require('./zorg/middlewares/pages/relationship'),

  'post-index-as-parent': require('./zorg/middlewares/global/post-index-as-parent'),
  'posts-by-months': require('./zorg/middlewares/global/posts-by-months'),
  'content': require('./zorg/middlewares/global/content'),
  'json': require('./zorg/middlewares/global/json'),
  'export-to-json': require('./zorg/middlewares/global/export-to-json'),
  'html': require('./zorg/middlewares/global/html')
})

website.build()

module.exports = website
