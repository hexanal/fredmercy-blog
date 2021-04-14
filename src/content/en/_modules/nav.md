---
title: Navigation
type: module

# test
schema:
  main:
    - id: string
      href: string
      label: string
  footer:
    - id: string
      href: string
      label: string

data:
  main:
    - id: "blog"
      href: "/blog"
      label: "blog"

    - id: "now"
      href: "/now"
      label: "now"

    - id: "ramblings"
      href: "/ramblings"
      label: "ramblings"

    - id: "about"
      href: "/about"
      label: "about"

  footer:
    - id: "rss"
      href: "/rss.xml"
      label: "rss"

    - id: "github"
      href: "https://github.com/hexanal"
      label: "github"
      attr:
        - target: "_blank"

    - id: "twitter"
      href: "https://twitter.com/hexanal"
      label: "twitter"
      attr:
        - target: "_blank"

    - id: "bandcamp"
      href: "https://fredmercy.bandcamp.com"
      label: "bandcamp"
      attr:
        - target: "_blank"

    - id: "email"
      href: "mailto:hello@fredmercy.ca"
      label: "email"
      attr:
        - target: "_blank"
---
