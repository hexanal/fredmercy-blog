const { write } = require('../../helpers/files')

const exportToJson = function( contentTypes ) {
  const types = Object.keys( contentTypes )

  types.map( id => {
    const stringified = JSON.stringify( contentTypes[id] )
    const destination = `exports/${id}`

    write(destination, `${id}-export.json`, stringified)
  })

  return contentTypes
}

module.exports = exportToJson
