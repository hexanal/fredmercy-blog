---
title: Navigation
type: module

data:
  main:
    - id: "blog"
      href: "/blog"
      label: "blog"

    - id: "about"
      href: "/about"
      label: "about"

    - id: "help"
      href: "/help"
      label: "?"
      attr:
        - data-component: emit
        - data-event: SHOW_BOX_HELP
        - data-transition: none
---
