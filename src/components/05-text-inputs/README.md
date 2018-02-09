# Text inputs

Text inputs are the basic building blocks forms. They allow users to enter various types of data into web-based forms.

## Usability notes

### When to use
Use a text input for information that will only take up one line: a name, phone number, city, etc. Use textareas for information that includes multiple sentences or lines: descriptions, issues, proposals, etc.

### When to consider something else
Don’t ask the user to describe anything in a text input, which can hide text from view if the line is too long.

## Text input microcopy notes
Keep labels clear and concise―around two to three words and never more than eight. But don’t be afraid to be descriptive or use a human voice. “Describe the problem you’re having” is clearer and kinder than “Problem description.”

## Accessibility notes
- Every text input must have a `<label>` element associated with it. Placeholder (`placeholder=`) text is not a substitute for using a label element and most browsers render placeholder text at inaccessible [contrast ratios](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html).
- If you need to visually hide a from label use CSS to [do so in a way](https://www.w3.org/WAI/tutorials/forms/labels/#note-on-hiding-elements) that still makes it accessible to screenreaders.
- Avoid labeling text inputs implicitly i.e. wrapping inputs with label. Assistive technologies understand explicitly labeled (matching `for` and `id`) attributes elements better.

## Inline form validation

Inline alerts provide just-in-time information regarding the state of specific components, like invalid form fields

### When to use

- To highlight fields with errors in forms
- To provide users with form validation messaging

### Implementation

- Write helpful validation alert messages that explain the requirements for the form field(s).
- Show inline validation messages after the user submits the form. For a longer form, highlight each field with a validation error and summarize the errors at the top of the form using a [page-level alert](./alerts--default).

### Inline validation accessibility

- a `role="alert"` attribute should be applied to the `<div class="alert-inline">`, and it should be given a **unique `id` attribute**
- an invalid form element or other interactive component should be given an `aria-invalid="true"` attribute, and an `aria-describedby="alert-id"` attribute which references the above **unique `id` attribute**
- these attributes can be placed on a wrapping `<div role="radiogroup">` or similar element in the case of grouped elements such as radio inputs
- if multiple inline alerts are presented at once, a summary of the errors should be presented in a [page-level alert](./alerts--default) or an [alert list](./alerts--alert-lists)

## Inline validation microcopy

- Alert message should be clear and concise.
- Alert message should be descriptive and should clearly articulate the problem the user has encountered or the information you are trying to convey to the user.
- Alert message should offer next steps where appropriate.

See the [Microcopy section](/docs/microcopy/) for additional information.

Similarly, don’t ask users to copy large amounts of information from a document and paste it into a textarea. If possible, use a file input, and let them upload those documents instead.

## Resources
[Use the copy as a guide, not a crutch](https://www.smashingmagazine.com/2013/06/five-ways-prevent-bad-microcopy/#3-use-copy-as-a-guide-not-a-crutch)
