# Text input

Text inputs are the basic building blocks of forms. They allow users to enter various types of data into web-based forms.

## When to use

Use text inputs for information that is limited to a single line. This can include:

- Name
- Phone number
- City

## When to use something else

If the information you require includes multiple sentences or lines, a textarea is more appropriate.

## Adding the markup

```
<label for="demo-1" class="rvt-label">Text input</label>
<input type="text" id="demo-1" class="rvt-text-input"></input>
```

## Inline validation

Rivet provides the markup and styles for various states of inline form validation. These inline validation states should be used in combination with alerts to provide helpful validation error messages to users.

## Accessibility notes

- Every text input must have a `<label>` element associated with it. Placeholder (`placeholder=`) text is not a substitute for using a label element and most browsers render placeholder text at inaccessible contrast ratios.

- If you need to visually hide a label use the Rivet screen reader only utility class. That way the label text will still be accessible to screenreaders.

- Avoid labeling text inputs implicitly i.e. wrapping with label. Assistive technologies understand explicitly labeled (matching for and id) attributes elements better.
