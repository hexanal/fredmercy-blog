import Exponent from './tools/Exponent'
import Messaging from './tools/Messaging'

// autoloaded
import a11y from './components/a11y'
import ball from './components/ball'
import i18n from './components/i18n'
import rainbow from './components/rainbow'
import scroll from './components/scroll/scroll'
import transitions from './components/transitions'

// ui
import box from './components/box'
import comments from './components/comments'
import drawer from './components/drawer'
import emit from './components/emit'
import filterBookmarks from './components/bookmarks/filter-bookmarks'
import help from './components/help'
import highlight from './components/highlight'
import sideNote from './components/side-note'
import themes from './components/themes'
import toTop from './components/to-top'

const container = document.querySelector('[data-barba="container"]')

Exponent
  .use([ Messaging ])
  .autoload([
    a11y,
    ball,
    i18n,
    rainbow,
    scroll,
    transitions
  ])
  .register({
    'box': box,
    'comments': comments,
    'drawer': drawer,
    'emit': emit,
    'filter-bookmarks': filterBookmarks,
    'help': help,
    'highlight': highlight,
    'side-note': sideNote,
    'themes': themes,
    'to-top': toTop,
  })
  .mount(container)
