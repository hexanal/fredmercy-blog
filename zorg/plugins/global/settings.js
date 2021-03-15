// FIXME settings in config file?
const SETTINGS = {
  INTERFACE_ENABLED: true,
  USE_THEMES: true,
  USE_BLEEPS: false,
}

const addSettings = function( contentTypes ) {
  const withSettings = {}

  Object.keys( contentTypes ).map( type => {
    withSettings[type] = contentTypes[type].map( item => ({ ...item, SETTINGS }) )
  })

  return withSettings
}

module.exports = addSettings
