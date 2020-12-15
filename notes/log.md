## December 15, 2020

`8:30am:`

- today: write!
- also maybe:
  - fix a few things on the website (what things?!)
  - include *notes* in the main menu
  - maybe also make the main menu visible by default for larger screens
    - at least `blog`, `notes`, `about`, `links`

- NEXTUP has: doing the links filtering system, and a better homepage
  - filtering the bookmarks implies refactoring the way I'm adding them to the website which isn't something I'm willing to do just yet :P
  - improving the homepage would be nice
    - less quirkiness, or more?!
    - more links, more obvious, less talk

- I want to timestamp the build console logs

`10:22am:`

- really going off the deep end this morning... I gotta slow down some
  - homepage revisit, another middleware to handle what I call *UI data*, some CSS clean-up, etc. A LOT OF STUFF WAS DONE!
- there's an issue with showing webpack errors
- honestly, I hate webpack... for this website, I'll go back to using a very easy-going setup... very soon haha
  - unless I go crazy and decide to go VueJS or some bullshit, but nah... I'll wait it out some more
- adding it to the NEXTUP file

## December 14, 2020

`8:57am:`

Lately I've been thinking about search. In a static-HTML, flat-file website, or however kids call it these days, everything is right there in the files.

With NodeJS, I'm pretty sure I can communicate with the server to search through files any way I want. For my use case, maybe that would be enough to whip up a search engine.

I can feel the real programmers out there shuddering at the idea; in terms of security and performance, it's probably super bad practice to implement a search on the file system like that.
But I'm thinking: I gotta try something *homemade*

- api get search terms
- node server passes that to a function
- searches through `/content` with the search terms
- from the file path, infer the `url`, and `type` (and everything else)
- shoot the necessary info back to the frontend via JSON
- and we're live?

`9:09am:`

- also: comments are files; could search through comments as well? meh.
- btw, maybe using a database wouldn't be too bad to handle comments and other user-generated content?
- created a `NEXTUP.md` file to keep track of all the things I have to improve on this website

`10:18am:`

- this website is becoming my life, now, haha! meh, it's not so bad; I like it
  - keeps me busy working on something I can see some (personal) value in, keeps me writing some Javascript, keeps me thinking about the web, accessiblity, UX and all that jazz
  - makes me write more, and express myself to the world... friends can leave comments (I gotta rethink the whole commenting business though)
- I was just thinking of trying to better organize my projects on Github, and on my machine
  - have a little ecosystem of tools I can leverage to work more efficiently
  - try to figure out what "costs" me the most time, and maybe devise a few strategies to shave off some of that time burden
  - it's cool that I took some time to work on `reefer`, but I need to use it extensively to test it out
  - I want to have a showcase of the things I can build with my tools, you know?

`11:26am:`

- in the `NEXTUP.md` file, there's nothing about porting the codebase over to something like React or VueJS, because that shit really isn't important right now:
  - I'm focusing on the content entry issues right now:
    - infrastructure issues: have the website be easily maintainable on the server:
      - easy import/exports of data, easy building of the website
      - documenting my progress and making sure it's sturdy enough
      - and generally just road-testing the setup for a while
  - the frontend framework `exponent` is quite simple, barebone
  - I'm thinking about doing something... with HandlebarsJS maybe? like:
    - splitting the codebase into really small HTML chunks
    - have some sort of API that allows for building these chunks on the server:
      - pass some data, and have the chunk of HTML be rendered and passed along in the response
      - e.g. `/api/render` with `{ component: 'ui/post-nav', data: { whatever: 'dude' } }`
      - fetches `./src/components/ui/post-nav.html` and passes the `data` object
      - compiles the template
      - sends it as the response
      - frontend just has to hot-swap the component
- obviously low priority :)

`8:35pm:`

- I want to fix that *watch* development step so that the DX is... hmmm, wonderful, you know?!
- when developing, what you want to do is just launch `npm start` and start doing shit
  - frontend source files are watched by webpack
  - content files are watched by chokidar, old school
  - and the server is Express
- my first test didn't work out
- so how the fuck do I do this shit?
- ok... I managed. But it's kind of slow :)
...
BUT I MANAGED!



## December 13, 2020

`5:12pm:`

- a moment of quiet; and of course I use it to think about what to do next
- in terms of the effort, I can distinguish several types of "work" to be done:
  1. what I'd call "infrastructure" work: the invisible codebase that builds the website and gives me good developer experience
  2. the UI/UX of the frontend, design, microinteractions, bugfixes, etc.
  3. writing and add good content to the website
- lately there's been a lot of 1 and 2, not so much 3
  - having a nicer way to add content (other than doing a deploy by logging onto the server via ssh) would help me a lot with adding content
  - this requires having a pretty solid system in place
  - right now, it's not super solid
- that's why I'm thinking of building a UI that allows for easy import of
    markdown, and which saves as a properly formatted *content type item*
  - then this UI could also compile the website again, on "publish"
  - I could probably have the content be editable online that way
  - I would need something that does the reverse: exporting the data, backing it up regularly, so I can transfer all that online-editing back to my local install
  - I treate Markdown content files as the ultimate basic unit of what this website is: the UI is just something to make it easier to read and navigate, but someone would just wanted to read the content could show up on github and read the source code haha

I've got this `json` middleware, which grabs a *companion JSON file*

This could, in theory, contain any kind of information I want. I just need to figure out some sort of modular way to structure the data, and set up a module system in this hypothetical backend UI.

Then the frontend modules take care of displaying the data. That's the idea.

But this is not particularly easy to implement... there will be a lot of tries and a ton of errors.

`5:35pm:`

- I'm not handling 404 pages right now and it's kind of a bummer!
- this is some server-side "infrastructure" shit again...

- I'm thinking about setting up an RSS feed; man, that's a throwback

## December 9, 2020

`7:09pm:`

- did some code trimming in the middlewares and now it looks pretty consistent
- haven't had time to do what I wanted with the webpack config:
  - basically, figuring out a way to combine:
    1. building of website
    2. minification of Javascript and styles assets
    3. copying/processing of other assets (images, fonts, etc.)
- to be honest... if gulp is the best candidate, why not, but at that point I think I can figure it out on my own

- right now, I'm thinking about why I'm co-locating the styles with the markup
  - with React, it makes sense because you can import the styles via the JS component file
  - here, I still have to manage all of that through `style.css`
  - the JS could be co-located also, and import the styles, but not all of the components have a companion Javascript file, so that's not really a good reason
  - brings me back all the way around to using some virtual dom implentation of some sort... hmmm
- could be a good test of the structure if I decided to swap out HandlebarsJS for something else
  - maybe if I do an off-shoot project, less components, less content
  - using something like VueJS, so I could co-locate all that bullshit, and maybe have all that asset pipeline figured out
    - the webpack wiring would live alongside the building of the website
    - or the other way around, which I was thinking about: have the JS components orchestrate the build
      - the webpack watch task could trigger a rebuild when markdown files change?
      - something to toy with, for sure

## December 7, 2020

`8:46am:`

- timestamped the previous entry `2002`, man that was way back
- I will have to revert to a better way to show the notes, perhaps leverage a middleware to make it easier to include in a page
  - something like a markdown plugin would be awesome...!
- again I'm in the middle of a big refactoring session, not knowing whether it was a good idea, and I'm torn between two branches
  - can't really write and deploy with ease (although totally doable)
  - little fixes accumulate on the new branch and I'm losing focus sometimes... ugh!
- I'm thinking about only using "global" middlewares (just middlewares) and have each middleware figure out with "type" it needs to affect
  - and content types can be inferred from what we found, so...
    - instead of having to specify a content type object, it could just be inferred from the data
    - no more object; the default template will be `templates/${typeID}` by convention, and the middlewares are all "global" ones
- for now I'll just try to extract the build logic to another file and have it be a little cleaner
  - oof! made it!
  - watch step is still working, build step is working... site is building in well under a second
- I want to wire the webpack build inside of the chokidar watch...:
  - if I stick the webpack watch at the same level, I'm pretty sure NodeJS will handle that nicely? haha, you wish!
  - we'll see! this is what's next

`9:25pm:`

- really shouldn't be working on this shit so late in the day, but heck...
  - webpack watch is now inside `watch.js` and behind `npm start`
- I realize I have to trim the fat off that javascript
- maybe... just maybe, I could say goodbye to webpack and instead just wire everything myself
  - `esbuild` for js
  - good old `sass` for css
  - copy task to move assets?
  - basically... going back to gulp?!?! shiiiiiiiiiit


## December 4, 2020

`7:30pm:`

- far gone are the questions of building a backend from this blog... yeeeeeeah...
- I fixed the comments for the new version
- ... wondering what the next steps are...?
- ah, the "watch" step
  - extract to a real "build" function
  - call that on file change
  - also stick that in the server.js file
  - also think about the webpack build!
- get some rest, you look tired


## December 3, 2020

`~9am:`

- finally named the folder `zorg`, just so it appears last in the folder list
  - I was thinking of maybe moving that into `src/app/`, as it is—after all—what builds the whole damn thing

I've been moving fast and shuffled things around quite dramatically. I need a moment to sit and reflect on that and to figure out where all of this is going.
The direction it's taking is good, but I don't want to complicate things. However, the ease with which I was able to refactor the build step is encouraging.

With the support for what I call *JSON companion files*, I think we've finally reached feature parity.

As for new features:

- I would love to implement something that grabs all the JSONs from a directory and tacks them onto the object *pre-build*
  - don't need to keep it inside each and every item that's exported by `export-to-json`, so adding it pre-build is probably a good idea?
  - not sure whether it's possible with the current implementation...
  - hmm, I think if I add it after `export-to-json`, it will work!
  - where to put the json files? maybe a `_data` folder under `content`?
    - I'm afraid this would complicate everything, in terms of file structure
  - my idea for a JSON object is to implement a "dynamic" menu, but it would not be dynamic at all :)
    - a main menu function could be a *middleware*, too
    - now I'm afraid this "everything is a middleware" will complicate everything as well

- weird idea: add a key `_appliedMiddlewares` to each item with a list of all the middlewares that it went through
  - keep a record of what happened to the file
  - those extra keys could keep a record of other things, like a build timestamp for example (though I have no other idea right now...)

- weird idea 2: add more keyboard shortcuts, especially when in the blog:
  - `o` to navigate to an "older" post
  - `n` to navigate to a "newer" post
  - `i` to navigate to the blog index

`9:55am:`

- I need to update the exponent-core repo with a README at the very least!
  - also: update "exponent-boilerplate" with the new way of doing things
- still gotta do that "watch" task thing for development purposes...
  - I'll wire up webpack with that shit as well... all it due time though
- actually it's ridiculous to use webpack for how small this project is
  - I could wire up a `sass` task, a js minify with `esbuild` probably
  - an `assets` task that copies that folder over, fuck it
  - that shit could be wired up inside the server, as well
  - that server could probably do some stupid magic with "hot module replacement" or something

`3:29pm:`

- just realized that my "a page that lists all the subpages" thing exists already
  - simply create a page with a template that lists the `meta.children` pages

- gotta write more stuff, haha!
  - on **reasoning from first principles** (presumptuous)
  - on **note taking as an external memory** (meh?)
  - on **burnout culture** (getting ready for one of my own)

- I keep ending up on those awesome websites by frontend devs... wish that somehow I could navigate in their circles, but I would no longer be a renegade developer.
- I need to do some research, skim all those posts about people trying their hand at the perfect "homepage"... and then update mine with their insights, I guess
- fucking hate my work right now because it feels... antiquated. Just fucking dated.. huge Drupal codebase maintained by canon-fodder junior developers, and the tiniest budgets ever, and then clients are disappointed when it costs them thousands of dollars
  - nobody explained to them how never maintaining nor documenting nor QA-testing the codebase compounds over time, and makes even the tiniest fixes feel like hard work
- woooh! I'm gonna be ok. I think.

`4:38pm:`

- taking a nap

`8:78pm:`

I will survive.

- not at all done because the comments are broken
  - gotta fix the paths


## December 2, 2020

`~9am:`

- following from the list of yesterday:
- I've reached the "split by type" bulletpoint
- thinking about the best way to extract the data for each post type:

Something like I wrote in my `research.md` file (woah, I'm doing *research*!)

```js
const contentTypes = [
  {
    id: 'post',
    middlewares: ['comments', 'order', 'adjacent']
  },
  {
    id: 'page',
    middlewares: ['relationship']
  }
]
```

That way it's easy to add a post type that's a copy of another one but with a different sequence of middlewares.

`11:43am:`

- refactoring is going well enough, so far
- I like this idea of middleware, because I might be able to use it to wire up everything, even the "export" step, and the "build" step
  - I need to distinguish the `contentTypes` middlewares from the global ones :)

`7:58pm:`

- the refactoring session is going well, I think most of it was "translated"
- I still have to add a middleware for handling the JSON *companion files*

- wondering what could be a replacement name for *tasks*?
  - I'm not a fan of *tasks* because it... reminds me of `gulp` which I've broken up with! :broken-heart:
  - `core`
  - `system`
  - `builder`
  - `scaffold`
  - `processor`
  - `heart`
  - `brain` ?
  - `x`
  - `zap`
  - `zing`
  - `zorglub`, a nod to `gulp` a little bit?


## December 1, 2020

- long time no entry! I've been kept busy on some dumb stuff
- lots of existential thinking, social distancing, old-fashioned parenting

I've been taking a lot of notes and posting them along with my websites's source code, which is... kind of weird. I'm used to keeping ephemeral journals in my personal notes, but these files are more like musings on a variety of topics. It's mostly about how I'm planning to update and improve the codebase, but in the middle of all that, I allow myself moments of openness to other aspects of Life.

Writing is awesome, I love it. Communication is great. I wish I could have discussions with more friends; these days it's hard. I've been on the Internet my whole life and it's a great place to have meaningful conversations; yet somehow I lost touch with that. You can probably blame social media for that! I mean... **I** will blame social media.

This is a space where I can vomit many words about anything and never have to feel bad about it. Sentences can be long-winded and without end; they can contain vulgar slang, haphazard punctuation, big-ass words, and non-sequiturs. However, these days I've been trying to apply "minimalism" to my way of writing, especially in the context of the workplace. When it's time to communicate some information to my colleagues, I really want to be as unambiguous as possible. In the past, I thought being eloquent and using sophisticated words helped with conveying the most accurate meaning: the best way to translate an idea from my mind into symbols on a screen. Nowadays, I'm not so sure. People are busy, in a hurry, one or two coffees late, or two coffees too deep. Maybe they're not fans of sophisticated words simply because they come from another country and haven't seen that word before?

Because of all this, I want to simplify my prose. I pace myself, I rephrase: I lay it flat. If a way of writing necessarily exposes a bit of one's personality, I want my way of writing to portray a laid-back, understanding, patient dude.

- been thinking about building a different way of presenting those notes...
- use something similar to what I have made, but without the need of creating the folder hierarchy?
  - a folder would create an automatic index page that lists everything in that page
- first of all, I was thinking of dropping the distinction between a `post` and `page`; not entirely, but just the entry folder
  - have the whole site be inside `content`, and move it back to the root of the project?
  - just have to do the thing I was thinking about the other day:
    - grab all the markdown files
      - -> from `./content/**/*.md`
    - go through each, analyze `frontmatter` and create *skeleton* JSON object for each
      - -> the bare minimum `meta`
      - determine their `type` (`post` or `page`? or anything else?)
    - split all of those into arrays for each `type`
      - use the right `type` extractor function... (don't make it too generic for now)
      - -> which shape their data must be?
      - at that point, once every item was processed: **export** to a JSON file
    - the build step comes way later, once all the data was squeezed out
    - go through each items of every `type` of content
    - apply all the *post-processing*
      - `postByMonths` (if in the `meta.use` ?)
      - adjacent posts?
      - adding access to other content type items
      - tacking on all the *global* keys
    - determine their template
      - -> in which html entry point to dump all that data?
      - use the **data** in the **template**
      - good?
