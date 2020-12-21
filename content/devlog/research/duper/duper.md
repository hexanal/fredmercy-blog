# Duper

- an HTML editor in the browser
- a way to compose pages visually with a more... modular interface?
- a way to think about *components* a different way

## idea pile, number 1

- a *DOM tree* view
  - see what's going on in your page, in terms of HTML tags, HTML "structure"
  - think: "outline" view in VS Code, but with more interactivity (*explained below*)
- a *source code* view
  - that's the actually rendered HTML code
- a *preview* pane
  - takes the HTML output and dunks it into a region of the editor

### DOM tree view

What could it do for us? Those are just ideas to refine as we go:

- build components visually, more simply, intuitively?
- help us follow a given convention for classnames?
- easy to use attribute setter
- built-in `aria-xxx` attribute choose, with help, validation
- built-in snippets for inputs, textareas, etc.?
  - or...
  - allow creation of component templates
  - basically, using tokens/variables for easy page-building
  - the component is RAW html
    - with stuff for the editor to know what to do with it:
    - `data-duper-component-id="some-component-2341"`
  - the static-generation of the page is immediate

What about data? User input? Events? Styling?

Styling is tough; I don't see the appeal of having duper do the HTML building in-browswer, if the CSS isn't also done in-browser?

The idea is: duper is only here to make the HTML building experience better? And outputs... what? HTML? that's it?

Data: is baked in the HTML. What about stuff like... lists?
Maybe a **repeater** helper tool that says: use this HTML for items, and I can add data as I go.
  - If I change the HTML of the item; ask if you want to change it everywhere?
  - if a field "disappears" but data was entered elsewhere?
  - or do *shift + select* to swap the item type?

### It's a component system, but... uh, different?

- let's say instead of HTML it's snippets of components; with only specific things that can be changed
- the admin can go ahead and say:
  - actually, allow for this and that to be editable as well, and then save
  - now the end user can do more things if they want to
  - components with "options":
    - unlock different versions of the same component depending on what you want to do
- wasn't it my idea to use HandlebarsJS components instead?
  - or hyperapp render functions, you know...
- stamp out hyperapp functions

Goes back to my experiment with the JSON builder, actually. It doesn't provide a necessarily better experience.
