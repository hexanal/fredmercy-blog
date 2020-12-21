const fs = require('fs')

const addGlobalData = function( contentTypes ) {
  const withGlobalData = {}
  const types = Object.keys( contentTypes )

  // could reduce... meh
  types.map( type => {
    withUIData[type] = contentTypes[type].map( item => {
      return {
        ...item,
        global: contentTypes // the old recursive mantra
      }
    })
  })

  return withGlobalData
}

module.exports = addGlobalData
