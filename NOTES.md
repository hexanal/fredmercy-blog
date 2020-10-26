# NOTES

## October 25, 2020

- doing a quick mix-and-match with the old version(s) of the blog, I managed to put the comments back online, so to speak.
- I'll deactivate the extra weird colorschemes and fix the dropdown
- haven't given any thought to the main website's struture; whether to reboot it completely, or just "port" it as is to start with
  - probably better to port it in order to a) get something up and running that matches what I currently have, b) have a proof of concept for this "new" way of doing things: if it can do what the previous system was doing, then it's great
- I'll postpone the filtering system I was alluding to for the bookmarks page; keep it for another day
  - was thinking of trying a bunch of implementations for filtering and sorting
    - tacking on as many features as possible to make it legit, but keeping it real small, and "modular" whatever that means to me or anybody else...
    - ...and then I'll see which is the simplest, most straightforward one; maybe a mix of all
- the post navigation module sort of sucks; I need to move things around
  - done, I think it's better...
- I just realized there is nothing built yet to provide *global website* information such as the name of the blog, the default meta tags, menu, etc. etc.
  - this will be handled by a *site middleware*, I bet! Using a simple JSON, as always.
- thinking of co-location the content with the "database" stuff, such as the post comments
  - any comment added to an entry would land in its folder
  - obviously, I would need to beef up security a bit, although I suppose those files would be public anyway? hmm, I would need to make those files ignored by git... meh
    - I'll think about it some more, but for right now, I'll keep it separate

When I try to think of way to do things differently, I have these wacky images popping in my head of insane interfaces I could build! Things that probably would be horrible in terms of UX, but just... visually cool. I wish I'll have time to explore those ideas some day.

- highdea of the evening: put shorcodes (on steroids) in the content for the "blocks"
  - allow parsing + displaying of that to be almost realtime
  - allow editing live of markdown + parsing & displaying on right side
  - allow saving (and saving copies)
    - boom? (idk, think about it)
- another: have the barba transition states be a property on the div, so that I can target that in CSS and slap styles on anything I want
- another idea: try to embrace something hybrid between BEM and Tailwind.
  - anything that can be a component, with reason (-> it's used many times through the website), shall become one.
  - anything a bit too specific becomes a BEM (which could compose Tailwind-like base classes... I guess)

## October 24, 2020

On this beautiful Saturday morning, I've been taking a short window of opportunity to do some extra work on the page navigation. And navigating the site made some other issues apparent:

- comments are not yet re-activated; this will need some thinking, so if I decide to deploy this new version, it will be without support for commenting on the posts. Boo-hoo, who cares.
- I defaulted to using the current way of displaying posts, by month, with a dropdown shortcut to reach past archives. I like the idea of having only one blog index, so I'll keep it that way for now. But I also want to allow users to filter out all the dumb posts and focus on the "better ones", if there are some. Obviously, since these days I only post about dumb shit, this filtering functionality isn't the priority.
  - although, I still want to work on that to allow filtering the Bookmarks page (which by the way I have to fill up with new shit!)
- the "COMING SOON" homepage is good enough, I guess, since I don't need a "main" website for now. But eventually I'll have to think about what I want to put in there. And this will require some intense refactoring of the CSS and JS, most probably... to separate the two spaces? Or I can keep the current setup? It's been a year and I still sort of love it!
- I have to think about the "themes" and whether I want to keep that feature. Maybe stick with only three themes that I really tweak to perfection?
  - "june" theme
  - "dark" theme
  - "b&w" theme? (most accessible theme)

## October 23, 2020

Finally achieved feature-parity with my Gulp-powered setup, but now with a completely custom thing. I still use a few packages that are essential for the frontend to be operational, but for all the "generating a static HTML website" side of things, we're all good.

I think I kind of re-invented what [Metalsmith](https://metalsmith.io/) does, with this "middleware" thing, which I've been eyeing for a while, but with all this self-doubt about using third-party solutions, I... yeah, I dug my heels in. And if Metalsmith never took off in a major way, I don't see my solution become anything else than a neat personal achievement. But for real, it's been great to work on that and get it to work.

Now, let's review what's been done, and what's left to do:

1. ~~get the next/previous page module work (minimum: arrows next to the links, make sure the links are easy to use, easy to spot)~~
2. ~~whip up a nice, minimal, fun, "work in progress" homepage where the current website lives (so, an index page!)~~
3. make sure the deployment step is easy to do
4. deploy

Steps 3 and 4: deploy. Right now, it's all about running `start.js`, but eventually I suppose I'll need something better, something that targets a specific page, or content type, or whatever.

Actually, the way it's setup, I can't really modify something in posts without influencing what happens to pages, since the data that gets passed to any template of a given content type **also contains the data of all the other content types**. The philosophy of a server-less, backend-less, framework-less templating system means that all the content ever needed by a template should be available to it.

Meaning: no function calls, or database calls, unless it's via API call, via JS. Which is what I wanted from the beginning. Maybe I need to think about a neat way to query the API to get individual items? Could be fun.

---

Reading the Metalsmith homepage... man, I really did the same exact thing. Even the same kind of philosophy! ugh! I must have been subconsciously ripping off their idea. But to be honest I haven't looked at their source code, and maybe I should! For research purposes. Like: how did I do?

First of all, my project's objective is to be simple. It's not at Metalsmith level yet, but for something I whipped up for a specific use-case in a couple of weeks, I'm happy about it. Clocks in at 489 lines of code so far (that's all the code used to generate the HTML files) which is reasonable.

The objective was also to produce code almost from scratch to really be aware of everything it does. There's no library doing weird shit in the background! At least not yet! Maybe once I have to make it more generic and sturdy, with error handling, logging, import/export, etc. etc. etc.

But that ain't really the aim right now. Everybody and their dog has written a static website generator by now. The goal was to dump the `gulp` dependency and roll my own shit. So here we are.

---

Aaaaaaaaand I just found out my `getParentPages` function doesn't work when there are collisions. Ugh!

## October 22, 2020

- I have to look deeper into *security*
- it's cool to do stuff as a proof of concept, but it's better to think about security first
  - "safety first", maybe "privacy first"?
  - I don't want people to be able to hack the system with a tiny script, and to be honest I don't feel confident in my ability to counter this threat... a static website should be super safe, but the moment I have some backend API setup, I might have to beef it up security-wise
- the way I'm creating the huge data object is a bit flawed in that I also use that to tack on the `html` template, which we don't need to pass to the template itself, only to the "builder"

- solving the extra data problem:
  - I would to be able to have objects or arrays containing info about the content types, without having to tap *into them*: a separate key, a `global.XXX`
  - I could replace the `applyGlobalData` with something that applies global middlewares
  - the `items` data contains all the content types, so I could use it to figure out things about them, and place them in something else under `global`

- right now I:
  - combine the content types together in a object, with its keys corresponding to the `items` of content types: `{ 'posts': [...], 'pages', [...] }`
  - go through each content type and add that object to each content type, under `global`
  - then I apply the templating

- how to separate the templating logic from the actual data?
  - ok. Ideally, I would love to have something like that:
    - I add a contenty type. It's blog posts, file: `posts.js`
    - this targets file in `content/entries/**/*.md`
    - then I pass all those file paths into *processors* (middlewares)
    - I end up with an array of object, with each object being a properly formatted *template-data* object, containing all the necessary info for an item of content type `posts`
    - if I have another content type, say `pages`, I would like to have that available as *template-data* in a `posts` type template as well
    - why?
    - because I want to be able to interrogate the site's data for a certain page, and if it exists, print its URL, title, etc.
  - right now, I pass all that into a `global` object
    - the `blog` page can them tap into `global.posts` to show the list of posts
    - I would love to be able to add arbritrary things in there as well
    - could it be something like...
      - I go through each item
      - I apply all the global *processors* (being passed the array of all the content types)
      - they process the data and dump that data into a `global` (or `site`, or `all`, or `master`, or `root`?) key
      - ~~I detect whether this item needs to access some other data~~
      - e.g. an "archive" processor would receive all that, parse the items, fetch all the post items, extract the dates for each, format a new object, and insert that object into the item

Starting to doubt my move away from gulp, haha! But fuck it, I'm digging my heels!

## October 21, 2020

As a web developer in the year 2020, I feel like my days are counted. Not only because some company backed by mountains of VC money will have invented an easy way for websites to be built, and it'll become the *de facto* way of building the web (ugh! I hope not), but also because the industry as a whole is really becoming homogeneous and frankly: boring. So I have a feeling I'll just quit before I'm obsolete.

Even the designers don't venture to far out from the norm. Have we solved all the UX issues and somehow found **the ONE** solution to our UI/UX needs? I don't believe so.

The tech stack sort of sucks. CSS sucks big time, and engineers are seemingly throwing everything at it to *fix* it. The only way to work on something that feels like it's "software", is to work for product companies: your Spotify, your Shopify, your Netlify, your Notion, etc.

Maybe I'm just jaded, or misguided, or my job sucks (does it?), or I haven't learned enough. With my time eroded so much, I don't have the luxury of spending tons of hours working on tech-related bullshit: I also have to take care of my family, socialize with friends, learn real life skills in order to fix my real life.

I'll post something on the blog about this. Oh my, oh my: I'm so full of angry/dark/sad thoughts, and I probably shouldn't write them out... which is why I *HAVE* to do it.

## October 19, 2020

- cleaned up the codebase a bit
- haven't started working on the navigation... still thinking about stuff
- maybe the "deployment" step should be taken care of before? not necessarily, but sooner rather than later, that's for sure
- I'm thinking about:
  - co-locating HTML/JS/CSS for components, in a way that makes sense (like if I'm using some vdom thing that's written in js, then the js imports the sass and we're done)
  - allowing for something else other that `exponent` + `barba` to handle JS "modules" & page transitions
    - maybe use web components in some way, but... ughhhhh!
    - how to not use a vdom implementation?
      - or maybe resume research into: https://github.com/Polymer/lit-html ?
    - probably not the use-case for a statically generated website anyway, right?
  - allowing for middlewares that make sense, for things like:
    - main menu items
    - other content that might need to be decoupled from the templates or layouts
  - the nomenclature for the different parts (i.e. folders in the codebase): `components`, `content`, `templates`, etc.
  - creating some sort of Bootstrap-y showcase with lots of different components
    - grid, buttons, notifications, wysiwyg, tables, expand/collapse, etc.
    - just like I did for `exponent-boilerplate`

Maybe I think this project is gonna be good for any kind of website but... that's not possible. Everything has a use case.

Also... should I implement a "Todo List" with this? Obviously, it'll be shitty.

Granular updates to exactly do what we need. Like... the list: it's a list of items. What are the default items? Is it empty by default? It depends on the (logged in) user's data -> so it's not the use case for this project, because we don't assume that you're logged in. Although I could definitely implement something like that, with API calls and all that jazz.

But what about something that I have to do on many *regular* websites: reordering a list of items, or paginate some items. It requires:

- getting the raw data (json) alongside the rendered data (html)
- using something like... VDOM/JSX.... **OR** using web components
- then you re-render when user is filtering

I'd need a proof of concept.

Ok. Time for some dreamimg...

What to eventually include in the "blog" -> to make it more generic, more powerful. This is like a dream-list, or a really hopeful *roadmap* for the future of this project:

- definitely: i18n
  - how to make that work?!?!?!?
  - important because: it might change the way the data is shown
  - for pages: it's fine, we can use a root folder `es`, `ru`, `jp`
  - for posts... we might have to program something in that takes a translation and puts it where it makes sense
    - e.g. `[...]/2019-01-31/planning-dreading.md` -> that's the original, default version; in my case the English version
    - and then `[...]/2019-01-31/計画、恐ろしい.jp.md` for the Japanese version, for instance
    - this gets parsed as having a *sub-extension*, interpreted as an alternative language
    - the processing *middleware* and/or templating engine see that and place the alternative version in a root folder, corresponding to the alt language
    - the processing *middleware* also has to provide (in `meta`?) the URL to the alternative language, so we can feed a language switcher module
- import/export of all the data
  - zipping the `src/content` folder, that's a start
  - extract all the data to one huge JSON, and/or multiple CSVs?
  - also: thinking about `assets`
    -> whose responsability is it to manage which images are used in which page?
    -> see below, *data management*
- data management, data middleware? -> look into that Gatsby bullshit graphQL or whatever
  - provide middlewares that act as "fetchers" of data?
  - maybe `importers`? something that taps into an API, a service, and returns a JSON object? that way, it's like caching the data?
- SEO/SEM shit
  - OpenGraph tags, meta-tags, `robots.txt`, etc. etc.
  - **[research needed]**
  - tracking platform (maybe something open source that's not shitty)
  - A/B testing?
- security
  - **[research needed]**
  - password protect pages?
    - maybe offer a way to flag page as password-protected
    - the data doesn't appear in the static-generated page, but shows a pass prompt
    - the API gets that password and serves the "missing" JSON data
      - or returns an HTML template
      - make sure any JS components get activated after that
  - if we use a backend API -> secure the shit out of it
  -
- forms -> easy form making, data collecting, etc. etc.
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
- media assets management
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
- sessions and persisted state
  - indexedDB, localStorage?
- the usual suspects:
  - interactive map module, Google Maps with themes, or Leaflet?
  - embed shit from youtube, facebook, instagram and other toxic social media AD-PUSHERS
  - contact form (-> see above, forms)
  - things that help with "filtering/sorting/searching" through lists
    - could help with search results
  - search function, see below
- search functionality in a "static" website?
  - easy access to all the content
  - search into either `meta`, `content`, etc. or anything else depending on search params
  - the backend search API can tap into the main "global" object, and sift through that
  - a "search" *processor* (the thing that churns through the pages and data) could extract URL based on categories -> instead of straight "search" it could be a categorized registry of pages, with easy filtering, sorting, etc.
  - help users find shit
- server-side stuff?
  - modules that we'll need: `search`, `photoshop` (imagemagick)

## October 18, 2020

- I think I will take some time off real work to make progress on this, otherwise I'll be so far behind I might as well abandon this endeavor altogether.
- The next goals are:

1. get the next/previous page module work (minimum: arrows next to the links, make sure the links are easy to use, easy to spot)
2. whip up a nice, minimal, fun, "work in progress" homepage where the current website lives (so, an index page!)
3. make sure the deployment step is easy to do
4. deploy

Many others will remain after that. But I have to focus on other things as well, and the fact I can have pages like that, is pretty fucking cool.
I should also try and figure out something about code splitting: embark some script files only on certain pages so as not to bloat the whole thing. However, I have zero knowledge of this space so it'll be interesting to see how I go about achieving that.

## October 17, 2020

`~9:00am:`

This morning the point is to take the output arrays of both content types `entries` and `pages` and combine them. The goal is to have access to a `global` object from any template which will contain information about the whole website. This ideally means that any page can access the data for the whole website: the first need that this change will address is the need for the blog index page to have access to the list of all the entries.

- Let's begin with a `sites.js` file
- This will grab all the content types' arrays and collate them into one big object
- Then, it will loop through each item of each content type, and insert this object inside a `site` (or `global`? or `app`? or `__`? I don't know yet) property (the `props` if we use React's parlance, although I'm not using React here)
- only after all that will the build step go through the content types and build the HTML for each
- which means the `withTemplates` processing function inside of the content types' tasks will need to be called after the `site.js` processing is finished
- ok let's try something out

`4:46pm:`

- I'm very happy about that, now the index works as expected (minus the "by-month" filtering, but I will write a filtering JS component to handle that specifically)
- Wanted to also add a `delete` task to the scripts, something that clears up the files ready to be built again; that could be step #1 of a "deployEverything" task

`7:36pm:`

- Gonna move the pages around into the "blog" folder, to make space for the main website, which will be something else than the current one, I think. It's gotta be more about... I don't know... organized chaos. This is me.
- Blog will be fine, hehe! I need to design the previous & next links, but I thought I'd incorporate this into a "navigation" module that styles all that
- Parent page link works, that's encouraging

So. God willing, if some day next week I have some time, I'll be working on adding:

1. the prev/next nav, styled
2. the filtering of the posts could also be done pretty easily, I'm sure, but that would require some time playing with some Javascript...
3. gotta figure out if the "comments" part of the post still works

`9:42pm:`

- added "pipe" function for the processing steps for each content type
- I think I should work to make it as ready as possible to a deployable version, and deploy that bitch right away

Eventually, it's gonna be all about creating that separate app that allows for some CRUD actions on the files, and for building the HTML files as well. That way, it's go time for some editing on my phone and shit. Cool.

Also build some export functions straight in. I gotta save that dumb shit.

## October 16, 2020

Haven't had much time to implement everything, but what I did yesterday evening is an encouraging step forward. I see it as more of an incremental change than a complete overhaul, which is perfect because I finally realized that a full-blown reboot of the whole thing is completely overkill.

What I have today is:

1. a `start.js` file that reads the `content/entries` folder for markdown files
2. it then extracts the post content from each of the files
3. I have created a handful of functions that take the `entries` array (the list of files) and process the info to extract content and other interesting information
4. this object doesn't generate anything, but in my mind, it could be used to generate an "export" of the content, with all the HTML content, the metadata, etc., already formatted
5. there is a final step that loops through that final array and creates the directories and `index.html` files: the build step

What I don't have:

1. I have nothing that replicates the `watch` task from gulp, but I'm pretty sure it will be an easy addition (e.g. listen to changes on the `src/content/**/*` files, on changes I grab the path, and pass it to my function that rebuilds the website. There's something to watch out for: placing the changed file in context of the whole website, which is why I intend to try and keep the whole content structure of the website in memory, somewhere accessible easily in the code so that I can fetch shit from other pages in a pinch, and figure out where a given page sits in the context of the whole website)
2. the build step for the straight up "pages" isn't done, but I wanted to clean up the build step for blog post first and see what I could possibly reuse for pages, make it a little more generic

So, let's try to clean up the `start.js` file a bit.

Ok. Let's try to work on **pages** now!

- I'm copy/pasting the `posts.js` file for now, I'll see what the similarities are later, and will try to make it less verbose
- Going well... Trying to see if I can stuff more "metadata" into the page object, so that a page can figure out its parent page, child page, etc. etc.

Carrying on: I've got the webpack build still working, but now I've replaced all the variables from the `exponent.config.js` with straight strings, because I never really needed that configuration to be generic, or easily modified: if I want to move things around, I'll know to change the strings directly in the `webpack.config.js` instead. Easy.

## October 15, 2020

- Oh. My. God. I'm back into the weeds. The thing is: what I need is something simple.
- I will attempt to explain the absolute minimum I need again:

1. swap out the gulp build process with something that can be done server-side via an API call
2. focusing solely on the blog entries, which is the first type of content that I will need to update often
3. I need something that just grabs all of the files, reads them all and generate some HTML for all those motherfuckers, right?
4. and I stick that shit into the right template, which is unique, eh? (unless specified otherwise in the front-matter)
5. I keep an array of all the posts, with their information, sorted by date, as a tree
6. THEN, I process the data somewhat
7. I can format the date, fetch some bullshit, etc. etc. and put the fucking "ADJACENT" posts
8. loop through the array, feed the "handlebars" script with all that bullshit

Let's try to implement that; but let's keep it simple.

## October 10, 2020

Trying with Recoil, since I went with React, might as well get the latest hotness for the state management.
I think I can get my head around it. Let's try it tonight, for a little bit.
