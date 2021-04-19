import Exponent from './tools/Exponent'
import events from './tools/eventer'

import a11y from './components/a11y'
import scroll from './components/scroll'

import box from './components/box'
import comments from './components/comments'
import drawer from './components/drawer'
import emit from './components/emit'
import help from './components/help'
import highlight from './components/highlight'
import themes from './components/themes'
import toTop from './components/to-top'

const container = document.getElementById('🌀')

Exponent
  .use([ events ])
  .autoload([
    a11y,
    scroll
  ])
  .register({
    'box': box,
    'comments': comments,
    'drawer': drawer,
    'emit': emit,
    'help': help,
    'highlight': highlight,
    'themes': themes,
    'to-top': toTop,
  })
  .mount(container)
