# NOTES

## October 10, 2020

Trying with Recoil, since I went with React, might as well get the latest hotness for the state management.
I think I can get my head around it. Let's try it tonight, for a little bit.

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

## October 18, 2020

- I think I will take some time off real work to make progress on this, otherwise I'll be so far behind I might as well abandon this endeavor altogether.
- The next goals are:

1. get the next/previous page module work (minimum: arrows next to the links, make sure the links are easy to use, easy to spot)
2. whip up a nice, minimal, fun, "work in progress" homepage where the current website lives (so, an index page!)
3. make sure the deployment step is easy to do
4. deploy

Many others will remain after that. But I have to focus on other things as well, and the fact I can have pages like that, is pretty fucking cool.
I should also try and figure out something about code splitting: embark some script files only on certain pages so as not to bloat the whole thing. However, I have zero knowledge of this space so it'll be interesting to see how I go about achieving that.


