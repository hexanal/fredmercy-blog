const { write } = require('../../lib/files')

const ALLOWED_TYPES = ['page', 'post']

const exportToJson = function( contentTypes ) {
  Object.keys( contentTypes ).map( type => {
    if ( !ALLOWED_TYPES.includes(type) ) return

    contentTypes[type].map( item => {
      const stringified = JSON.stringify( item )
      const destination = `./public${item.meta.url}`

      write(destination, `_data.json`, stringified)
    })
  })

  return contentTypes
}

module.exports = exportToJson
