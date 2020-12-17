# JSON Editor UI

## goal

- to have a way to edit JSON using a nice UI
- to be able to edit the data I'm using for my website
- to save that data

Basically... a CRUD thing, again.

I will simply need to figure out:

1. a UI framework for form elements, needed for each `node type` or `field type`
2. a simple, composable, modular way to build a UI from a JSON, based on:
3. a *schema* format, on which is based the UI, which in turn, will allow for creating the JSON I want

## early research

Let me take an example of data I'm using on my website right now, the one that builds the résumé page.

```json
{
    "component": "resume/experience",
    "heading": "EXPERIENCE",
    "items": [
      {
        "id": "cossette",
        "title": "OCT. 2019 — PRESENT",
        "company": "Cossette",
        "location": "Montreal, Canada",
        "url": "https://cossette.com",
        "description": "Frontend web development",
        "extra": [
          "https://amnistie.ca"
        ]
      }
    ]
}
```

We've got a `component` key, a `heading` key, an `items` key.

Each entry of the array in `items`, is another structure:

- `id`, `title`, `company`, `location`, `url`, `description`, `extra`
- `extra` is an array; it's composed of links

So far we've got a few field types to create:

- an `id` field: a string, lowercase, alpha-numeric, no funny business (only `-` and `_` symbols allowed)
- a `text` field: free string, possibly sanitized
  - and all the usual flags:
    - maxlength
    - ...
- a `url` field: validate that it's a URL...
  - can be relative
  - can be external
  - figure it out as we type?
  - should we be able to plug something in that thing to be able to select a page?
  - *idea* allow multiple possible field types for one key: a field `href` could use either a `url` field, or a `page-select` field, or a `anchor` field, or a `button` field?
- a `select` field, to be able to select multiple options
  - allow a plug-in data formatter that can fetch options dynamically
- an `object` field? or `group` field? to nest data structure

Here we go, so how would I build the schema for this `resume/experience` component?

```json
{
  "id": "resume/experience", // the template?
  "fields": [
    {
      "id": "heading",
      "label": "Heading",
      "type": "text",
      "options": {}
    },
    {
      "id": "items",
      "label": "Jobs",
      "type": "group",
      "options": {},
      "children": [
        {
          "id": "resume/job",
          "fields": [
            {
              "id": "job",
              "label": "ID",
              "type": "id"
            },
            {
              "id": "title",
              "label": "Title",
              "type": "text"
            },
            {
              "id": "company",
              "label": "Company",
              "type": "text"
            },
            {
              "id": "location",
              "label": "Location",
              "type": "text"
            },
            {
              "id": "url",
              "label": "URL",
              "type": "url"
            },
            {
              "id": "description",
              "label": "Description",
              "type": "text"
            },
            {
              "id": "extra",
              "label": "Extra info, example websites, etc.",
              "type": "group",
              "children": [
                {
                  "id": "resume/job-extra",
                  "fields": [
                    {
                      "id": "job-extra",
                      "type": "url"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

Got 3 different nested `structures`, or `groups` or whatever. What about using references for each of them?
Keeping the schema sort of `splintered`, and re-usable? Keep it as flat as possible.

### The root one:

```json
{
  "id": "resume/experience", // the template?
  "type": "group",
  "options": {
    "fields": [
      {
        "id": "heading",
        "type": "text",
        "options": {
          "label": "Heading",
          "placeholder": "e.g. “Experiences” ",
          "description": "Main résumé section",
        }
      },
      {
        "id": "items",
        "type": "collection",
        "options": {
          "label": "Jobs",
          "min-items": 1,
          "uses": ["resume/job"] // could be multiple, which would offer a choice
        }
      }
    ]
  }
}
```

### The "job" structure:

```json
{
  "id": "resume/job",
  "type": "group",
  "options": {
    "fields": [
      {
        "id": "job",
        "label": "ID",
        "type": "id"
      },
      {
        "id": "title",
        "label": "Title",
        "type": "text"
      },
      {
        "id": "company",
        "label": "Company",
        "type": "text"
      },
      {
        "id": "location",
        "label": "Location",
        "type": "text"
      },
      {
        "id": "url",
        "label": "URL",
        "type": "url"
      },
      {
        "id": "description",
        "label": "Description",
        "type": "text"
      },
      {
        "id": "extra",
        "label": "Extra info, example websites, etc.",
        "type": "group",
        "fields": ["resume/job-extra"]
      }
    ]
  }
}
```

### Job extra:

```json
{
  "id": "resume/job-extra",
  "fields": [
    {
      "id": "job-extra",
      "type": "url"
    }
  ]
}
```

---

What about, uh...

```json
{
  "id": "resume/job-extra",
  "type": "group",
  "fields": [
    {
      "id": "job-extra",
      "type": "url"
    }
  ]
}

Alright...

If we're keeping it flat, then each and every field could be on its own. The declaration is flat:

```json
{
  "id": "resume/experience",
  "type": "group",
  "options": {
    "fields": ["resume/section-heading", "resume/experience-items"]
  }
}

{
  "id": "resume/section-heading",
  "type": "text",
  "options": {
    "label": "Heading",
    "placeholder": "e.g. “Experiences” ",
    "description": "Main résumé section",
  }
}

{
  "id": "resume/experience-items",
  "type": "collection",
  "options": {
    "label": "Jobs",
    "min-items": 1,
    "uses": ["resume/job"]
  }
}

{
  "id": "resume/job",
  "type": "group",
  "options": {
    "fields": ["resume/job-id", "resume/job-title"]
  }
}

{
  "id": "resume/job-id",
  "type": "id",
  "options": {
    "label": false,
  }
}

{
  "id": "resume/job-title",
  "type": "text",
  "options": {
    "label": "Title",
    "max-length": 50
  }
}

```

Could make use of namespacing? That's a bit confusing, though.
What's the goal again?

- It's building a UI from a schema. Right... Really though?
- Can't it be modular functions in JS, to build each template, instead of JSON?
- And submitting the form *THEN* builds a JSON?... along with a schema? haha no.
- Just the JSON we need, which is the `resume.json` one.
- so... modular functions, build the UI, and we're good? HOLD UP!
  - those JSON bits are basically the arguments to a function `renderField`
  - or a.. you know, the props passed to a React component or whatever
- the JSON must be tightly formatted... so it should also be generated, itself?
  - which is why Advanced Custom Field also has a UI to generate the UI that generates the data... it's turtles all the way down

- The goal is what, again? ughhhhhh
- for a **component** which needs **data**, provide an **editing interface**
  - so, I need a set of **UI building tools**, with which I can build a UI for a given component
  - each component being responsible for building its own UI editing screen
  - with **should output a well-formatted JSON**
  - but the format of that JSON is up to the component itself, so it's all self-contained

- then, if this whole thing works okay, I'll think about **interoperability**
- sounds good?

Write this interface in VueJS? React? Something else?

Just did a quick test of Formik for React. So...

- build the UI with Formik, any way you want?
- send the data to the JSONATOR
- and write out the data as JSON, that's it? we won?!
- hold up...

`4:04pm:`

- the point of using Formik is... simplicity? I don't know dude...

1. add a module
2. what's a module?
  - meh...