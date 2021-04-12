## TODO

* permashortlinks
    - use aliases?
    - https://fredmercy.ca/s/something
* might not need the split between content types in an object
    - simplify the creation of "plugins"
    - for things that require "other" content, have the plugin grab what it needs, on a _per page basis_
* something to initalize the db with tables and shit
    - when resetting the website (it'll happen...)
* http://1linelayouts.glitch.me/

## are we still using exponent?!?!?

if yes:

* Fix: allow "autoloaded" components to be hooked to a DOM element?
    - maybe drop `exponent` altogether, or figure out a better `onInit` / `onDestroy` lifecycle system?
    - lifecycle is a good feature to have, I think...
    - something that sends a signal when every component is loaded? (hook onto that stuff to trigger things when all the elements of the page are ready)

## put your thinking cap on

* each template is a js file
    - `templates/page/page.js`
    - `templates/page/page.html`
    - `templates/page/page.scss`
* a content file refers to a template
    - the template JS file knows what operations to do on the data, and which data to "fetch"
    - compiles the data and feeds it to its markup (handlebars or other!)
    - outputs the HTML to a file, as always
* co-locate the fetching/data-massaging logic with templates
    - easier to maintain?
    - easier to extend?
    - more portable
    - zorg is now just the "defaults", with "adapters" handling the data
* ... maybe this could work?
    - could it import scss on demand as well?
    - what about "components"? handlebars?
    - ...

* PWA:
    - [https://web.dev/codelab-make-installable/](https://web.dev/codelab-make-installable/)
    - [https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen#How_do_you_make_an_app_A2HS-ready](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen#How_do_you_make_an_app_A2HS-ready)

* think of fastest track to having a webserver running my website
    - is it some Docker bullshit again?!
    - barebone, hand-made shit?
    - most of it is NodeJS right now; damn

* spreadsheets, bro!
    - Geoffrey Litt-style spreadsheet-like live-programming GUI
    - edit content that way, with a modular UI?
    - create new "adapters" in an exploratory way instead of manually iterating through the data with `map` and `reduce`

## future...

* SVG
    - learn about strokes, types of stroke
    - learn about aspect ratio
    - learn about morph?
    - learn about controlling a few things with JS
    - controlling curves with JS

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

* highdea # 897232
    - a social media based on an interface that you can customize as you wish
    - publish any content, easily, with a _simple_, _intuitive_ UI
    - and connect with your friends with a chat service
        - that allows you to chat with other people as long as you are visiting this page
    - they see your page when you chat on your page
    - they see their page when you chat on their page
    - and you can do business pages on their
        - how to counter ads?
        - we **flag** the user that might be _ads_;
        - you decide
    - supposedly private, but not at all; public by default
        - but ability to **mute** stuff coming from specific sources

* pass protect?
    - https://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js/8003291#8003291
      - old? https://stackoverflow.com/questions/12276046/nodejs-express-how-to-secure-a-url
    - https://github.com/kelektiv/node.bcrypt.js -> use sqlite? idk...

## scheduled for deletion

* highdea # 8932434
    - keep the user's data on their disk
    - they need to sync it between devices
        - can use a hyperdrive for this purpose?
        - decentralized account and data retention
        - how to handle encryption?
        - gotta encrypt end-to-end

* highdea # 5571233
    - I've got all this fucking personal data...
    - what the fuck should I do with all this _stuff_?!?!
    - considering the weigh as... actual weigh of data in grams
        - something to consider i mean... haha
    - dragging along all this fucking data, man
    - get rid of it
    - burn it all
    - _datadafe_
    - all the digital crumbs I'm carrying, I don't want it
    - I have to inseminate the web
    - with my fucking data, so _they_ have to handle it for me... forever
    - **hahahahah**
    - my data will live forever, because I'll be forever transported, from one server to another
    - floating
    - just transmitting my data all around the globe
    - servers in **China**, **Kazakhstan**, **Croatia**, anywhere!
    - just fucking data

* something that suggest to create a redirection when changing the URL of a page/post
    - so that links on other websites that were pointing to that URL aren't landing nowhere
    - maybe that's an obvious thing that's being done by Wordpress out of the box? I don't know?

## random

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
