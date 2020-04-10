// import RafManager from './core/RafManager';
import Components from './core/Components';

import a11y from './components/a11y';
import comments from './components/comments';
import collapse from './components/collapse';
import help from './components/help';
import highlight from './components/highlight';
import jumpto from './components/jumpto';
import nav from './components/nav';
import notes from './components/notes';
import scroll from './components/scroll';
import sounds from './components/sounds';
import themes from './components/themes';
import transitions from './components/transitions';

Components.autoMount('a11y', a11y);
Components.register('comments', comments);
Components.register('collapse', collapse);
Components.register('help', help);
Components.register('highlight', highlight);
Components.register('jumpto', jumpto);
Components.register('nav', nav);
Components.register('notes', notes);
Components.autoMount('scroll', scroll);
Components.register('sounds', sounds);
Components.register('themes', themes);
Components.autoMount('transitions', transitions);

// todo: play with some requestAnimationFrame, baby!
// RafManager.start(); // start the requestAnimationFrame manager
Components.hello(); // mount all the components you find
