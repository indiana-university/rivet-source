# Modal

A modal is a small window that is displayed on top of the main application/site window. The main page is still visible, but the background is darkened to direct focus to the content of the modal window.

## When to use

Modals are useful for allowing users to handle small tasks related to an overarching workflow or goal. This could include:

- Updating personal information as part of a larger process
- Determining information needed in their main workflow e.g. calculating a number, looking up a code

## When to use something else

Please consider using the alert component if you are in need of a way to display an error message. The modal component should not be used solely for this purpose.

If you need to display large amounts of information for multiple tasks consider using a dedicated page instead.

Overlays for signing users up for an email newsletter are not considered a good use of the modal.

## Adding the markup

```
<button type="button" data-rvt-modal-trigger="modal-example-basic">Open modal</div>

<div class="rvt-modal" id="modal-example-basic" role="dialog" tabindex="-1" hidden aria-labelledby="modal-example-title" data-rvt-modal="modal-example-basic">
  <div class="rvt-modal__inner" data-rvt-modal-inner>
    <header class="rvt-modal__header">
       <h1 class="rvt-modal__title" id="modal-example-title">Modal title</h1>
    </header>
    <div class="rvt-modal__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
    <div class="rvt-modal__controls">
      <button type="button" class="rvt-button" role="button">
        <span>OK</span>
      </button>
      <button type="button" class="rvt-button" data-rvt-modal-close="modal-example-basic" role="button">
        <span>Cancel</span>
      </button>
    </div>
  </div>
</div>
```

## Initialization

In order to initialize the modal, you will need to create a new instance of it, and pass it the element you wish to instantiate as a modal.

```
const modalElement = document.querySelector('[data-rvt-modal="your-data-rvt-modal-value"]');
document.newModal = new Rivet.Modal(modalElement);
```

## Options

The modal component has two options that can be passed in on initialization - openOnInit and dialog.

### openOnInit

This option is intended to allow your modal to open on page load. Pass in the `openOnInit` option set to `true` when you instantiate the modal to enable this.

```
const newModal = new Rivet.Modal(modalElement, {
  openOnInit: true
});
```

### dialog

A modal dialog is similar to a regular modal except that it requires the user to interact with it before continuing any interaction with the main application. The user must select from the available actions in the dialog—they cannot disregard and simply close the window.

Pass in the `dialog` option set to `true` when you instantiate the modal to enable this.

```
const newModal = new Rivet.Modal(modalElement, {
  dialog: true
});
```

## JavaScript API

If you use the appropriate data attribute/id combination in your markup, modals will work without the need for any additional JavaScript. But if you need to control the modal programmatically, there are a handful of methods from the Rivet modal’s API you can use:

| Method           | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| .close(callback) | `callback` - An optional callback function that is executed after the modal is opened. |
| .destroy()       | Removes all built-in event listeners from the modal                                    |
| .init()          | Adds the built-in event listeners to the modal                                         |
| .open(callback)  | `callback` - An optional callback function that is executed after the modal is opened. |

## Custom events

| Event            | Description                                                                                                                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rvt:modalOpen`  | Emitted when the modal is opened (using the Modal.open() method, or the data-rvt-modal-trigger attribute). The value of the modal id attribute is also passed along via the custom event’s detail property and is available to use in your scripts as event.detail.id()  |
| `rvt:modalClose` | Emitted when the modal is closed (using the Modal.close() method, or the data-rvt-modal-trigger attribute). The value of the modal id attribute is also passed along via the custom event’s detail property and is available to use in your scripts as event.detail.id() |

## Accessibility (a11y) requirements

The Rivet modal is built to follow the WAI-ARIA authoring standards. It is marked up with the appropriate ARIA attributes and uses the JavaScript included in `rivet.js` to implement the keyboard navigation and focus management required to meet the [ARIA Authoring Practices standards](http://w3c.github.io/aria-practices/). If you need to create the modal functionality in another framework/library like React, Angular, etc., please ensure that it meets the following accessibility requirements.

### Focus

✅ When `tab` and `shift + tab` are pressed, focus should remain within the modal.

### Labeling

✅ The element that serves as the modal container has a role of `dialog`.

✅ All elements required to operate the modal are descendants of the element that has role `dialog`.

🚫 **The modal container element has `aria-modal` set to `true`.**

✅ A value set for the `aria-labelledby` property that refers to a visible modal title.

### Keyboard navigation

✅ `tab`: Moves focus to next tabbable element inside the modal. If focus is on the last tabbable element inside the modal, moves focus to the first tabbable element inside the modal.

✅ `shift + tab`: Moves focus to the previous tabbable element inside the modal. If focus is on the first tabbable element inside the modal, moves focus to the last tabbable element inside the modal.

✅ `escape`: Closes the modal.
