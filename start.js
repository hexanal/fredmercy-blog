const { build } = require('./tasks/site')

build([
  require('./tasks/posts'),
  require('./tasks/pages')
])
