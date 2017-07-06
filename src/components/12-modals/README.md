# Modals

A modal is a smaller window that is displayed on top of the main application/site window. The main page is still visible; however, the background is darkened to direct focus to the content of the modal window.

## Usability notes

Modals are helpful when you need to create a focused space for a user to complete a small subtask without taking them out of context of the main application page.

### When to use

- For single specific tasks related to a goal on the main page of the application
- To help users determine information needed in their main workflow e.g. calculating a number, looking up a code

### When to consider something else

- When you need to display an error message consider using an [alert](link-to-alerts) on the page in which the error occurred.
- When you need to display large amounts of information for multiple tasks consider using a dedicated page instead.

## Implementation notes

The modal component is made up of the following elements:

- `.modal__header` — A header with a title that is used to label the modal
- `.modal__body` — A modal body that holds the main content of the modal
- `.modal__controls` — An option footer element that holds modal controls, like "OK", "Save", and "Cancel"
- `.modal__close` — An optional close button

### Required elements

The only elements required in order for the modal to work is the `.modal__body`, but it is advisable to use the `.modal__header` element to help describe what the modal is use for. Likewise, the `.modal__controls` element provides an easy way to add additional actions to the modal like "Save" and "Close".

### Modals vs. dialogs

We use the generic term "Modal" to mean any smaller window that is displayed on top of the main application.
