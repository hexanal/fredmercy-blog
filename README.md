# Fred Mercy's Website

## what is it?

* *handmade*, *minimal*, *work-in-progress*
* browsable at [https://fredmercy.ca](https://fredmercy.ca)

## how?

If you want to see how the sausage was made, here's the recipe:

First, install the npm deps with a quick `npm i`

Then, you should be able to fire up the dev server with `npm start`

This command will run an Express server at [localhost:8042](http://localhost:8042), and watch for changes in the **content** as well as in the **source files**:

- what I call **content files** are the files inside the `/content` folder. Those are:
  - Markdown files
  - JSON files
- what I call **source files** are the frontend dev things, they include:
  - **assets**, which are in `/src/assets`; the images, font files, sounds files, documents, etc. etc. They get copied whenever there's a change. It's cool... I don't have a lot of them, so it's fast enough.
  - **javascript** files; they get compiled using [esbuild](https://esbuild.github.io)
  - **sass** files; they get compiled using [Sass](https://sass-lang.com/dart-sass) (Dart Sass)

## why?

The goal was to have this whole website be tailor-made, built from scratch. I tried to write the least amount of crazy code as I could in order to keep it manageable. Obviously, seasoned developers who look at this codebase will roll their eyes at most of it. However the other, more personal goal of this endeavour is to learn, to experiment, to try things.

## going deeper

Let's say you want to try and use this as a starter for your own website. Are you crazy?

Look inside the `config.js` file. It's importing `./zorg/index.js`; what the heck is this?

It's what I built to orchestrate the building of my content files into actual HTML files. My templating engine of choice is HandlebarsJS, because I'm kicking it old-school. The handling of **data + templates** business is done via this `index.js` file, and it's using *middlewares*.

The `use` function on that Zorg Builder function (in `config.js`) accepts an object of **middlewares**.

So, the way I've set it up is thusly:

- Zorg goes through all the Markdown files in `/content`
- it looks at their [frontmatter](https://www.npmjs.com/package/front-matter) for a `type`
- it divides all the content into thoses types, to create a big old Javascript object of this shape:

```js
{
  "page": [
    {
      "_filePath": "./content/hello-world.md",
      "meta": {
        "title": "Hello World!",
        "description": "Foo",
        "type": "page"
      },
      "content": "Some *markdown*, probably."
    }
  ],
  "post": [
    {
      "_filePath": "./content/blog/2020/04/20/toke-up-brother.md",
      "meta": {
        "title": "Yeah...",
        "description": "bruh...",
        "type": "post"
      },
      "content": "Wait, what did I want to write again?!"
    }
  ]
}
```

Here, we've got two pages:

1. one `hello-world.md` page at the root, of type `page`
2. one `toke-up-brother` page, nested deep in folders, of type `post`

### what's the deal with middlewares?

I stole that concept from [Metalsmith](https://metalsmith.io/): even though I haven't really used Metalsmith, I reached the realization that I needed a similar idea which are functions take all the content and modify it (I wanted to call them `processors` instead of middlewares).

A bunch of those functions would each add bits and pieces to mold the data into what I wanted to use in templates.

Look into `./zorg/middlewares/`. If you open, say, `pages/relationship.js`, you'll see that it exports a function that expects to receive the `contentTypes` object (see JSON above). This function then goes through all the items in `contentTypes.page` and tacks on extra keys to each *item*.

Why did I do it this way? I don't know. It felt right at the time, and it's building my website fine. Works for me.

### templating

By default, a content type will be matched with a Handlebars template of the same name in `./src/components/templates`. For instance, a `page` type content item will use `./src/components/templates/page.html`; duh!

You can add a `template: template/whatever/path` to the front matter, which specifies a custom component to use for the entry (an example of that is my `./content/resume.md` page)

Handlebars is pretty cool, I think. Its minimal approach suits my needs, and so far I've managed to make it do whatever I needed.

### compilers

In `./zorg/compilers`, you will find the script files that handle all the frontend compilation stuff. Tap into that if you want to use something else than straight-up Sass, or another JS bundler.

I ditched [Webpack](https://webpack.js.org/) because, let's face it, what I'm building here is a tiny personal website: I don't need code-splitting, hot module replacement, blah blah. I need something to manage my CSS, a little bit of Javascript, and something to dump the contents of `./src/assets/` into `/public`.
