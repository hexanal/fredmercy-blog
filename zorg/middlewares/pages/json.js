const fs = require('fs')

const getJsonData = function( item ) {
  const jsonFilePath = item._filePath.replace('.md', '.json')
  const jsonFile = fs.readFileSync( jsonFilePath, 'utf8' )
  const json = JSON.parse( jsonFile )

  return json
}

const applyJson = function( items ) {
  return items.map( item => {
    const { useJSON } = item.meta
    const json = useJSON ? getJsonData( item ) : null

    return {
      ...item,
      json
    }
  })
}

module.exports = applyJson
