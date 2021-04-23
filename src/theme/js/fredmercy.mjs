import moduler from './tools/moduler.js'
import events from './tools/eventer.js'

moduler
  .use({ events })
  .mount( document.getElementById('🌀') )
