const fs = require('fs')
const chalk = require('chalk')
const templater = require('../../bin/templater')

const formatContent = function( contentTypes ) {
  templater.usePartials('./src/components')

  const types = Object.keys( contentTypes )

  types.map( type => {
    console.log( chalk.yellow(`[middleware] [html] ${contentTypes[type].length} “${type}” items`) );

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