## TODO

* holy shit... I'm going build-less JS, using modules... I'm crazy
* adapters "per type"?
* might not need the split between content types in an object
    - simplify the creation of "plugins"
    - for things that require "other" content, have the plugin grab what it needs, on a _per page basis_
* something to initalize the db with tables and shit
    - when resetting the website (it'll happen...)
* http://1linelayouts.glitch.me/

* PWA:
    - [https://web.dev/codelab-make-installable/](https://web.dev/codelab-make-installable/)
    - [https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen#How_do_you_make_an_app_A2HS-ready](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen#How_do_you_make_an_app_A2HS-ready)

* spreadsheets, bro!
    - Geoffrey Litt-style spreadsheet-like live-programming GUI
    - edit content that way, with a modular UI?
    - create new "adapters" in an exploratory way instead of manually iterating through the data with `map` and `reduce`

## flat-structure for content types

* it's all about _adapters_
* no split by "type"
* add utility functions to extract a given "type"
* easier "meta" functions?
* a more streamlined way of adding/using adapters
  - maybe offer some basic primitives that can be used to massage the data?

## old ideas, needs revisiting

* pass protect?
    - https://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js/8003291#8003291
      - old? https://stackoverflow.com/questions/12276046/nodejs-express-how-to-secure-a-url
    - https://github.com/kelektiv/node.bcrypt.js -> use sqlite? idk...

* something that suggest to create a redirection when changing the URL of a page/post
    - so that links on other websites that were pointing to that URL aren't landing nowhere
    - maybe that's an obvious thing that's being done by Wordpress out of the box? I don't know?

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
