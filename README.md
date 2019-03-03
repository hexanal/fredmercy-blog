# HX_BLOG

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

Create a new folder in `/entries/` with today's date, with the format: "YYYY-MM-DD"

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

### Archives

Archiving entries is a manual process.

For monthly archives, create a new month in `/archives` with format "YYYY-MM", then move all the entries for that month into it.

You got it.

## Development

Run these commands to _watch_ the files.

```
$ nvm use 10
$ npm run dev
```

### Advanced!

To change stuff around, it'll mostly be in `/tasks/handlebars.js`

That's it, you're on your own now, buddy!
