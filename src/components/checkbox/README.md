# Checkbox

Checkboxes allow users to select one or more options from a list of choices.

## Example markup

```html
<fieldset class="rvt-fieldset">
  <legend class="rvt-sr-only">Checkbox list</legend>
  <ul class="rvt-plain-list rvt-width-xl">
    <li>
      <div class="rvt-checkbox">
        <input type="checkbox" name="checkbox-demo" id="checkbox-1">
        <!--
          Can work with hidden input elements that some framework template languages generate
        -->
        <input type="hidden">
        <label for="checkbox-1">Option one</label>
      </div>
    </li>
    <li>
      <div class="rvt-checkbox">
        <input type="checkbox" name="checkbox-demo" id="indeterminate">
        <label for="indeterminate">Option two</label>
      </div>
    </li>
    <li>
      <div class="rvt-checkbox">
        <input type="checkbox" name="checkbox-demo" id="checkbox-3" disabled>
        <label for="checkbox-3">Option three</label>
      </div>
    </li>
    <li>
      <div class="rvt-checkbox">
        <input type="checkbox" name="checkbox-demo" id="checkbox-4" disabled checked>
        <label for="checkbox-4">Option four</label>
      </div>
    </li>
    <li>
      <div class="rvt-checkbox">
        <input aria-describedby="checkbox-description" type="checkbox" name="checkbox-demo" id="checkbox-long">
        <label for="checkbox-long">Just a quick note</label>
        <div id="checkbox-description" class="rvt-checkbox__description">This checkbox has a really long label that can wrap on to two lines and still have nice left alignment.</div>
      </div>
    </li>
    <li>
      <div class="rvt-checkbox rvt-checkbox--sr-only-label">
        <input type="checkbox" name="checkbox-demo" id="checkbox-hidden-label">
        <label for="checkbox-hidden-label">This label text is visually hidden</label>
      </div>
    </li>
  </ul>
</fieldset>
```

## Visually-hidden label modifier

To visually hide the label of a checkbox, but still make it accessible to screen readers, use the `rvt-checkbox--sr-only-label` modifier on the `rvt-checkbox` wrapper element.

The markup in this example will visually hide the label element, leaving only the checkbox element visible. This can be useful in situations such as when checkboxes are used to select entire rows of data from a table.

```html
<div class="rvt-checkbox rvt-checkbox--sr-only-label">
  <input type="checkbox" name="checkbox-demo" id="checkbox-hidden-label">
  <label for="checkbox-hidden-label">This label text is visually hidden</label>
</div>
```

## Description element

In some cases it can be helpful to provide additional more detailed information about the functionality of a checkbox in addition to the the text inside the `<label>` element. In these instances you can use the `.rvt-checkbox__description` element to provide more context to a user.

1. Add a `<div class="rvt-checkbox__description" id="checkbox-description"></div>` element as a direct child of the `<div class="rvt-checkbox">` element, placed after the `<label>` element. Make the id unique for the document.
2. Add an `aria-describedby` attribute to the checkbox `<input>`, referencing the `id` attribute of the description element.

```html
<div class="rvt-checkbox">
  <input aria-describedby="checkbox-description" type="checkbox" name="checkbox-demo" id="checkbox-long">
  <label for="checkbox-long">Just a quick note</label>
  <div id="checkbox-description" class="rvt-checkbox__description">This checkbox has a really long label that can wrap on to two lines and still have nice left alignment.</div>
</div>
```
