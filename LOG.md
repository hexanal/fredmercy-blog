## unfollow people on twitter

- leave the people who don't help me be happier
- add real people I've met that I kind of miss
- reconnect, and push people toward privacy-friendly services
- damn... these hacker news articles, man... I'm falling into this :)


##  i18n & big refactoring session

- can we just... use a page "id" as the link between the languages?
    - name your page the same, and it'll be linked
    - i18n middleware could do:
        - fetch the versions of the pages
        - stick in `meta.translations`
        - other plugins need to hook onto the i18n-enabled stuff
            - `languages.length`
- add server folder, stick the `server.js` file in it
    - clean up server
    - split up API routes
    - split up websocket business
    - split up server setup and middlewares
- should the folder structure define the final URL, or can the URL be specified in the front-matter?
- then we could use the `blog.en.md` and `blog.fr.md` trick?

* TODO
    * Fix: accessibility audit of themes / fix contrasts / create a11y specific themes?
    * Fix: allow "autoloaded" components to be hooked to a DOM element?
        * maybe drop `exponent` altogether, or figure out a better `onInit` / `onDestroy` lifecycle system?

## put your thinking cap on

* ability to stamp out HTML components from handlebarsjs
* have something that just juggles all those references
* then inject data into that shit
* rebuild a "tree" of dependencies
* HTML into HTML + swell it up with data + data the lifeblood of a website
* the sap, running through the tree
* **sève**

* look into implementing [microformats](https://microformats.io/)
* look into implementing [webmentions](https://www.w3.org/TR/webmention/)


## 11ty

- why not use eleventy?
- get i18n to work
- get all the shortcodes to work
- use Nunjucks templating?
- I think it's where I am at, maybe... to try something that's mainstream, maintained
- looks like it works very similarly to my solution

## future...

* try editing markdown in browser with http://coolwanglu.github.io/vim.js/emterpreter/vim.html
    - with preview
    - ..?

* try search powered by: https://stork-search.net/docs/config-ref/
    - yeah?
    - dunno...

* is the better source of truth for content the Markdown, or the JSON?
    * considering I'm already intermixing markdown with JSON, and produce a JSON file for final consumption, why not just stick everything in JSON, and use references to markdown files to build the pages (markdown content would be like... a module; a page without "editorial ccontent" would just be a JSON with basic configuration
    * minimal JSON
    * block-stitching; there's already something to use "blocks" easily, see in `resume.html`

```json
{
    "meta": {
        "title": "Bookmarks",
        "description": "Let's say this is a description",
        "type": "page"
    },
    "blocks": [
        {
            "component": "blocks/markdown",
            "file": "/content/bookmarks.md"
        },
        {
            "component": "blocks/newsletter"
        },
        {
            "component": "blocks/markdown",
            "file": "/content/bookmarks.footer.md"
        }
    ]
}
```

* fix vertical alignment of comments box
    * **when I've got some time**
    * ResizeObserver ?
    * box: onresize
        - calculate height of contained div
        - resize frame to match?
        - allow box to sit smack in the middle?

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
    * can dynamically set spring

* add some sort of GUI page... to rebuild pages?
    - **this is a bit far out...**
    - how to make it... secure?
    - or only build that page when developing?
    - but it would be nice to have it online too

* for `static generation` ... from JS templates, import CSS
    - do test with `hyperapp-notes` ?
    - or the preact project?... I don't know dude

* test `storeon`

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

* highdea # 8932434
    - keep the user's data on their disk
    - they need to sync it between devices
        - can use a hyperdrive for this purpose?
        - decentralized account and data retention
        - how to handle encryption?
        - gotta encrypt end-to-end

* highdea # 30298423
    - html web components
    - js -> grab the "scaffold"
        - render function re-renders all the "tracked" DOM elements
    - css -> is injected on a per-component basis
        - can be "lazy-loaded"
        - is "bundle-splitting"?
        - is Sass?
        - we can process the sass on a per-component basis
        - how do we do global variables?
        - they're out there
    - nobody writes html
        - we've never written html (it's always generated by another language)
        - we don't write css -> sass, less, postcss, ... TAILWIND?!?!
        - js... more like, ecmascript2018?! with babel?!? that's weird as fuck

* zorg-based websites?
    * a web-based unit converter that's made for mobile/tablet
        - kitchen utility
    * a web-based recipe repository

* something that suggest to create a redirection when changing the URL of a page/post
    - so that links on other websites that were pointing to that URL aren't landing nowhere
    - maybe that's an obvious thing that's being done by Wordpress out of the box? I don't know?

## discussion about zorg

The zorg "middleware" thing is super unwieldy. And it makes me yearn so much for a templating structure that's much much closer tied to the data, somehow.

Ok. The point is to have a way to manage data in the simplest form possible. Format it in a way that's good enough for editing, and good enough for parsing it and sticking it inside templates.

In my setup, I miss the ability to do some processing close to the template. The data needs to be massaged a bit before going into the template.

For example, the blog index needs to have the list of all posts, grouped by month. This happens in a middleware, but probably could, and should happens at the template level. Using JS templating would solve that issue because the massaging would occur at or before the rendering of the HTML.

There's a lot in there. It means... I need something that follows the structure of the data, but at the same time _transforms_ it to match what needs to be displayed in the browser. Something like a render-tree, vdom React-style thing, that takes some data input and renders the HTML.

## MANIFEST

I want to be able to freely express myself through making websites. Do them well, so that they're lean and mean, minimal but visceral.
And I get that sucker ANYWHERE that runs a browser: which means I can be anywhere. Anywhere I want.
A website like that, is like a virus, bro. I now can linger on the internet and be displayed on any fucking screen.

That's the power of the web. The New Web Era.