## markdown

go full HandlebarsJS?

or:

```hbs
{{#markdown }}

# Blah blah!

Yo!

{{/markdown}}
```

or go full custom, but with markdown support?

```markdown
(@layout/head)

(@components/breadcrumbs)

This is still some valid markdown, bro.

(@layout/footer)
```

```markdown
(@header)

(@components/breadcrumbs)

(@components/latest-post)

This is still some valid markdown, bro.

> cool!

(@components/drawer)
Sticking some markdown in drawer? This is probably too _evolved_...
(/@)

(@footer)
```

## highdeas

pure-js-based templating?

```js
head()
breadcrumbs()
outlet()
footer()
```

`src/content/en/home/home.html`
`src/content/en/home/home.js`
`src/content/en/home/home.scss`

`src/components/home.scss`
