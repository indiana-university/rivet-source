# Text inputs and textarea

Text inputs are the basic building blocks forms. They allow users to enter various types of data into web-based forms.

## Accessibility notes
- Every text input must have a `<label>` element associated with it. Placeholder (`placeholder=`) text is not a substitute for using a label element and most browsers render placeholder text at inaccessible [contrast ratios](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html).
- If you need to visually hide a from label use CSS to [do so in a way](https://www.w3.org/WAI/tutorials/forms/labels/#note-on-hiding-elements) that still makes it accessible to screenreaders.
- Avoid labeling text inputs implicitly i.e. wrapping inputs with label. Assistive technologies understand explicitly labeled (matching `for` and `id`) attributes elements better.
