const fs = require('fs')
const marked = require('marked')
const templater = require('../../bin/templater')
const { debugLog } = require('../../bin/utils')

const formatContent = function( contentTypes ) {
  templater.usePartials('./src/theme/views')

  const types = Object.keys( contentTypes )

  types.map( type => {
    debugLog( `[middleware] [html] ${contentTypes[type].length} “${type}” items` )

    return contentTypes[type].map( item => {
      if ( !item.meta.url ) return

      // FIXME ?
      const templateData = {
        ...item,
        content: item.content ? marked( item.content ) : false,
        excerpt: item.excerpt ? marked( item.excerpt ) : false,
      }
      const destination = `./public${item.meta.url}`
      const templateName = item.meta.template || type // default to content type
      const templateFile = fs.readFileSync( `src/theme/views/${ templateName }.html`, 'utf8' )
      const template = templater.compile( templateFile.toString() )
      const htmlTemplate = template( templateData )

      templater.render(destination, htmlTemplate)

      return item
    })
  });

  return contentTypes
}

module.exports = formatContent