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

## Manual

If manual initialization of Rivet components is preferred, omit the call to `Rivet.init()`.

Instead, you must call component creation methods on DOM elements to initialize them as Rivet components.

### Example JS
```js
// Using the disclosure example HTML from above

const disclosure = Rivet.Disclosure.init('[data-rvt-disclosure="disclosure-1"]');
  
disclosure.open();
```

Note that component creation methods are *not* constructors -- they are static methods. However, they return the component-ized DOM element as a convenience to the client.

## Module

A module bundle is available if you want to `import` the component source files/creation methods a la carte:

`https://unpkg.com/rivet-core@2.0.0-alpha.4/js/rivet-esm.min.js`

```html
<script>
  import { Disclosure } from '/path/to/rivet-esm';
  
  // Initialize all disclosure components including future ones that might be
  // added to the DOM
  
  Disclosure.initAll();
  
  // Or, initialize specific component instances manually
  
  const disclosure = Disclosure.init('[data-rvt-disclosure="disclosure-1"]');
  
  disclosure.open();
</script>
```