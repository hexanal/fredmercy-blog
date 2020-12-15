const fs = require('fs')
const glob = require('glob')

const getUIData = function() {
  const uiDataFiles = glob.sync('./content/_data/**/*.json', {})

  return uiDataFiles.reduce( (acc, filePath) => {
    const jsonFile = fs.readFileSync( filePath, 'utf8' )
    const json = JSON.parse( jsonFile )

    return {
      ...acc,
      ...json
    }
  }, {})
}

const addUIData = function( contentTypes ) {
  const uiData = getUIData()
  const withUIData = {}
  const types = Object.keys( contentTypes )

  // could reduce... meh
  types.map( type => {
    withUIData[type] = contentTypes[type].map( item => {
      return {
        ...item,
        ui: uiData
      }
    })
  })

  return withUIData
}

module.exports = addUIData