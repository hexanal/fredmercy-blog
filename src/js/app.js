import Exponent from 'exponent-core'
import Messaging from './middlewares/Messaging'
// import State from './middlewares/State'

// autoloaded
import a11y from './components/a11y'
import keyboard from './components/keyboard'
import rainbow from './components/rainbow'
import scroll from './components/scroll/scroll'
import transitions from './components/transitions'

// ui
// import bleeps from './components/bleeps'
import ball from './components/ball'
import box from './components/box'
import comments from './components/comments'
import drawer from './components/drawer'
import emit from './components/emit'
import filterBookmarks from './components/bookmarks/filter-bookmarks'
import help from './components/help'
import highlight from './components/highlight'
import jumpto from './components/jumpto'
import live from './components/live'
import sideNote from './components/side-note'
import tabs from './components/tabs'
import themes from './components/themes'
import toTop from './components/to-top'

import extra from './components/resume/extra'

const container = document.querySelector('[data-barba="container"]')

Exponent
	.use([ Messaging ])
	.autoload([
		a11y,
		ball,
		keyboard,
		rainbow,
		scroll,
		transitions
	])
	.register({
		// 'bleeps': bleeps,
		'box': box,
		'comments': comments,
		'drawer': drawer,
		'emit': emit,
		'extra': extra,
		'filter-bookmarks': filterBookmarks,
		'help': help,
		'highlight': highlight,
		'jumpto': jumpto,
		'live': live,
		'side-note': sideNote,
		'tabs': tabs,
		'themes': themes,
		'to-top': toTop,
	})
	.mount(container)
