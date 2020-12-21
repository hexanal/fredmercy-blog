# Project List

- `website`
  - my own personal website, ideally uses most of the other side projects

- `zorg`
  - codename; that's the static-side generator with JS+CSS minification
    - how to split those two concerns: a part for HTML generation, and a part for CSS/JS bundling?

- `grigri`
  - dead-simple grid building

- `exponent`
  - JS-component system, for old-school server-rendered HTML websites (= no VDOM)
  - bump version, add fun features
  - think about ways to make DX even better?

- `reefer` -> simple `requestAnimationFrame` tool for physics-based animations (spring, gravity?!?!)
  - **work in progress**
  - not sure about the "API", might need something even easier

- `stater` -> reactive state tool
  - **work in progress**
  - API similar to reefer, but not super compatibler
  - *challenge* -> make state and reefer interoperable, and nestable/recursive/composable
    - nest "staters", nest "reefers"
    - a reefer is basically a state that's bound to a raf for it's updating
    - a stater is a piece of state that can fire callbacks when it changes
    - how to intuitively bind the state changes to DOM changes?

- `time-hunter` -> time-tracking tool
  - dead-simple UI
  - add time: a block of time
    - adjust beginning/end
    - define work day hours as "boundaries"
    - "slice" the day up into chunks
    - allow moving, chopping, duplicating tasks

- `hash`
  -> routing with funky hash with "lisp" parens syntax?
  - `/notes#(show-reference 5)`

- The Wordpress *Saturn's Satellites Suite*
  -> this is for projects that force me to work with Wordpress, so I'm trying to improve the dev experience with small tools:
  - `phoebe`: displaying menus
  - `rhea`:  ?
  - `mimas`: handling images (and videos?)
    - responsive, sizes, crops, ratio, alt, etc.
  - `dione`: a thin wrapper around `WP_Query`, to fetch stuff from Wordpress' database super easily, filter the results, etc. etc.
  - `enceladus`: an i18n lib for Wordpress
    - **research needed** -> I don't know how to compete with WPML and others...