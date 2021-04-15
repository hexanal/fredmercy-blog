import Exponent from './tools/Exponent'
import events from './tools/eventer'

// autoloaded
import a11y from './components/a11y'
import i18n from './components/i18n'
import rainbow from './components/rainbow'
import scroll from './components/scroll/scroll'

// ui
import box from './components/box'
import comments from './components/comments'
import drawer from './components/drawer'
import emit from './components/emit'
import help from './components/help'
import highlight from './components/highlight'
import sideNote from './components/side-note'
import themes from './components/themes'
import toTop from './components/to-top'

const container = document.getElementById('🌀')

Exponent
  .use([ events ])
  .autoload([
    a11y,
    rainbow,
    scroll
  ])
  .register({
    'box': box,
    'comments': comments,
    'drawer': drawer,
    'emit': emit,
    'help': help,
    'highlight': highlight,
    'side-note': sideNote,
    'themes': themes,
    'to-top': toTop,
  })
  .mount(container)
