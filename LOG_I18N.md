## i18n & big refactoring session

- modify zorg "entry"
    - provide the path to content files
    - language of website
    - pass the plugins

- then the `website.js` file just builds TWO sites?
    - or add a "configuration" object/file, finally?

## to try someday

- can we just... use a page "id" as the link between the languages?
    - name your page the same, and it'll be linked
    - i18n middleware could do:
        - fetch the versions of the pages
        - stick in `meta.translations`
        - other plugins need to hook onto the i18n-enabled stuff
            - `languages.length`

- add server folder, stick the `server.js` file in it
    - clean up server
    - split up API routes
    - split up websocket business
    - split up server setup and middlewares

## to think about

- should the folder structure define the final URL, or can the URL be specified in the front-matter?
    - then we could use the `blog.en.md` and `blog.fr.md` trick?

## or something like:

EN:

- `src/content/en/about/page.yaml`
- `src/content/en/about/about.md`

```yaml
id: about
url: /about
title: About
description: This is about something
type: page
content:
  - block: 'markdown'
    content: './about.md'
```

FR:

- `src/content/fr/a-propos/page.yaml`
- `src/content/fr/a-propos/a-propos.md`
- `src/content/fr/a-propos/bio.md`

```yaml
id: a-propos
url: /à-propos
title: À propos
description: C'est à propos de quelque chose
type: page
content:
  - block: 'markdown'
    content: './a-propos.md'
  - block: 'markdown'
    content: './bio.md'
```

Another page:

- `src/content/en/blog/page.yaml`

```yaml
id: blog
url: /blog
title: Blog
description: Random Thoughts or whatever
type: page
template: templates/blog
content:
  - block: 'blog-index'
  - block: 'blog-nav'
```


## todos

- i18n: detect browser language, suggest redirect?
- if no alternative page for current language, point to website root (in other languages)

### try this too

```hbs
{{#lang en }}
Content for English website
{{/lang}}
{{#lang fr }}
Contenu pour site français
{{/lang}}
```