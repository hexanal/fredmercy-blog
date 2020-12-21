# Eventor

Eventor can send 'signals' to other components.

```html
<button
  type="button"
  class="wow"
  data-component="eventor"
  data-target="some-component:whaddup"
  data-signal="close"
>
  yeah
</button>

<div class="hello" data-component="some-component:whaddup">
  <h2>Hello World</h2>
</div>
<div class="hello" data-component="some-component:yo">
  <h2>Goodbye World</h2>
</div>
```