import Exponent from 'exponent-core';
import Messaging from 'middlewares/Messaging';
import JustPeek from 'middlewares/JustPeek';

import debugUI from './components/debug/debug-ui';
import debugAlign from './components/debug/debug-align';
import debugStack from './components/debug/debug-stack';

import a11y from './components/a11y';
import bleeps from './components/bleeps';
import comments from './components/comments';
import collapse from './components/collapse';
import help from './components/help';
import highlight from './components/highlight';
import jumpto from './components/jumpto';
import keyboard from './components/keyboard';
import live from './components/live';
import nav from './components/nav';
import notes from './components/notes';
import scroll from 'components/scroll/scroll';
import tabs from './components/tabs';
import themes from './components/themes';
import transitions from './components/transitions';

Exponent
	.use([ Messaging, JustPeek ])
	.register({
		'debug-ui': debugUI,
		'debug-align': debugAlign,
		'debug-stack': debugStack,
		'bleeps': bleeps,
		'comments': comments,
		'collapse': collapse,
		'help': help,
		'highlight': highlight,
		'jumpto': jumpto,
		'live': live,
		'nav': nav,
		'notes': notes,
		'tabs': tabs,
		'themes': themes,
	})
	.autoload([
		a11y,
		keyboard,
		scroll,
		transitions
	])
	.mount(document);

