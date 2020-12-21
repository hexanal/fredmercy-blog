# Some research on things...

## New ideas

Something like:

[something what="cool"]

That's a goddamn short code.[* ok, this could be like that too?] Or maybe not?

Go full shortcode[* note="Holy shit, can I write markdown in there too?!"]

[audio src="/files/music/langsam.mp3" label="whatever"]

How to make them nestable, though?

Lisp idea:

(columns
  (column1 (markdown (someting-else)) )
  (column2 This is something(* something else entirely))
)

Meh.

## This is an example:

```markdown
Hello!

Thodayldfjs

dfsdf

+---+
This is waht lf
sdfjklsfjsdf
sd
+---+
ANother oclumn
+---+

[map
  lat: 93.7832342342
  lng: -78.80908342342
  zoom: 2
]

Hello

[columns]
[1]
Hello world!
Hello dolly.

[2]
## This is where it gets interesting!

[/columns]

So there...

[button
  tags: primary
  url: /files/repos/exponent-core/bin/exponent-core.js
  label: download exponent
]

I'm trying this shit out.
```

Cool.


## Something else?

- this is something that could help me make the site building process a little more generic:

```js
const contentTypes = [
  {
    id: 'post',
    middlewares: ['markdown', 'comments', 'order', 'adjacent']
  },
  {
    id: 'page',
    middlewares: ['markdown', 'relationship']
  }
]
```

- would allow me to really have the folder structure be exactly like what I output as HTML
- the markdown "type" would match `id` of the content type, and apply the necessary middlewares
  - post needs comments, and to be ordered
  - I'm getting all the markdowns
  - filtering by type
  - default is page
  - for each content type, apply the middlewares
  - finally: output that into a JSON file (that's the whole site's data rolled up in a ball)
  - and, then, for each of those page contents:
    - apply the necessary template with the associated data
    - make HTML

- if I use preact, vdom, whatever
  - have a "root" for the server pre-build (static markup generation)
  - have a "root" for the client "hydrate" (app hydration)

## Refactoring the build step

- glob all the `.md`
- extract frontmatter, and body
- sort/filter by frontmatter's `type`
- for each `type`, apply the necessary middlewares
  - get ready to have a defaut type.... it's `page`
- stitch all the data back?
  - `contentTypes.page`, `contentTypes.post`, etc.
- follow the folder structure to figure out the URLs

