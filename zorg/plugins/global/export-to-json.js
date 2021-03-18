const { write } = require('../../bin/files')

const exportToJson = function( contentTypes ) {
  Object.keys( contentTypes ).map( type => {
    contentTypes[type].map( item => {
      const stringified = JSON.stringify( item )
      const destination = `./public${item.meta.url}`

      write(destination, `_data.json`, stringified)
    })
  })

  return contentTypes
}

module.exports = exportToJson
