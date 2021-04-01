---
title: Getting Started
---

Rivet provides three initialization options: **auto**, **manual**, and **module**.

## Auto

Rivet components can be auto-initialized using the `Rivet.init()` method. Components to initialize are identified by Rivet-specific `data` attributes described in the documentation (not HTML elements, IDs, or classes).

### Import CSS
```html
<link rel="https://unpkg.com/rivet-core@2.0.0-alpha.4/css/rivet.min.css">
```

### Import JS and initialize
```html
<script src="https://unpkg.com/rivet-core@2.0.0-alpha.4/js/rivet.min.js"></script>
<script>Rivet.init();</script>
```

Individual components can be fetched using `querySelector()`. Each component type provides a number of methods that can be used to interact programmatically with the component.

### Example HTML
```html
<div data-rvt-disclosure="disclosure-1">
  <button data-rvt-disclosure-toggle>I'll disclose</button>
  <div data-rvt-disclosure-target hidden aria-hidden="true">
    Some more details
  </div>
</div>
```

### Example JS
```js
// After calling Rivet.init()

const disclosure = document.querySelector('[data-rvt-disclosure="disclosure-1"]');
  
disclosure.open();
```

New component instances will be initialized automatically when added to the DOM and cleaned up when removed.