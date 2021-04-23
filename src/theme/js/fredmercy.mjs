import moduler from './tools/moduler.js'
import events from './tools/eventer.js'

/**
 * What's going on?
 * ----------------
 *
 * `moduler.use` accepts an object of middlewares: these are functions which are
 * passed the props for each of the found modules on the page, to "augment" them
 *
 * `moduler.mount` accepts a single DOM element; it will find all elements with
 * the attribute [data-component] and load the appropriate JS module for them.
 *
 * A module is a function which is passed an object of this shape:
 *
 * { element, children, [other middlewares] }
 *
 * - `element` is the DOM element found by `moduler`
 * - `children` are all the `[data-child]` elements found inside `element`
 * - [other middlewares] in this case will be `events`, which is instantiated
 *   using the other props above -> useful to extend moduler
 */

console.info('-> %cwelcome to:', 'font-style: italic')
console.info(`
 ╔═╗         ╔╗
 ║╔╝         ║║
╔╝╚╗╔═╗╔══╗╔═╝║╔╗╔╗╔══╗╔═╗╔══╗╔╗ ╔╗  ╔══╗╔══╗
╚╗╔╝║╔╝║╔╗║║╔╗║║╚╝║║╔╗║║╔╝║╔═╝║║ ║║  ║╔═╝╚ ╗║
 ║║ ║║ ║║═╣║╚╝║║║║║║║═╣║║ ║╚═╗║╚═╝║╔╗║╚═╗║╚╝╚╗
 ╚╝ ╚╝ ╚══╝╚══╝╚╩╩╝╚══╝╚╝ ╚══╝╚═╗╔╝╚╝╚══╝╚═══╝
                              ╔═╝║
                              ╚══╝
`)

moduler
  .use({ events })
  .mount( document.body )
