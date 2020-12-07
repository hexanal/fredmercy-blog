const fs = require('fs')
const templater = require('../../templater')

const formatContent = function( contentTypes ) {
  templater.usePartials('./src/components')

  const types = Object.keys( contentTypes )

  types.map( type => {
    console.log(`[info] building ${contentTypes[type].length} items of type: “${type}”...`);

    return contentTypes[type].map( item => {
      const destination = `./public${item.meta.url}`
      const defaultTemplate = `templates/${type}`
      const templateName = item.meta.template || defaultTemplate
      const templateFile = fs.readFileSync( `src/components/${ templateName }.html`, 'utf8' )
      const template = templater.compile( templateFile.toString() )
      const htmlTemplate = template(item)

      templater.render(destination, htmlTemplate)

      return item
    })
  });

  return contentTypes
}

module.exports = formatContent