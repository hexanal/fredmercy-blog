[3.0.4] - 2021-06-08
Added
    Entry for June 5
    "published" adapter for Zorg (to be able to "unpublish" stuff)
Removed
    Writing section
    Now page
    Some stuff

[3.0.3] - 2021-05-24
Added
    Entry for May 24
Fixed
    font-display property in CSS

[3.0.2] - 2021-05-10
Changed
    Minor change on homepage
    Color and symbol that indicate the post the user is coming from (when using breadcrumbs from a post)
    Merge latest-post component into a general-purpose "post-shortcut" component
Fixed
    Bumped version for sanitize-html

[3.0.1] - 2021-04-29
Fixed
    Issue with box component

[3.0.0] - 2021-04-29
Added
    Headers to opt-out of this FloC thing by Google
Changed
    Big refactoring of the way Zorg handles website building
    Zorg's content items are now just an array
    Zorg's content "adapters" now need to test the item's type before processing
    Removed comments everywhere (it'll have to wait for another implementation)
    Removed dependencies on `lodash.debounce` and `lodash.throttle`
Fixed
    A few things ;)

[2.0.0] - 2021-04-24
Added
    Entry for April 23, 2021
Changed
    Theme's JS is now all native "js modules" and it's cool
    Removed all dependencies, vendored-in the lodash micro-libs
    Using "tagged" instead of "tags" in frontmatter for posts
    Removed "bleeps" component
Fixed
    a bunch of stuff

[1.2.2] - 2021-04-22
Added
    Entry for April 22, 2021
    Indicate the "d" shortcut for discussion in help
Changed
    Homepage description now longer... maybe it'll help with SEO
    Added and deleted themes: "frost" is replaced by new theme "june (by night)", tweaked colors for "minimal-dark"
    Replace text input with textbox in comments + add send button
    About pages (en/fr)
    Added Gemini item to "now" page
    Added back the "discuss" button in post navigation
Fixed
    Only show "history" link when file was edited

[1.2.1] - 2021-04-20
Added
    This changelog :)
Changed
    A bunch of CSS for comments
    New style list items
    Ramblings -> Writings
    New entry edits
    Updated Zorg to reduce number of single-use "utilities", pffsshyeah
Fixed
    Home btn URL
