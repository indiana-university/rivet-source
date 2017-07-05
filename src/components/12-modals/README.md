# Modals

A modal is a smaller window that is displayed on top of the main application/site window. The main page is still visible; however, the background is darkened to direct focus to the content of the modal window.

## Implementation notes

The modal component is made up of the following elements:

- `.modal__header` — A header with a title that is used to label the modal
- `.modal__body` — A modal body that holds the main content of the modal
- `.modal__controls` — An option footer element that holds modal controls, like "OK", "Save", and "Cancel"
- `.modal__close` — An optional close button

The only elements required in order for the modal to work is the `.modal__body`, but it is advisable to use the `.modal__header` element to help describe what the modal is use for. Likewise, the `.modal__controls` element provides an easy way to add additional actions to the modal like "Save" and "Close".
