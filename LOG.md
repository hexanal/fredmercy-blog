* TODO
    * Fix: drawer component styles
    * Fix: accessibility audit of themes / fix contrasts / create a11y specific theme
    * Fix: add the list of theme straight into the HTML on build / update JS
    * Fix: color of low-opacity background in custom scrollbars...

* fix vertical alignment of comments box
    * **when I've got some time**
    * ResizeObserver ?
    * box: onresize
        - calculate height of contained div
        - resize frame to match?
        - allow box to sit smack in the middle

* maybe work with services?
    * **when I'm building something new, ----> LATER**
    - keyboard shortcut service
    - event service (with state service -> like a reducer?)
    - viewport service? -> where in the page, how big, media, etc.
    - loader service?
        - to determine when all the components on the page are loaded and ready,
        - toggle a loading animation/state
    - storage service -> localStorage / indexedDB

* add svg symbols support
    - **postponing until redesign**
    - for header icons and others (replace arrows, etc.)

* change a staterized value with reefer?
    - **HOLD FOR NOW -> thing might change when using a vdom implementation**
    - everything in `.changed()` will get called, dude
    - pass... a staterized state PLUGGED with the messaging middleware
    - that way you have a redux-like thing
        - an event calls a "reducer" function
        - the reducer updates `stater` keys
        - whatever's hooked in `stater.changed` is updated?
    * reefer only one value
    * can dynamically set spring
    * try with set() / get() functions?
        - could be the key haha

* add some sort of GUI page... to rebuild pages?
    - **this is a bit far out...**
    - how to make it... secure?
    - or only build that page when developing?
    - but it would be nice to have it online too

* for `static generation` ... from JS templates, import CSS
    - do test with `hyperapp-notes` ?
    - or the preact project?... I don't know dude

* test `storeon`

* editing markdown in browser with http://coolwanglu.github.io/vim.js/emterpreter/vim.html
    - with preview
    - ..?

* search powered by: https://stork-search.net/docs/config-ref/
    - yeah?

* pass protect?
    - https://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js/8003291#8003291
      - old? https://stackoverflow.com/questions/12276046/nodejs-express-how-to-secure-a-url
    - https://github.com/kelektiv/node.bcrypt.js -> use sqlite? idk...


* exponent
    - only one "child" selector (combine ui/control)
        - get dataset from all?
    - children ( data-child="something" )
        - then can destructure in component
```
export default ({ children }) => {
    const { something } = children

    console.log( something.dataset )
})
```