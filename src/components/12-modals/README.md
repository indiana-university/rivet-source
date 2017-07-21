# Modals

A modal is a smaller window that is displayed on top of the main application/site window. The main page is still visible; however, the background is darkened to direct focus to the content of the modal window.

## Usability notes

Modals are helpful when you need to create a focused space for a user to complete a small subtask without taking them out of context of the main application page.

### When to use

- For single specific tasks related to a goal on the main page of the application
- To help users determine information needed in their main workflow e.g. calculating a number, looking up a code

### When to consider something else

- When you need to display an error message consider using an [**alert**](link-to-alerts) on the page in which the error occurred.
- When you need to display large amounts of information for multiple tasks consider using a dedicated page instead.

## Implementation notes

The modal component is made up of the following elements:

- `.modal` and `.modal__inner` - An overlay and inner container, which wraps all other elements
- `.modal__header` — A header with a title that is used to label the modal
- `.modal__body` — A modal body that holds the main content of the modal
- `.modal__controls` — An optional footer element that holds modal controls, like "Save" and "Cancel"
- `.modal__close` — An optional close button at the top of the modal

### Required elements

The only elements required in order for the modal to work are the `.modal`, `.modal__inner`, and `.modal__body`, but it is advisable to use the `.modal__header` element to help describe what the modal is use for. Likewise, the `.modal__controls` element provides an easy way to add additional actions to the modal like "Save" and "Close".

### Modal controls

The `.modal__controls` element provides a space to add additional controls like buttons. It is advisable to **stick to one or two buttons** action buttons in a modal. The primary action should **always appear as the left-most button** in the group with secondary actions, like "Cancel" appearing after.

## Accessibility notes

- When a modal is opened the modal itself receives focus, so that screen readers begin at the top of the modal content.
- When the modal is closed the focus should be returned to the button/trigger that was used to open the modal so that keyboard only users and those using assistive technologies do not lose their place in the document.
- A modal should trap focus inside of itself so that when a keyboard-only user navigates from the last focusable element in the modal it returns back to the first focusable element.

### Dialog vs. modal

We use the generic term "Modal" to mean any smaller window that is displayed on top of the main application, but there are some subtle differences between a modal and a dialog. [**See the modal dialog example**](/components/detail/modals--modal-dialog) for more detailed documentation on how to implement a modal dialog.

### Initializing the modal

To use the modal component you'll need to do a few things.

First, add the markup to your document.
```html
<button class="button" data-modal-trigger="my-modal-id">Open the modal</button>

<div class="modal" id="my-modal-id">
    modal markup here...

    <button class="button button--plain modal__close" data-modal-close="close">
        button markup here...
    </button>
</div>
```

In the code above, `my-modal-id` should correspond to the `id` attribute on the the `.modal` container and the `data-modal-trigger` attribute on a `<button>` element that triggers the modal.

The `data-modal-close="close"` attribute is used as a hook to close the modal. You can add the `data-modal-close` attribute to other buttons in the modal like a "**Cancel**" button if you need to allow users other options for closing the modal.

Next, you'll need to **initialize the modal** with JavaScript.

```javascript
Modal.init();
```

Multiple modals can be placed on the same page, as long as each has a unique `id` and coresponding `data-modal-trigger` element. Calling `Modal.init()` will wire up the event listeners for all modals on the page.

### Additional modal methods
The `Modal` component also exposes a couple of handy methods if you need to programmatically open or close your modal.

```javascript
var modalToClose = document.querySelector('#modal-example');

// Will close the `#modal-example` modal
Modal.close(modalToClose);

// Will open the `#modal-example` modal
Modal.open(modalToClose);
```
