# HX_BLOG

Source files for [my blog](http://fredmercy.com/blog).

## Getting started

If you want to fork that and use it for yourself (why?!), here are some instructions:

### Configure

```
$ cp config.js.sample config.js
$ vim config.js # edit to your liking
```

### Build

This build the assets and generates all the HTML files for the posts.

The npm version used is `v10.11.0`

```
$ nvm use 10
$ npm i
$ npm run build
```

## Content

### Posting an entry

If it doesn't exist yet, create a new month folder in `/entries` with the format `YYYY-MM`.

Create a new folder in this folder with the entry date, format `YYYY-MM-DD`.

In that folder, drop a single Mardown file (`.md` extension) with whatever name you want. The filename will end up being displayed in the URL.

At the top of this file, include the necessary _front matter_, e.g. :

```
---
title: Your Post Title
description: Description that will appear in the <meta> tags
type: tag, category, something, comma-separated
---
```

`title` is optional and if omitted, it'll read "Untitled entry for February 15th, 2019", for example.

A special `template` parameter can be used to use a different view template, which are located in `/src/views/templates`. These are html files with [HandlebarsJS](http://handlebarsjs.com/) syntax.

Then it's all [Github Flavored Markdown](https://github.github.com/gfm/).

## Development

Run these commands to _watch_ the files.

```
$ nvm use 10
$ npm run dev
```

### Advanced!

To change stuff around, it'll mostly be in `/tasks/handlebars.js`

That's it, you're on your own now, buddy!

## Cheat Sheet

Some thing I need to remember when writing:

### Frontmatter

```
---
title: This is a post
description: This is gonna be the description
type: journal # type of entry, duh
edit: 2019-04-08 @ 7:10pm # when adding an edit and to show when it was edited
comments: 0 # number of comment slots (if different from default)
---
```

### Collapsible Block

```
<code class="collapse">
<button type="button">Show/Hide</button>
<em>

Contents of this collapsible box that's hidden by default.

</em>
</code>
```

### Embed an MP3/audio

```
<audio controls src="/files/music/langsam.mp3">
Your browser does not support the <code>audio</code> element.
</audio
```

### Add a togglable reference (e.g. [1])

```
<sup title="Short text to explain">
[1]
</sup>
```

