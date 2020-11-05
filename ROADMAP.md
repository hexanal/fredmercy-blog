# What to include in this weird website

## Internationalization

- how to make that work?!?!?!?
- important because: it might change the way the data is shown
- for pages: it's fine, we can use a root folder `es`, `ru`, `jp`
- for posts... we might have to program something in that takes a translation and puts it where it makes sense
  - e.g. `[...]/2019-01-31/planning-dreading.md` -> that's the original, default version; in my case the English version
  - and then `[...]/2019-01-31/計画、恐ろしい.jp.md` for the Japanese version, for instance
  - this gets parsed as having a *sub-extension*, interpreted as an alternative language
  - the processing *middleware* and/or templating engine see that and place the alternative version in a root folder, corresponding to the alt language
  - the processing *middleware* also has to provide (in `meta`?) the URL to the alternative language, so we can feed a language switcher module

## Importing / Exporting data

- zipping the `src/content` folder, that's a start
- extract all the data to one huge JSON, and/or multiple CSVs?
- also: thinking about `assets`
  -> whose responsability is it to manage which images are used in which page?
  -> see below, *data management*

## Data Management

- data management, data middleware? -> look into that Gatsby bullshit graphQL or whatever
  - provide middlewares that act as "fetchers" of data?
  - maybe `importers`? something that taps into an API, a service, and returns a JSON object? that way, it's like caching the data?

## SEO / SEM bullshit

- OpenGraph tags, meta-tags, `robots.txt`, etc. etc.
  - **[research needed]**
  - tracking platform (maybe something open source that's not shitty)
  - A/B testing?
- generate a cool `sitemap.xml`?

## PWA

- `manifest.json`
- making it PWA-ready, run some tests

## Security

- **[research needed]**
- password protect pages?
  - maybe offer a way to flag page as password-protected
  - the data doesn't appear in the static-generated page, but shows a pass prompt
  - the API gets that password and serves the "missing" JSON data
    - or returns an HTML template
    - make sure any JS components get activated after that
- if we use a backend API -> secure the shit out of it

## Forms

- easy form making, data collecting, etc. etc.
- that's a big project, and we might want to split that into smaller concerns, or maybe do some preliminary research to see what's out there, how they're made, which issues do they solve, what logic do they follow, etc.
- all the usual fields, with possible validation?
  - text
  - long text (textarea)
  - email
  - phone
  - dropdown
  - dropdown with filter
  - tag selector -> with autocomplete
  - radio buttons
  - checkboxes
  - toggles (on/off)
- feedback form for users
- newsletter database
  - integrations with MailChimp and others?
- file upload, media management
  - picture cropping, resizing, etc. -> that will have to plug with a backend; imagemagick, or whatever the new hotness is

## Media Assets management

- right now, it's the dev's job to manage the images and add/remove/crop/rename at will
- maybe provide a CMS-ish module that allows for *processing* the images?
- maybe colocating the content-specific images with the markdown files and referencing them straight from the frontmatter?
- or have a *processor* that looks into a subfolder `/assets` for that page...
  - but sub-folders are reserved for building the URL...
  - although `assets` is a reserved word, otherwise it will conflict with the one in `/public`
  - but if a folder doesn't contain an `.md` file, we're good (also, it's one the "root" folder that would conflict, if it's under a post, we're good too)
  - so the processor parses the list of images, and copies them to the `/public/assets/` folder?
  - the processor could even plug in the image filenames into the props, so that they can be accessed via something like `images['whatever'].src` ?
    - and we're free to do whatever with the alt?
    - or maybe an image is a content type too, like a JSON object `{ "src": "/assets/whatever.jpg", "alt": "blah blah", "size": { "width": 600, "height": 400 } }`
      - that way we catch devs who want to use an image without an "alt" param! you fuck
      - also, it could follow a convention like `images.json`?
      - **[more research needed]**

## Persisted State

- sessions and persisted state
  - indexedDB, localStorage?

## Must-have "common" modules/components

- interactive map module, Google Maps with themes, or Leaflet?
- embed shit from youtube, facebook, instagram and other toxic social media AD-PUSHERS
- contact form (-> see above, forms)
- things that help with "filtering/sorting/searching" through lists
  - could help with search results
- search function, see below

## Search Functionality

- search functionality in a "static" website?
  - easy access to all the content
  - search into either `meta`, `content`, etc. or anything else depending on search params
  - the backend search API can tap into the main "global" object, and sift through that
  - a "search" *processor* (the thing that churns through the pages and data) could extract URL based on categories -> instead of straight "search" it could be a categorized registry of pages, with easy filtering, sorting, etc.
  - help users find shit

## Server-side Tooling / Helpers

- modules that we'll need: `search`, `photoshop` (imagemagick)
  - resize images on the go
  - grab a particular page's data, by URL
  - grab anything!
- password-protected (token? Oauth... idk) API calls to:
  - build the website
  - build a page in particular (still needs to build everything else)
- get "graph" of pages and posts?

## Caching

- every time I compile, I export the data for each content type
  - as JSON of course
  - in a `/caches` folder?
  - and depending on whether I modify this or that content type, I fetch the one content types' JSONs instead of rebuilding the whole shebang
    - that would happen every time it detects a change and recompiles
    - gotta figure out a nice and stupid way to manage cache invalidation... I know, “it's the hardest problem in programming..” yadda yadda yadda


