# fredmercy.ca

## what is it?

* handmade
* minimalist
* a work in progress (version `3.0.1`)
* **experimental**
* [fredmercy.ca](https://fredmercy.ca)

## architecture / concepts

1. The website is built using a collection of functions I call **Zorg**.
1. The website is built from **source files** found in `src/`
1. The content is in `src/content` & the _theme_ is in `src/theme`:
    * _content items_ are written in Markdown
    * _HTML views/components_ are written in HandlebarsJS
    * _styles_ are written in Sass
    * _JavaScript_ files are written in plain JS (no transpiling nor bundling) and use JS Modules
1. It's built on top of an ExpressJS server:
    * when developing, the `npm start` command will build, serve, and watch for changes in source files
    * to run on the production server, use `npm run serve`
    * an `.env` file can be used to specify `HOST` and `PORT` for Express
1. The compilation of theme assets is handled by the following files:
    * `zorg/assets.js`: simply copies files from the source folder to the `./public` destination folder
    * `zorg/sass.js`: uses the `sass` package to compile styles
    * `zorg/websites.js`: uses Zorg to gather the content and process it

## zorg

* The `zorg/index.js` file is the entry point where all the _building_ and _watching_ takes place.
* The `zorg/website.js` file takes care of the content file, by using Zorg (the `zorg/lib/zorg.js` file)
    * The website configuration and the `adapters` (explained below) are specified inside the `zorg/website.js` file.
    * Zorg fetches the content specified by the website's configuration object, and applies _each adapter to the content items_ in series, each one processing the content item in a certain way.

## adapters

_Adapters_ are functions that are passed the list of content files Zorg finds:
    * the `zorg/adapters/default-meta.js` file sets up the default **array of items** (see below)

Here's an example of an **item** for a content file `src/content/thing.md`, after it was processed by `zorg/adapters/default-meta.js`:

### the markdown content file:

```markdown
---
title: A thing!
description: These are things
---

_Hello World!_

```

### the item, once processed by Zorg and the "default-meta" adapter:

```js
{
  _info: {
    src: "./src/content/thing.md",
    updated: "2021-04-20 @ 4:20pm",
    built:"2021-04-20 @ 4:20pm"
  },
  meta: {
    baseURL: "/",
    lang: "en",
    id: "thing",
    type: "page",
    title: "A thing!",
    description: "These are things",
    draft: false
  },
  body: "_Hello World!_"
}
```

### more adapters?

The example above can't build a website yet.

But a few more adapters will get us there:

1. `zorg/adapters/page-meta.js`
    * adds some properties to `item.meta`, for example: `item.meta.url` (inferred from the source file's path)
1. `zorg/adapters/markdown.js`
    * uses the `marked` package to format the string found in `item.body`, and adds an `item.content` property with the rendered HTML string.
1. `zorg/adapters/html.js`
    * uses HandlebarsJS to generate an `index.html`, and writes it inside a folder specified by `item.meta.url`. We pass _the entire `item` object_ as data to the HandlebarsJS template.

To sum up: if we use the adapters `default-meta`, `page-meta`, `markdown`, and `html`, our content files will be processed and rendered as HTML in the `./public` folder.

