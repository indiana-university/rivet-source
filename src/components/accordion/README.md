# Accordion

An accordion is a combination of interactive titles and panels, which are stacked vertically.

## Things to consider

Before using the accordion, consider why you wish to use it. If you are using an accordion because your page has a lot of content or you wish to cut down how much a user needs to scroll, please consider reworking your content instead. It may be that your content needs to be divided between multiple pages, or can be edited to remove superfluous text.

## Adding the markup

The accordion component consists of several parts. The first piece is a wrapper `div` with the class `rvt-accordion`. This wrapper encloses each accordion item, which are made of a heading tag with the class `rvt-accordion__summary`, and `div` with the class `rvt-accordion__panel`. The heading contains everything related to an accordion item's label (or the part that is visible when the item is closed). The panel contains everything that becomes visible once an accordion item is opened.

The heading encloses a button with the class `rvt-accordion__toggle`. This button has a `data-accordion-trigger` attribute, which has a value matching the `id` of the relevant panel.

```
<div class="rvt-accordion" data-accordion="test-accordion">
  <h3 class="rvt-accordion__summary">
    <button class="rvt-accordion__toggle" id="test-accordion-1-label" data-accordion-trigger="test-accordion-1">
      <span class="rvt-accordion__toggle-text">Accordion one</span>
      <div class="rvt-accordion__toggle-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g fill="currentColor">
            <path class="rvt-accordion__icon-bar" d="M8,15a1,1,0,0,1-1-1V2A1,1,0,0,1,9,2V14A1,1,0,0,1,8,15Z"/>
            <path d="M14,9H2A1,1,0,0,1,2,7H14a1,1,0,0,1,0,2Z"/>
          </g>
        </svg>
      </div>
    </button>
  </h3>
  <div class="rvt-accordion__panel" id="test-accordion-1" aria-labelledby="test-accordion-1-label" data-accordion-panel="test-accordion-1">
    <p class="rvt-m-all-remove">Nostrum fugit a natus. Corporis voluptates ut odio omnis nobis voluptas. Est dolor et eum quis deleniti explicabo autem est magnam. Unde expedita ab quia maxime quia. Qui voluptas distinctio ipsa laborum laboriosam.</p>
  </div>
  <h3 class="rvt-accordion__summary">
    <button class="rvt-accordion__toggle" id="test-accordion-2-label" data-accordion-trigger="test-accordion-2">
      <span class="rvt-accordion__toggle-text">Accordion two</span>
      <div class="rvt-accordion__toggle-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g fill="currentColor">
            <path class="rvt-accordion__icon-bar" d="M8,15a1,1,0,0,1-1-1V2A1,1,0,0,1,9,2V14A1,1,0,0,1,8,15Z"/>
            <path d="M14,9H2A1,1,0,0,1,2,7H14a1,1,0,0,1,0,2Z"/>
          </g>
        </svg>
      </div>
    </button>
  </h3>
  <div class="rvt-accordion__panel" id="test-accordion-2" aria-labelledby="test-accordion-2-label" data-accordion-panel="test-accordion-2">
    <p class="rvt-m-all-remove">Nostrum fugit a natus. Corporis voluptates ut odio omnis nobis voluptas. Est dolor et eum quis deleniti explicabo autem est magnam. Unde expedita ab quia maxime quia. Qui voluptas distinctio ipsa laborum laboriosam.</p>
  </div>
</div>
```

## Initialization

In order to initialize the accordion, you will need to create a new instance of it, and pass it the element you wish to instantiate as an accordion.

```
const accordionElement = document.querySelector('[data-accordion="your-data-accordion-value"]');
const newAccordion = new Rivet.Accordion(accordionElement);
```

## Options

The accordion component has one option that can be passed in on initialization - openAllOnInit.

### openAllOnInit

This option is intended to allow all accordion panels to load in the open position. Pass in the `openAllOnInit` option set to `true` when you instantiate the accordion to enable this.

```
const newAccordion = new Rivet.Accordion(accordionElement, {
  openAllOnInit: true
});
```

## JavaScript API

If you use the appropriate data attribute/id combination in your markup, accordions will work without the need for any additional JavaScript. But if you need to control the accordion programmatically, there are a handful of methods from the Rivet accordion’s API you can use:

| Method                      | Description                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| .close(accordion, callback) | `accordion` - The element to be activated. `callback` - An optional callback function that is executed after the accordion is closed. |
| .destroy()                  | Removes all built-in event listeners from the accordion.                                                                              |
| .init()                     | Adds the built-in event listeners to the accordion.                                                                                   |
| .open(accordion, callback)  | `accordion` - The element to be activated. `callback` - An optional callback function that is executed after the accordion is opened. |

## Custom events

| Event                 | Description                                                                                                                                                                                                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rvt:accordionOpened` | Emitted when an accordion panel is opened (using the Accordion.open() method, or the data-accordion-trigger attribute). The value of the accordion id attribute is also passed along via the custom event’s detail property and is available to use in your scripts as event.detail.id  |
| `rvt:accordionClosed` | Emitted when an accordion panel is closed (using the Accordion.close() method, or the data-accordion-trigger attribute). The value of the accordion id attribute is also passed along via the custom event’s detail property and is available to use in your scripts as event.detail.id |

## Accessibility (a11y) requirements

The Rivet accordion is built to follow the WAI-ARIA authoring standards. It is marked up with the appropriate ARIA attributes and uses the JavaScript included in `rivet.js` to implement the keyboard navigation and focus management required to meet the [ARIA Authoring Practices standards](http://w3c.github.io/aria-practices/). If you need to create the accordion functionality in another framework/library like React, Angular, etc., please ensure that it meets the following accessibility requirements.

### Labeling

✅ The title of each accordion header is contained in an element with `role` button.

✅ Each accordion header button is wrapped in an element with `role` heading that has a value set for `aria-level` that is appropriate for the information architecture of the page.

✅ If the accordion panel associated with an accordion header is visible, the header button element has `aria-expanded` set to `true`. If the panel is not visible, `aria-expanded` is set to `false`.

✅ The accordion header button element has `aria-controls` set to the `id` of the element containing the accordion panel content.

### Keyboard navigation

✅ `enter` or `space`: When focus is on the accordion header for a collapsed panel, expands the associated panel. When focus is on the accordion header for an expanded panel, collapses the panel if the implementation supports collapsing.

✅ `tab`: Moves focus to the next focusable element; all focusable elements in the accordion are included in the page Tab sequence.

✅ `shift + tab`: Moves focus to the previous focusable element; all focusable elements in the accordion are included in the page Tab sequence.

✅ `down arrow` (Optional): If focus is on an accordion header, moves focus to the next accordion header. If focus is on the last accordion header, either does nothing or moves focus to the first accordion header.

✅ `up arrow` (Optional): If focus is on an accordion header, moves focus to the previous accordion header. If focus is on the first accordion header, either does nothing or moves focus to the last accordion header.

✅ `home` (Optional): When focus is on an accordion header, moves focus to the first accordion header.

✅ `end` (Optional): When focus is on an accordion header, moves focus to the last accordion header.
