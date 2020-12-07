const fs = require('fs')

const addJsonData = function( contentTypes ) {
  const withJsonData = {}
  const types = Object.keys( contentTypes )

  types.map( type => {
    withJsonData[type] = contentTypes[type].map( item => {
      const { useJSON } = item.meta
      const json = useJSON ? getJsonData( item ) : null

      return {
        ...item,
        json
      }
    })
  })

  return withJsonData
}

const getJsonData = function( item ) {
  const jsonFilePath = item._filePath.replace('.md', '.json')
  const jsonFile = fs.readFileSync( jsonFilePath, 'utf8' )
  const json = JSON.parse( jsonFile )

  return json
}

module.exports = addJsonData
