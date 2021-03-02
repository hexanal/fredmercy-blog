## i18n & big refactoring session

- modify zorg "entry"
    - provide the path to content files
    - language of website
    - pass the plugins
- then the `website.js` file just builds TWO sites?
    - or add a "configuration" object/file, finally?

- can we just... use a page "id" as the link between the languages?
    - name your page the same, and it'll be linked
    - i18n middleware could do:
        - fetch the versions of the pages
        - stick in `meta.translations`
        - other plugins need to hook onto the i18n-enabled stuff
            - `languages.length`
- add server folder, stirck the `server.js` file in it
    - clean up server
    - split up API routes
    - split up websocket business
    - split up server setup and middlewares
- should the folder structure define the final URL, or can the URL be specified in the front-matter?
- then we could use the `blog.en.md` and `blog.fr.md` trick?

Something like:

```yaml
title: About
description: This is about something
type: page
id: about
url: /about
content:
  - markdown: 'about.md'
```

//

```yaml
title: Blog
description: Random Thoughts or whatever
type: page
template: templates/blog
id: blog
url: /blog
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