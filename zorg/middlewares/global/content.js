const marked = require('marked')

const formatContent = function(items) {
  return items.map( item => {
    const content = marked( item.content )

    return {
      ...item,
      content
    }
  })
}

module.exports = formatContent