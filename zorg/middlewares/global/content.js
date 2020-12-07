const marked = require('marked')

const formatContent = function( contentTypes ) {
  const withContent = {}
  const types = Object.keys( contentTypes )

  types.map( type => {
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