import Exponent from 'exponent-core';
import Messaging from './middlewares/Messaging';

// autoloaded
import a11y from './components/a11y';
import keyboard from './components/keyboard';
import rainbow from './components/rainbow';
import scroll from './components/scroll/scroll';
import transitions from './components/transitions';

// ui
// import bleeps from 'components/bleeps';
import comments from './components/comments';
import drawer from './components/drawer';
import filterBookmarks from './components/bookmarks/filter-bookmarks';
import help from './components/help';
import highlight from './components/highlight';
import jumpto from './components/jumpto';
import live from './components/live';
import nav from './components/nav';
import sideNote from './components/side-note';
import tabs from './components/tabs';
import themes from './components/themes';

import extra from './components/resume/extra';

const container = document.querySelector('[data-barba="container"]');

Exponent
	.use([ Messaging ])
	.autoload([
		a11y,
		keyboard,
		rainbow,
		scroll,
		transitions
	])
	.register({
		'comments': comments,
		'drawer': drawer,
		'extra': extra,
		'filter-bookmarks': filterBookmarks,
		'help': help,
		'highlight': highlight,
		'jumpto': jumpto,
		'live': live,
		'nav': nav,
		'side-note': sideNote,
		'tabs': tabs,
		'themes': themes
	})

	.mount(container);
