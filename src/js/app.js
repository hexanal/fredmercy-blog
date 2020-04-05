import RafManager from './core/RafManager';
import Components from './core/Components';

import a11y from './components/a11y';
import comments from './components/comments';
import collapse from './components/collapse';
import help from './components/help';
import highlight from './components/highlight';
import jumpto from './components/jumpto';
import nav from './components/nav';
import notes from './components/notes';

Components.register('a11y', a11y);
Components.register('comments', comments);
Components.register('collapse', collapse);
Components.register('help', help);
Components.register('highlight', highlight);
Components.register('jumpto', jumpto);
Components.register('nav', nav);
Components.register('notes', notes);

RafManager.start(); // start the requestAnimationFrame manager
Components.hello(); // mount all the components you find
