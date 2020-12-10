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
