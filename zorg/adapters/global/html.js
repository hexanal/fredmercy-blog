const fs = require('fs')
const marked = require('marked')
const templater = require('../../lib/templater')

const ALLOWED_TYPES = ['page', 'post'] // content types to "build out"

const getTemplate = function( templateName, contentType ) {
  let templateFile

  try {
    templateFile = fs.readFileSync( `src/theme/views/${ templateName }.html`, 'utf8' )
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`[fredmercy] [ERROR] template file “theme/views/${ templateName }” not found! (defaulting to: ${ contentType })`)
      templateFile = fs.readFileSync( `src/theme/views/${ contentType }.html`, 'utf8' )
    } else {
      throw err
    }
  }

  return templateFile
}

const formatContent = function( contentTypes ) {
  templater.usePartials('./src/theme/views')

  const types = Object.keys( contentTypes )

  types.map( type => {
    return contentTypes[type].map( item => {
      if ( !ALLOWED_TYPES.includes( item.meta.type ) ) return
      if ( !item.meta.url ) return

      // FIXME ? hey
      const templateData = {
        ...item,
        content: marked( item.body )
      }
      const destination = `./public${item.meta.url}`
      const templateName = item.meta.template || type // default to content type
      const templateFile = getTemplate( templateName, type )
      const template = templater.compile( templateFile.toString() )
      const htmlTemplate = template( templateData )

      templater.render(destination, htmlTemplate)

      return item
    })
  });

  return contentTypes
}

module.exports = formatContent