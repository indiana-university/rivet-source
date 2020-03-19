# Textarea

A multiline text input field that allows users to enter various types of data into web-based forms

## When to use

Use textareas for input fields that require multiple sentences or lines. This can include items such as:

- Descriptions
- Issues
- Proposals

## When to use something else

If the input field requires only one line, a text input is more appropriate.

## Adding the markup

```
<label for="demo-3" class="rvt-label">Textarea</label>
<textarea id="demo-3" class="rvt-textarea"></textarea>
```

## Inline validation

Rivet provides the markup and styles for various states of inline form validation. These inline validation states should be used in combination with alerts to provide helpful validation error messages to users.

## Accessibility notes

- Every text input must have a `<label>` element associated with it. Placeholder (`placeholder=`) text is not a substitute for using a label element and most browsers render placeholder text at inaccessible contrast ratios.

- If you need to visually hide a label use the Rivet screen reader only utility class. That way the label text will still be accessible to screenreaders.

- Avoid labeling textareas implicitly i.e. wrapping with label. Assistive technologies understand explicitly labeled (matching for and id) attributes elements better.
