# Input Groups
Use input groups to combine a text input with and action button or dropdown menu.

## Implementation notes
- Form `<label>`s must be outsite of the `.rvt-input-group` container
- Inputs inside an input group need a label. If you don't want them to visually appear in your design use the `.rvt-sr-only` utility class to hide visually, but still make the available to assistive technology like a screen reader.
- The input group `.rvt-input-group__text` elements _are not_ replacements for the standard `<label>` element. They are only meant to help describe certain form inputs.