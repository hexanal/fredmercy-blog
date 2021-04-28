const fs = require('fs')
const marked = require('marked')
const templater = require('../lib/templater')

const ALLOWED_TYPES = ['page', 'post'] // content types to "build out"

const getTemplate = function( templateName, contentType ) {
  let templateFile

  try {
    templateFile = fs.readFileSync( `src/theme/views/${ templateName }.html`, 'utf8' )
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`[${process.env.npm_package_name}] [ERROR] template file “theme/views/${ templateName }” not found! (defaulting to: ${ contentType })`)
      templateFile = fs.readFileSync( `src/theme/views/${ contentType }.html`, 'utf8' )
    } else {
      throw err
    }
  }

  return templateFile
}

const formatContent = function( items ) {
  templater.usePartials('./src/theme/views')

  return items.map( item => {
    if ( !ALLOWED_TYPES.includes( item.meta.type ) ) return
    if ( !item.meta.url ) return

    // FIXME ? hey
    const templateData = {
      ...item,
      content: marked( item.body )
    }
    const destination = `./public${item.meta.url}`
    const templateName = item.meta.template || item.meta.type // default to content type
    const templateFile = getTemplate( templateName, item.meta.type )
    const template = templater.compile( templateFile.toString() )
    const htmlTemplate = template( templateData )

    templater.render(destination, htmlTemplate)

    return item
  })
}

module.exports = formatContent