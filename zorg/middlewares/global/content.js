const marked = require('marked')

const formatContent = function({ contentTypes }) {
  const withContent = {}

  Object.keys( contentTypes ).map( type => {
    withContent[type] = contentTypes[type].map( item => {
      const content = marked( item.content )

      return {
        ...item,
        content
      }
    })
  })

  return withContent
}

module.exports = formatContent