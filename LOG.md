## TODO

* Fix: accessibility audit of themes / fix contrasts / create a11y specific themes?
* Fix: allow "autoloaded" components to be hooked to a DOM element?
    - maybe drop `exponent` altogether, or figure out a better `onInit` / `onDestroy` lifecycle system?
    - lifecycle is a good feature to have, I think...
    - something that sends a signal when every component is loaded? (hook onto that stuff to trigger things when all the elements of the page are ready)
* something to initalize the db with tables and shit

## put your thinking cap on

* how to handle media?
    - can't have those on git...
    - can't manually handle all of that?
    - a job for a "media library" of some sort...

* plopJS -> https://github.com/plopjs/plop
    - or plop-inspired thing to quickly create new posts, pages, extract stuff, etc.
    - what use, though?

* spreadsheets, bro!

* look into implementing [microformats](https://microformats.io/)
* look into implementing [webmentions](https://www.w3.org/TR/webmention/)

* (!) how to have a nice visual overview of the codebase
    - to see what could be refactored
    - to understand it faster (for devs unfamiliar with it)
    - to debug

* issue with handlebars -> can't put comments in the source that won't end up in the "compiled" HTML

* browsersync, or something similar to reload on changes; something easy, fast, lightweight, not full of BULLSHIT
* PWA:
    - [https://web.dev/codelab-make-installable/](https://web.dev/codelab-make-installable/)
    - [https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen#How_do_you_make_an_app_A2HS-ready](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen#How_do_you_make_an_app_A2HS-ready)

* think of fastest track to having a webserver running my website
    - is it some Docker bullshit again?!
    - barebone, hand-made shit?
    - most of it is NodeJS

## "dynamic" linking?

- shit like: [a link whose URL might change in the future](${url:the-page-id-slug-or-whatever})
    - or: have something that generates a unique id for a permalink? (based on what? `id`?) -> perma-id ?
        - or just a friggin permalink, straight up
    - might be a combination of both things
    - a job for a `token.js` ZORG plugin :)
        - gotta find a new name, seriously
    - or... stick ALL THE LINKS, EVER inside a database, or JSON object?
        - like, bro, `links.json`? maybe not
- other
    - [go to the French version!](${lang:fr})
    - [go to the Spanish version!](${lang:es})
- how to handle redirects?

## markdown

```hbs
{{#markdown }}

# Blah blah!

Yo!

{{/markdown}}
```

## future...

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

* “next-gen” web buzzwords
    - html imports
    - declarative shadow-dom
    - import dynamic js
    - container queries
    - modules
    - all of it!

* SVG
    - learn about strokes, types of stroke
    - learn about aspect ratio
    - learn about morph?
    - learn about controlling a few things with JS
    - controlling curves with JS

* try some `<noscript>` bullshit to see if I can have a version of the website that's usable even without javascript

* add something to handle client-side URL hash 'routing'
    - `[...]/some-page-url/#(comments)` -> shows the comments box
        - link to the "id" of a box? (box component shows when in URL hash)

* add svg symbols support
    - **postponing until redesign**
    - for header icons and others (replace arrows, etc.)
    - can't fucking put icons just because it's cool to have icons: they need to mean something

## old ideas, needs revisiting

* add some sort of GUI page... to rebuild pages?
    - **this is a bit far out...**
    - how to make it... secure?
    - or only build that page when developing?
    - but it would be nice to have it online too

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

* pass protect?
    - https://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js/8003291#8003291
      - old? https://stackoverflow.com/questions/12276046/nodejs-express-how-to-secure-a-url
    - https://github.com/kelektiv/node.bcrypt.js -> use sqlite? idk...

## very old, need to decide whether to keep or discard

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

* something that suggest to create a redirection when changing the URL of a page/post
    - so that links on other websites that were pointing to that URL aren't landing nowhere
    - maybe that's an obvious thing that's being done by Wordpress out of the box? I don't know?

## random

* zoom-based navigation on the z-axis -> how to make it feel and look cool?
    - would help to solve the z-index issue I have with the `box` component
    - then apply to that style of navigation?
* clearview:
    - Send these to privacy@clearview.ai via email. Clearly state that your message is a CCPA or GDPR request.
    - Follow any instructions you receive. Expect your request to take up to two months to process. Be persistent in following up. And remember that once you receive your data, you have the option to demand that Clearview [delete it or amend it](https://www.dataprotectionreport.com/2018/09/ccpa-extends-right-to-deletion-to-california-residents/) if you’d like them to do so.

## MANIFEST

I want to be able to freely express myself through making websites. Do them well, so that they're lean and mean, minimal but visceral.
And I get that sucker ANYWHERE that runs a browser: which means I can be anywhere. Anywhere I want.
A website like that, is like a virus, bro. I now can linger on the internet and be displayed on any fucking screen.

That's the power of the web. The New Web Era.

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

## structural changes

### idea 1

- `/zwicky/zwicky.js`
- `/zwicky/config.js`
    - `/zwicky/tasks/html.js`
    - `/zwicky/tasks/javascript.js`
    - `/zwicky/tasks/styles.js`
    - `/zwicky/tasks/assets.js`
- `/zwicky/utils/...`

### idea 2

- `/doohickey/main.js`
- `/doohickey/config.js`
- `/doohickey/html/html.js`
    - `/doohickey/html/processors/post-meta.js`
    - `/doohickey/html/processors/posts-by-months.js`
- `/doohickey/javascript/javascript.js`
- `/doohickey/styles/styles.js`
- `/doohickey/assets/assets.js`

or:

- `/doohickey/scripts/**` -> templating, js, css, assets
- `/doohickey/processors/**` -> data processor units
- `/doohickey/utils/**` -> utilities
