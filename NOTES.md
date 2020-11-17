# NOTES

## November 15, 2020

`2:37pm:`

- not a lot of energy this week and even this weekend... I'm resting :)
- I thought about my website's design and I will have to change a few things
  - more legible body font
  - center the content...?
- thinking about "discoverable" or "explorable" websites
  - make the visit interesting with hidden things, micro-interactions(?)
  - what lets you know where you can/should go? the menu? main navigation?
    - elements on the page?
    - sitemap? a menu that looks more like a diagram, with hierarchies, colors
    - "you are here" dot for active menu item
- i need to write blog posts now!!
  - one about living a hypocritical life:
    - thinking you're green but you're consuming like a maniac
      - meat! wasting food! having a child!
    - thinking you're successful but you're riding the advertising money wave
      - fuck ads; but they gave me a career...
      - advertising is coersion, it's manipulation, it's hypnosis, it's misdirection, etc.
    - thinking you're a good person but involuntarily do "bad" things to other people or animals
  - one about the promise of web design and development
    - and how it got hijacked by... apps, social media, ads, "silos"
    - we now have "virtual strip malls", with big companies pushing their products and choking the competition
    - we can do better, and we should do better



## November 9, 2020

`8:39am:`

- still doing some experimentin' and I don't know if I should embark on that for now
- I have other things to worry about :)

`9:04am:`

- I'm a maniac.. I'm questioning every practice, I'm thinking about weird roundabout ways of doing things, and I'm loving it.
  - you know what I hate? having to install packages via npm for my frontend app after pulling from a repo
  - and then having to figure out which version of node/npm I need
  - and then blah blah blah
    - if you know what you need, can't you just install it and track it in git?
    - that way if it changes, you know who the fuck updated it, you know WHAT was updated
    - and, you don't need to install any fucking thing: it's just sitting there
    - and you do the version management on your own, in a markdown file? anyway, the lib always has the version written on top, right? so you know where you at
  - how would that work? why the fuck are we using npm for anyway? tracking the version? ease of use? what?
- should focus on other things...

`11:16am:`

- work **SUCKS**, dude
  - not sure I need that shit in my life


## November 8, 2020

`~8am:`

- for content, what about doing something like... put everything in the hierarchy
  - with a combo of `content-type` and `template`, I define what kind of content it is?
  - or maybe... yeah, that would work?
  - maybe the type is the only thing I need, and I can infer the `template` in the code?
  - `experiment` -> uses template `experiment.html` but uses the data for `page` content type?
  - this is something for a future version

`8:51am:`

- ok. so this is my own little *CMS*; but there are other options being uses out there
  - [11ty](https://www.11ty.dev/) looks nice
  - [Toast]() i've just heard about this one and it sounds good

`11:21am:`

- the `live` page doesn't work on production, I'll have to investigate that sometime
- fixing the issue with the files folder; I'll try to whip up something that exports some shit
  - got a proof of concept thing working; it's cool.

`12:50pm:`

- probably will deploy tonight; I'm getting very good at whipping it my server
  - it's nimble and I've moved it to another user's home directory on my server with almost no frustration during the process, which is crazy... doing server configuration used to be my *bête noire* but these days I'm focusing a bit of my energy on it so that I regain control of my Universe (the web)
- on top of all the 404/500 error handling I have to figure out, I'll modify how transitions are handled so that a timeout redirects to a 404, with the option to try loading the requested page again
  - I guess since BarbaJS makes us stay on the current page when the request times out, I can hook onto a "loading failed" event and display an error message (instead of nothing, and instead of landing on some specific 404 page)
  - the specific 404 page is when loading a non-existent page from the server returns nothing...
  - hmmm, if I configure the server so that it returns some 404 html file, I'll have to see if BarbaJS can get the response code, and if it's 404, I manage that error then?

`7:02pm:`

- coming back to `use: json`;
  - maybe that could be used to store info for "components"

```markdown
Lorem ispum

[something
  data: this-is-the-data-we-want.json
  other-property: Hey, this is cool
]

Dolor sir amet
```


## November 7, 2020

`9am:`

- did some work but I still have to deploy
- server-side work is daunting... tried to set up an FTP access for me to upload files easily, but configuring the server is a bee-eye-tee-see-aytch!
- okay so... I've discover I'm clearly not alone in this endeavor, and plenty of like-minded people are out there still building personal websites! I'll link 'em all on the website. I'll try to connect with some of them, if they deem me worthy of joining their network of high-achievers... maybe there's a free spot in there for a tech-savvy stoner hippie motherfucker like me?
  - https://datagubbe.se/subversive/ <- !!!
- I'm thinking of a slight redesign, it only for the content part of the blog posts, so that it's a little more legible, just easier to parse and read
  - I could test-drive that "shortcode" idea a little deeper, to help with foot/sidenotes, expand/collapse, etc.
- it's good enough for now, I can rest easy if I don't push new shit on the blog before long...

`3:16pm:`

- weird issues with WiFi on my iphone; guess I'm ready to be a system admnistrator
  - growing increasingly paranoid of what kind of data is circulating on my network, and how "encrypted" it is, if at all...
  - done! only had to reboot the router... it's BEGINNER LEVEL SHIT, BRO! GIVE ME A HARDER THING TO TROUBLESHOOT!
- officially gone from instagram; next up is twitter!

`7:05pm:`

- looks like I don't handle 404 errors (any errors, in fact... I think)
  - this is gosh darn CRITICAL PRIORITY, man
- anyways, this should be handled by... nginx? it's straight up HTML, unless we're talking about the API, but that's gonna be on another port, perhaps
  - https://www.cyberciti.biz/faq/howto-nginx-customizing-404-403-error-page/
  - also interesting to plug in: https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-14-04



## November 6, 2020

`~5pm:`

- will try to implement the missing things listed in yesterday's entry
- ~~also... gotta import all the comments from the "old" site~~
- I need something to zip shit with on the server (db exports, and other)
- I need to parse CSVs
- I need to think about eventually... ugh... moving toward some preact-generated website?

`8:57pm:`

- those breadcrumbs are weird, I'm not a fan of the previous/next button placement, I don't like the rigidity of the design, and that HTML menu needs to go... I need a better menu.
- ...
- I need to chill, too

`9:55pm:`

- for sure, add some console.log in there... I'm kept in the dark when the build completes

## November 5, 2020

- super cool. it's live.
- things to do next:
  - in menu, add:
    - github
    - ...twitter?
    - other?
  - in help, add:
    - website policy
      - As sole webmaster, I expect the comments left on this website to follow good manners. Any content that I deem offensive will be moderated.
      - Don't expect your comments to be kept online forever. Think of them as a post-it note you leave on that page. If you write something that need to be kept online forever: write it on your blog, then link it here. It's easy.
      - privacy policy
        - this is how you will leave data on my website (data that I can identify as being *yours*):
          - posting a comment with your real name
          - ...that's it! I'm not tracking you in anyway. All the data that I "keep" is sitting comfortably on your harddrive. It's not "the cloud" or anything, but it's clever enough.

    - github source for the website
    - also add a position-fixed help button on bottom right?
  - extract all the "music" links into a music page
  - extract the last few links I've posted into the bookmarks page
  -

## November 4, 2020

`11:58am:`

- lots of ideas flying around in this document, I need to be more thorough and add them to my "Pipeline" board, on Notion
- gotta add a `manifest.json` to enable PWA shit... I have to try that out
- gotta improve the homepage visually... I have ideas but no time
- also gotta finish the structure of this website to focus on other funky ideas :)
- I'm hungry

`3:06pm:`

- as I'm churning out weird minimal code for my website, I'm also researching React and VueJs and other SvelteJS whatever... and so far, React is still the better choice to me, because of my familiarity with it and the fact that it's pretty much free of "magic"; it's just JS
  - but the main package is quite huge; I will instead try to use `preact` to begin with
  - I'll see if I can do without using hooks
  - should I jump back in Redux? or is it overkill?
  - I have to remember I'm building a very simple website here, which is basically a collection of static documents
- eventually though, I want to be able to inject fucked up component, with mad interactivity
  - tables, filtering systems, websocket-ready interactive UIs...
  - but is the building process involved in making those features really *helped* by modern framework?
    - and I mean... in my case, I don't think so

- using a modern framework immediately requires a dev to handle more things, it adds complexity;
  - it should help us create better things, not make us work harder to get there
  - so it depends on how complex the things we want to build are

`3:23pm:`

- a markdown file
- I fetch it
- get frontmatter
- parse content for components
  - `[[` is the start, look for a `]]` in later lines
  - extract the lines in between
  - it's yaml
- grab what's after the `[[`
  - it's a path to the component's view
  - grab that component
  - feed it the yaml (transformed to a JS object)
  - render it (statically)
- replace from `[[` to `]]` with the HTML generated by the component
- parse this as markdown content

problem with this is: the components aren't nestable, but that's... ok, I guess
this is pretty much feature parity with "flexible content" in Wordpress

- to get it to be nestable... just use the data?

```markdown

Lorem ispum dolor

$[](
component: ui/experimental/test
  data:
    what: Hello World
    okay:
children:
  component: ui/some-other
    data:
      yay: This could work?
  children:
    component: ui/deeper-component
      data:
        no: No data?
)

Sit amet consectetur

```

- I think the problem now is that I have to figure out a way to handle that data
  - should the data in the parent be accessible to the children?
  - should it be optional?
  - what about collision with the data object's keys?
  - etc. etc.
- but again... what's the use case? why do we need nesting here?
  - maybe for a grid component?

... or?

```markdown

Lorem ispum dolor

$[](
component: ui/experimental/test
  data:
    what: Hello World
    children:
      component: ui/some-other
        data:
          yay: This could work?
          children:
            component: ui/deeper-component
              data:
                no: No data?
)

Sit amet consectetur
```

- what about JSON instead?

```markdown

$[]({
  "id": "ui/experimental/test",
  "data": {
    "what": "Hello World",
    "children": [{
      "id": "ui/some-other",
      "data": {
        "yay": "This could work?",
        "dude": "maybe",
        "number": 20
      }
    }]
  }
})

```

`8:47pm:`

- hmmm, I've managed to do what I set out to do
- it... sort of works, so I'm gonna test drive it soon
  - looks like it should **not** work, you know?
  - it's... the solution to a non-problem, but at the same time... there's a certain charm to it
- ok... will I deploy tonight? haha

## November 3, 2020

- continuing from yesterday's last bulletpoint, about the component system:
  - I had already tried something using React, that uses components to build a static version of the website
  - and then attempts to *hydrate* the app with some other state, if there is such a thing
  - I abandoned it because... let me think about that; yeah, I had issues with trying to pile up too many layers of technology
    - React, with Recoil for state management, and then I needed some sort of router functionality...
    - with the current setup, I have HTML views, with the bare essentials, and BarbaJS works for me to make transitions look good
    - maybe if I can think about it deeper, it will make sense
      - maybe if I mount a React "app" on every "component", passing the necessary data
      - linking all those to a state management singleton?

- none of those improvements (using React, or Vue, or a state management lib) would fix the main issue of **content entry**
  - I need (or anybody who writes content for a website) to have a very simple, easy to understand, minimalist way of adding content
  - I want to write some text in a markdown file, following very basic formatting rules (which I think should become some sort of standard, if it's not already; not sure whether "normal" people use it every day, but perhaps one day they will, haha)
  - I want to be able to **add modules** that enhance the page I'm editing:
    - I want to be able to do that **easily**
    - I wish for it to be **text-based** also, and easily **exportable**
    - it would probably have to plug into whatever component implementation I'll have chosen:

```markdown
Lorem ispum

{{> ui/experiment/test }}
{
  "some": ["json", "object", "for", "data"]
}

Dolor sit amet
```

- this uses HandlebarsJS style partials, and I would grab what follows it immediately and use that data
- or I could go full custom, and in a middleware, use that syntax to plug it into whatever framework I want:

```markdown
Lorem ipsum

[[blocks/leaflet-map
  latitude: 75.342423432
  longitude: 80.98234983
  zoom: 12.123123
]]

Dolor sit amet
```

- in this case, I would
  - detect that `[[` means the start of a **block component**, and ends with `]]`
  - isolate the name of the component `blocks/leaflet-map`, and its data
    - the data here is formatted as `yaml` -> this is to match the frontmatter (a syntax that the editor must know a little bit about already)
    - format that data as JSON (just like the frontmatter)
  - grab whatever component is in `block/leaflet-map` and pass it the data
  - render it as HTML and insert it into the markdown
  - render the markdown (rendered HTML should be used as-is)
- see if I can hook into the `marked` parser and lexer, and add a `component` token, that matches:

```
[[some-path
some-yaml: hello
]]
```

- if the markdown parser gets that and then runs some sort of middleware that does the component magic (using whatever... VueJS, lit-html, React, preact, Elm, who cares)
  - then we're in business
- I'll have to take that into some other project anyway... maybe another branch, or another repo altogether

`9:41am:`

- been toying about websocket earlier this year, and it was pretty good, but now I'm thinking about digging a little deeper in there
  - thinking about making the comments a little more... ephemeral, maybe a chatbox... I don't know, dude, I'm all over the place
- for the blog, and pages, I also need to set more metadata:
  - created on
  - modified on (timestamp)
  - status (by default 'published', but also 'draft')

`12:12pm:`

- seriously need to work on colocating the files... html+css+js, to see more clearly what it entails
  - I feel like the disconnect between how each of those files are compiled is the problem
  - the CSS-in-JS (and HTML-in-JS of modern frameworks) solution means that the JS is the true master
  - I could go back to using that... which means working on yesterday's `7:08pm` idea:
    - components are HTML templates handled by a JS framework
    - they import their logic AND styles
    - they're fed page data
    - if they're "dynamic", then provide something to *hydrate* them with up-to-date data
      - could be handled by a VueJS `mounted` function?
      - fetch the data then?
      - think about the comments section of a post: how could that work?
      - think about how NextJS/Gatsby does it:
        - first it goes through the compiler: needs data coming from the builder (the `taskis/posts.js` file?)
        - then in the browser, it needs to rely on data fetching
      - it would not use `exponent` anymore, but straight up VueJS
      - the HTML is static, BarbaJS fetches the necessary HTML file by URL
      - then, just like we'd refresh the components on route change, we can re-enable whatever component is on the page, based on VueJS? or React?
      - in barba's function, use something like `ReactDOM.hydrate(<MainComponent />, mountDiv)`
        - the data passed to `<MainComponent />` has got to come from somewhere; might as well pass that data via... the whole JSON in the html?!
        - or I gotta write something like BarbaJS, but for my use case:
          - based on the URL, fetch the necessary `template` + data by AJAX
          - or let the template change depending on the data (that's from the frontmatter anyway, and the shortcode, if there's any)
          - inject the data, let the app figure out what to display
          - with a cool script, update the `<head>` and we're golden
        - basically, the root component takes the data, and conditionally displays a template
        - that template is the markdown wysiwyg thing, but would also be augmented with something that grab components from the content?

`1:37pm:`

- glob pages, posts, extract data + URL (url is fundamental, id is too, but for other reasons)
- go through each url, and feed it to the **root component**, along with **data**
- render that into the html **layout**
- when loading that page, you get all the data
  - the extra data needs to be fetched, if it's supposed to be dynamic
  - only fetch when you're in the browser environment
    - that's in the `data` object, under `env`
- I'll try to describe if in more details, and maybe whip up a prototype... I would like to try VueJS with this.


## November 2, 2020

`8:45am:`

- not hoping for this day to be a better day, but I feel more relazed this morning so that's cool...!
- I was thinking about co-locating the HTML, CSS and JS components together, and reviewing the whole structure to see if it makes sense for this kind of project
  - now that I have a tighter grip on how HandlebarsJS works (or at least, on how I'm wiring everything up in my project) I think using the component as a basic unit is feasible
  - there's no *one-way data flow* or any *vdom* implementation yet, but I believe with the way I've set up things it would be trivial to swap out the HandlebarsJS html implementation with something else (Elm? VueJS? lit? who cares)
- we're looking in [Parcel](https://parceljs.org/) for our bundler at work, and I thought of trying it out in another branch of this repo
  - a bit too much hidden magic for my taste, but if it keeps everything clean, I'm for it
  - also it provides many cool things out of the box that I don't think I'm quite ready to tackle yet?
    - code-splitting
    - Hot Module Replacement
  - maybe I could implement those in my webpack config, but I will get messy...

- anyway, this morning I'm fixing the breadcrumbs and maybe I'll deploy right after?!?!?!

`9:48am:`

- gotta add back support for `dotenv` and set it up on the server before deploy (ugh!)
- gotta review the npm scripts so that `dev` (or `start`?) runs the server + watches the files & rebuilds using webpack
  - the `build` or `prod` script will build the website's HTML and run the webpack production build

`3:50pm:`

- man I've been doing a BUNCH of things... and it sort of works!!
- I can see myself publishing this website sometime soon!

`7:08pm:`

- I'm thinking maybe using something like VueJS for the component layer might be more flexible, especially once I'll try my hand at that "block" feature
  - I wanted to have something that would allow some easy *plugging in* of components inside of the markdown
  - it could be that "shortcode" idea I had, but it would require some sort of pre-parsing of the markdown, and I don't like that
  - it could be something like... custom views, Vue components with props and shit, but it would probably bother the Markdown parser also...
  - the point was to be able to have a markdown file as long as I want straight-up text, with minimal markup, and then augment with a sprinke of custom components I could drop in at any place, like:
    - a map component
    - a form component
    - an iframe to some experiment elsewhere on the website
    - an expand collapse section?
    - audio player for music, spotify, embed something
    - anything else that requires special markup, and that could be passed parameters and data
  - ...


## November 1, 2020

- url shortener:
  - if post has `shortpermalink` in frontmatter
  - export the page twice:
    - the usual URL based on the folder structure, and file name
    - and if we need a permalink, the link based on the param
      - e.g. `shortpermalink: abc` would export to `https://fredmercy.ca/read/abc`
      - `https://fredmer.cy/abc` ?

`8:06pm:`

Horrible fucking day today!

But I managed to finalize the resume page... just gotta link to it real quick.

Ok...homepage almost ready. Resume done. Gotta fix the breadcrumbs and I should be ready to deploy the first version.


## October 31, 2020

- took shrooms, so I don't know how valid my notes are gonna be
- I thought about that "shortcode" idea, and... if you're a dev, or if you know HTML, or, sorry...if you know HandlebarsJS, can you just drop handlebars helpers into that shit?!

```markdown

Hi, this is my markdown whatever

{{> some/component {
  "can": ["I", "pass", "context", "that", "way", "?"]
} }}

The rest of my little speech.

```

- does this work?
- meh. I'm on some dumb shit
  - playing "Anaconda" just because


## October 30, 2020

`5:39pm:`

- couldn't get to work yesterday evening, so I'll try again tonight
- time to deploy!
- I would love to have some password-protected HTML page that features two buttons:
  - one for compiling the HTML templates
  - one for rebuilding the assets (css,js,media)
  - ...but this is probably for another time (the "backend" project)
- also, if I have time: transfer the rest of the website to the "new way" (résumé)

`8:41pm:`

- added a "watch" thing, just for kicks... it works! and so far, I'm quite pleased with how sturdy it is:
  - keeps watching files despite choking on some Handlebars errors
  - watches for new files, and doesn't overdo it...
    - it's good because if it works well enough now, hopefully it will be easier to manage future improvements
- I'm migrating the "resume" page from my current website:
  - it's not a painless process, but it's not quite frustrating: it does make the limitations of my *CMS* very apparent!
  - I guess I will have to implement the notion of dynamic "blocks" pretty soon (thankfully, I have something that seemingly works, somewhere in another version of this website reboot)
  - it's not done yet because I would have to slap on some more styles on top of it... and I realize I need to add stuff to the menu
- this page is also a good candidate for the "shortcode" project!

```markdown
BLah blah

[resume-section]
{
  "what": {
    "hey": "cool"
  }
}
[/resume-section]
```

- would something like that work? meh, I'm too tired to think about that now!
- bye!

- ugh... did **NOT** deploy tonight!
- you know what? tomorrow I'm gonna work on a breadcrumbs middleware + module! hahahahaha


## October 29, 2020

`9:10am:`

- Probably won't be working too hard on this today. Pretty busy with actual work.
- maybe I should push all of that right now, just so I feel like I'm making progress
- then I will feel more inclined to experiment on other aspects of the project
- I'll go ahead and copy the long-ass roadmap-y thing I wrote earlier, and dump it into a ROADMAP.md file to keep track of my progress

`4:53pm:`

- Tonight, I'll try to deploy my new website! haha


## October 27, 2020

`~9:00am:`

- working hard (with a headache, too!) at solving that `relationship` issue
  - I think I got it... but it's weird. I feel like I should take some CS courses and really master tree traversal, graphs, and all that
    - like... it's not a lot of lines of code, but I'm afraid this algorithm's complexity is exponential. I'll have to benchmark that bitch and figure out if some computer science magic can make it FAST
    - I have a handful of pages so far, and the script runs super fast (then again, I'm on a fairly recent Macbook Pro, so that helps)
- ok, good enough for now!
- the idea from yesterday about the middlewares being called from the template:
  - could be like the `demos.json` thing: instead of `useJSON` in the frontmatter, it could be a generic: `use` key
    - that key goes through the array, lets say:

```yaml
use:
- json
- whatever
```

    - it goes through the list of middlewares and applies them to this page

- we'll see how that goes

`3:29pm:`

- wishing for programming to become less painful in the future... these days it's worse than ever
- will try to take it easy on the blog project now that I have something that's not half bad
- I don't know what the fuck I'm doing, but I'm doing it; no fucking around this time
- what's left to do now before I can launch?
  - let's start with a list of things I've done recently:

1. the colorscheme dropdown is fixed and it works
2. the parent/child pages functionality is baked in; not too shabby
3. reverted to the old "rainbow" page transition while I incubate the next bright idea (low priority!)

What to do next?

1. deploy step, something that webpacks everything and builds the HTML for the whole thang
2. maybe try to integrate the current website into this new framework

- deploy step is primordial because that's the key to getting it up online
- it's the worst for me because I want to focus on frontend issues, but instead I have to dive into the server side of things!


## October 26, 2020

`~9:00am:`

- lots of useless ideas yesterday!
  - the comments ideas (having the "database JSONs" co-located with the post they refer to) can be dropped, I think... or I have to operationalize the heck out of it
- the shortcode idea is not too bad, but again, I need to prototype. It can't become a weird Frankenstein monster version of a "block" system. It needs to be simple, effective, solid.
- as for the CSS hybrid between BEM and Tailwind needs some researching into as well
  - a little showcase, a different branch after this one maybe? i dunno

1. still have to fix the colorscheme dropdown
2. still have to fix the "parent" pages thing
3. fix the "loading" state redesign

- idea number 4324324: why not have some processing happen at the template level?
  - grab all the script "middleware" from the template, apply that shit, process the data, feed it to the template
  - that way I can have shit like main menu, etc. etc.
    - I need to visually represent this

Future things to add:

1. error handling (better UX, better dialogs)
2. ? forgot what else, but there's more, for sure

`4:13pm:`

- fuck it: colocated the comments with their entry
  - I can do a quick job of moving shit around so that older comments match this new structure
- I gotta fix the colorscheme switcher
  - done!
- reverting the transition thing because... my thing doesn't work yet

`5:42pm:`

- found out why the parent pages weren't working: it's the same code as for the children pages... obviously there's something wonky going on in my logic
- trying out something to fix it


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
  - make a UI that generates the shortcode
    - see if I can stick some JSON in the shortcodes?!
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
    - I add a content type. It's blog posts, file: `posts.js`
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
