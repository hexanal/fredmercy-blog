## TODO

* Fix: accessibility audit of themes / fix contrasts / create a11y specific themes?
* Fix: allow "autoloaded" components to be hooked to a DOM element?
    - maybe drop `exponent` altogether, or figure out a better `onInit` / `onDestroy` lifecycle system?
    - lifecycle is a good feature to have, I think...
    - something that sends a signal when every component is loaded? (hook onto that stuff to trigger things when all the elements of the page are ready)
* make webmanifest translatable? -> is it useful?

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

* implement themes
    - different from "colorscheme" :)
    - `src/themes/june/layouts` [...]
    - why?
    - idea1
        - `src/theme/manifest.webmanifest`
        - `src/theme/fonts/`
        - `src/theme/images/`
        - `src/theme/js/`
        - `src/theme/styles/`
        - `src/theme/views/`
            - `blocks/`
            - `components/`
            - `layouts/`

* how to have a nice visual overview of the codebase
    - to see what could be refactored
    - to understand it faster (for devs unfamiliar with it)
    - to debug

## "dynamic" linking?

- shit like: [a link whose URL might change in the future](${url:the-page-id-slug-or-whatever})
    - or: have something that generates a unique id for a permalink? (based on what? `id`?)
    - might be a combination of both things
    - a job for a `token.js` ZORG plugin :)
        - gotta find a new name, seriously
- other
    - [go to the French version!](${lang:fr})
    - [go to the Spanish version!](${lang:es})

## markdown

```hbs
{{#markdown }}

# Blah blah!

Yo!

{{/markdown}}
```

## finds

- horrible shit right here: https://github.com/qeeqbox/social-analyzer
- try that bullshit: https://vitejs.dev/
- toke up: http://omrelli.ug/smoke.js/
- ditherpunk: https://www.makeworld.space/2021/02/dithering.html

## 11ty

- why not use eleventy?
- get all the shortcodes to work
- get i18n to work
- use Nunjucks templating?
- I think it's where I am at, maybe... to try something that's mainstream, maintained
- looks like it works very similarly to my solution

- or maybe just swap HandlebarsJS for Nunjucks, which seems way more extendable?

## future...

* check out source code for a few projects, just to get a feel of how motherfuckers out there handle that stuff?

* how about...?
    - api endpoints, dynamic, to build JSONs
        - on a per-page basis?
    - `api/v1/get-page/ramblings/we-failed-you` -> JSON object for that page?
    - use the same base functions/api to build out the static website

* modal z-index management
    - keep track of which are open
    - latest is highest
    - gotta learn about "heap/stack" programming structures

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
    * could even all be in HandlebarsJS bro (see: `## markdown`)

* taking the time, taking it slow to create something
    - makes it sturdier, it weathers the storm
    - can't crumble something that's already stripped down!
    - build as you go, document your way, exploratory building
    - the thoughtful act
    - this is why products that help to develop faster, and _iterate_, and deploy faster, etc. are missing the point **I'm** trying to make
        - building is an art whose value is great but it doesn't seek _value for value's sake_
        - it shouldn't be about trying to get to a product sooner, otherwise it's just a race to the bottom, you know?
        - keep adding new stuff! it'll be alright!
        - it should be about taking the time and the care to deliver something special: something that simply works.

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

* try some `<noscript>` bullshit to see if I can have a version of the website that's usable even without javascript

* fix vertical alignment of comments box
    * **when I've got some time**
    * ResizeObserver ?
    * box: onresize
        - calculate height of contained div
        - resize frame to match?
        - allow box to sit smack in the middle?

* add something to handle client-side URL hash 'routing'
    - `[...]/some-page-url/#(comments)` -> shows the comments box
        - link to the "id" of a box? (box component shows when in URL hash)
    -

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

## old ideas, needs revisiting

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

## very old, need to decide whether to keep or discard

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
    - need to get high again to understand wtf I wrote above...

* more zorg-based websites?
    * a web-based unit converter that's made for mobile/tablet
        - kitchen utility
    * a web-based recipe repository

* something that suggest to create a redirection when changing the URL of a page/post
    - so that links on other websites that were pointing to that URL aren't landing nowhere
    - maybe that's an obvious thing that's being done by Wordpress out of the box? I don't know?

* a dynamic folder-creating/ route-creating / cypher chatroom creator?
    - that's just a tree...
    - continent
    - country
    - city
    - ... etc? `[...]/north-america/canada/quebec/montreal` and so on and so forth
    - chatroom as a graph, then?
        - I need to learn about fucking graphs

## discussion about zorg

The zorg "middleware" thing is super unwieldy. And it makes me yearn so much for a templating structure that's much much closer tied to the data, somehow.

Ok. The point is to have a way to manage data in the simplest form possible. Format it in a way that's good enough for editing, and good enough for parsing it and sticking it inside templates.

In my setup, I miss the ability to do some processing close to the template. The data needs to be massaged a bit before going into the template.

For example, the blog index needs to have the list of all posts, grouped by month. This happens in a middleware, but probably could, and should happens at the template level. Using JS templating would solve that issue because the massaging would occur at or before the rendering of the HTML.

There's a lot in there. It means... I need something that follows the structure of the data, but at the same time _transforms_ it to match what needs to be displayed in the browser. Something like a render-tree, vdom React-style thing, that takes some data input and renders the HTML.

Looks like I'm trying to come up with the concept of ... `Model-View-Controller`

## MANIFEST

I want to be able to freely express myself through making websites. Do them well, so that they're lean and mean, minimal but visceral.
And I get that sucker ANYWHERE that runs a browser: which means I can be anywhere. Anywhere I want.
A website like that, is like a virus, bro. I now can linger on the internet and be displayed on any fucking screen.

That's the power of the web. The New Web Era.

## OBJECTIVES

* have a "starter" website structure that is:
    - easy to understand
    - modular, extendable
    - simple to install, simple to update
    - again... it should be full-featured, but **not complicated**

## A website

1. _performance_ on homepage -> first load, show something good
2. _tracking_ -> should we **track the heck out of our users?** to figure out what they're interested in? **NO, NEVER!!!**
3. _accessibility_ -> is the website easy to navigate for people with disabilities?
4. _maintainability_ -> not implementing things too hastily, using unproven software, or obscure tech/libraries, etc.
5. _content_ -> content is king, and the website's development should be content-driven
  - this means that the content should be easily exported/imported
  - pages are built around the content: the copy should be tailored for the web, but we shouldn't have to sacrifice good content because of technical limitations, or design constaints
  - easy database management
  - import/export images with **ease**
  - explain how images on the web work (real quick documentation or something)
6. _documentation_ -> explain to the people who enter the content how to do it well
  - short & sweet, don't assume they know technical jargon -> explain simply
7. _mobile-first_ -> the design and its default implementation is targetting mobile devices; tablet and desktop versions are the declinations