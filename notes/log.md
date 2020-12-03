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