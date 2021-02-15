# Fred Mercy's Website

## what is it?

* *handmade*, *minimal*, *work-in-progress*
* **experimental**
* [fredmercy.ca](https://fredmercy.ca)

## how?

If you want to see how the sausage was made, here's the recipe:

1. install the npm dependencies with a quick `npm i`
1. fire up the dev server with `npm start`

It runs an [Express](http://expressjs.com/) server at [localhost:8042](http://localhost:8042) and watches for changes in the **content** & **source files**

- a **content file** is any Markdown `.md` inside the `/content` folder
- the **source files** are the frontend "theme" files in `./src`
  - **assets** — images, fonts, sounds, documents, etc. handled by `zorg/compilers/assets.js`
  - **components** — HandlebarsJS HTML templates, or "components"; compiled with `zorg/compilers/website.js`
  - **javascript** — compiled with [esbuild](https://esbuild.github.io) in `zorg/compilers/javascript.js`
  - **scss** — compiled with [Sass](https://sass-lang.com/dart-sass) in `zorg/compilers/sass.js`

## why?

The goal was to have this whole website be tailor-made to my specific needs and to use the least amount of _dependencies_ as possible. I tried to write as little code as I could in order to keep it somewhat maintainable.

Obviously, seasoned developers who look at this codebase will roll their eyes.

However, a more personal goal of this endeavour is to learn, to experiment, to try new things.

## going deeper

Let's say you want to try and use this as a starter for your own website. Are you sure!?

Look inside the `./zorg/bin/zorg.js` file. _What the heck is happening in there?_

It's something I came up with to orchestrate the building of my content files into HTML files.

We've got to understand **3 things** here, and it's the three folders in `./zorg`:

1. `bin` — in this folder are the "core" files, utility functions used to stitch the data together (to use for a website, an app or whatever)
2. `compilers` — that's the tools I use to compile the CSS, the Javascript, copy the assets, and build the HTML
3. `middlewares` — these are all the _assembly-line machines_ used to enhance, process, add to, extract, etc. the **content**

### templating

By default, a content type will be matched with a Handlebars template of the same name in `./src/components/templates`. For instance, a `page` type content item will use `./src/components/templates/page.html`; neat!

You can add `template: template/whatever/path` to the front-matter which specifies a custom component to use for the entry (an example of that is my `./content/resume.md` page)

Why [HandlebarsJS](https://handlebarsjs.com/)? It's a bit _old-school_ but it works for me.

### middlewares

The handling of **data + templates** business is done via in `zorg/compilers/website.js` file, and it's using a bunch of *middlewares*. Each of them adds bits and pieces to mold the data into what we need to display in templates.

Look into `./zorg/middlewares`. If you open, say, `pages/relationship.js`, you'll see that it exports a function that expects to receive the `contentTypes` object (see JSON above). This function then goes through all the items in `contentTypes.page` and tacks on extra keys to each *item*.

Why did I do it this way? I don't know. It felt right at the time, and it's building my website fine. Works for me! _(for now at least...)_

## what does Zorg do?

- Zorg goes through all the Markdown files in `/content`
- it looks at their [front-matter](https://www.npmjs.com/package/front-matter) for a `type`
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

Oh! We can see we've got two pages here:

1. one `hello-world.md` page of type `page`
2. one `toke-up-brother` page (nested deep in folders) of type `post`

That's what the `zorg()` function will generate, by default. But it accepts one argument which is **an array of middlewares**: the object above is passed through each of the middlewares.
