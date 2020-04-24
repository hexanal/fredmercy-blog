// import RafManager from './core/RafManager';
import Components from './core/Components';

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
import nav from './components/nav';
import notes from './components/notes';
import scroll from './components/scroll';
import tabs from './components/tabs';
import themes from './components/themes';
import transitions from './components/transitions';

// auto-mount (global) components
Components.autoMount('a11y', a11y);
Components.autoMount('bleeps', bleeps);
Components.autoMount('keyboard', keyboard);
Components.autoMount('scroll', scroll);
Components.autoMount('transitions', transitions);

// debuggers
Components.register('debug-ui', debugUI);
Components.register('debug-align', debugAlign);
Components.register('debug-stack', debugStack);

// register components
Components.register('comments', comments);
Components.register('collapse', collapse);
Components.register('help', help);
Components.register('highlight', highlight);
Components.register('jumpto', jumpto);
Components.register('nav', nav);
Components.register('notes', notes);
Components.register('tabs', tabs);
Components.register('themes', themes);

// mount all the components on the page
Components.start();

// * RafManager.start(); // start the requestAnimationFrame manager
