# Page-level alerts

Pagel-level alerts are used to display brief important messages to users. They are designed to attract the user’s attention, but not interrupt their work.

## When to use
To notify users about system status including error, warnings, and updates.
To notify users they’ve successfully completed a task
Use along with inline validation alerts to summarize multiple errors on longer forms

## When to use something else
When it’s necessary to interrupt the user’s work flow.
When user input/action is required to continue working
If action taken by the user will result in losing/destroying their work, use a modal dialog that allows the user to confirm the destructive action.

## Accessibility
Alerts should use the `role=”alert”` attribute
Alerts that have a dismiss or close button should use the `role=”alertdialog”` attribute
Use the `aria-labelledby` attribute to link the alert title with the alert element
Dynamically rendered alerts are automatically announced by most screen readers, but it’s important to note that screen readers will not inform users of alerts that are present before a page has finished loading.

## Implementation
Page-level alerts can be used with an optional dismiss button (X icon), however it’s important to avoid allowing users to dismiss alerts that are used to display error messages. Do allow users to dismiss alerts wherever appropriate.
Avoid using error messages that automatically disappear. If a user doesn’t have time to read the error message they may not know how to correct the problem once it has been automatically removed.
Write helpful alert messages. For errors, Include a brief description of the problem and how to fix it. Check out the Voice and tone/microcopy section for more information.
