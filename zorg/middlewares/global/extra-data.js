const fs = require('fs')
const glob = require('glob')

const getExtraData = function() {
  const extraDataFiles = glob.sync('./content/**/*.json', {})

  return extraDataFiles.reduce( (acc, filePath) => {
    const jsonFile = fs.readFileSync( filePath, 'utf8' )
    const json = JSON.parse( jsonFile )

    return { ...acc, ...json }
  }, {})
}

const addExtraData = function( contentTypes ) {
  const extraData = getExtraData()
  const withExtraData = {}
  const types = Object.keys( contentTypes )

  // TODO could use a cool reduce func here but... meh
  types.map( type => {
    withExtraData[type] = contentTypes[type].map( item => ({ ...item, ...extraData }) )
  })

  return withExtraData
}

module.exports = addExtraData