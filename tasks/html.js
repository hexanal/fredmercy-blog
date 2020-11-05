const fs = require('fs')
const Handlebars = require('handlebars')

const { writeHTML } = require('./files')

const registerPartialHelper = function() {
  Handlebars.registerHelper('block', function (template, context, opts) {
    const f = Handlebars.partials[template]

    if (!f) return '[...]'

    const block = Handlebars.compile( f )

    return new Handlebars.SafeString( block(context) )
  })
}

const isDir = function (filename) {
  const stats = fs.statSync(filename)
  return stats && stats.isDirectory()
}

const isValidExtension = function (filename) {
  return filename.split('.').pop() === 'html'
}

const partialName = function (filename, base) {
  let name = filename.substr(0, filename.lastIndexOf('.'))
  name = name.replace(new RegExp('^' + base + '\\/'), '')

  return name
}

const registerPartial = function (filename, base) {
  if ( !isValidExtension(filename) ) return
  const name = partialName(filename, base)
  const template = fs.readFileSync(filename, 'utf8')

  Handlebars.registerPartial(name, template)
}

const registerPartials = function (dir, base) {
  fs.readdirSync(dir).forEach(basename => {
    const filename = dir + '/' + basename

    if ( isDir(filename) ) {
      registerPartials(filename, base)
    } else {
      registerPartial(filename, base)
    }
  })
}

const compile = function( template ) {
  return Handlebars.compile( template )
}

const render = function(destination, html ) {
  writeHTML(destination, html)
}

const usePartials = function( dir ) {
  registerPartials(dir, dir)
  registerPartialHelper()
}

module.exports = {
  compile,
  render,
  usePartials
}