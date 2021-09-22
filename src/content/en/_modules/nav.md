---
title: Navigation
type: module

data:
  main:
    - id: "blog"
      href: "/blog"
      label: "blog"

    - id: "help"
      href: "/help"
      label: "help"
      attr:
        - data-component: emit
        - data-event: SHOW_BOX_HELP
        - data-transition: none

    - id: "about"
      href: "/about"
      label: "about"

  footer:
    - id: "rss"
      href: "/rss.xml"
      label: "rss"

    - id: "contact"
      href: "mailto:hello@fredmercy.ca"
      label: "contact"
      attr:
        - target: "_blank"

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
---
