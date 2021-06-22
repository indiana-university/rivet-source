# Checkbox
Checkboxes allow users to select one or more options from a list of choices.

## Example markup
```html
<fieldset class="rvt-fieldset">
  <legend class="rvt-sr-only">Checkbox list</legend>
  <ul class="rvt-plain-list rvt-width-xl">
    <li>
      <span class="rvt-checkbox">
        <input class="rvt-checkbox__input" type="checkbox" name="checkbox-demo" id="checkbox-1">
        <!--
          Can work with hidden input elements that some framework template languages generate
        -->
        <input type="hidden">
        <label for="checkbox-1">Option one</label>
      </span>
    </li>
    <li>
      <span class="rvt-checkbox">
        <input type="checkbox" name="checkbox-demo" id="indeterminate">
        <label for="indeterminate">Option two</label>
      </span>
    </li>
    <li>
      <span class="rvt-checkbox">
        <input type="checkbox" name="checkbox-demo" id="checkbox-3" disabled>
        <label for="checkbox-3">Option three</label>
      </span>
    </li>
    <li>
      <span class="rvt-checkbox">
        <input type="checkbox" name="checkbox-demo" id="checkbox-4" disabled checked>
        <label for="checkbox-4">Option four</label>
      </span>
    </li>
    <li>
      <span class="rvt-checkbox">
        <input aria-describedby="checkbox-description" type="checkbox" name="checkbox-demo" id="checkbox-long">
        <label for="checkbox-long">Just a quick note</label>
        <div id="checkbox-description" class="rvt-checkbox__description">This checkbox has a really long label that can wrap on to two lines and still have nice left alignment.</div>
      </span>
    </li>
    <li>
      <span class="rvt-checkbox rvt-checkbox--sr-only-label">
        <input type="checkbox" name="checkbox-demo" id="checkbox-hidden-label">
        <label for="checkbox-hidden-label">This label text is visually hidden</label>
      </span>
    </li>
  </ul>
</fieldset>
```

## Visually-hidden label modifier
To visually hide the label of a checkbox, but still make it accessible to screen readers, use the `rvt-checkbox--sr-only-label` modifier on the `rvt-checkbox` wrapper element.

The markup in this example will visually hide the label element leaving only the checkbox element visible. This can be useful in situations such as when checkboxes are used to select entire rows of data from a table.

```html
<span class="rvt-checkbox rvt-checkbox--sr-only-label">
  <input type="checkbox" name="checkbox-demo" id="checkbox-hidden-label">
  <label for="checkbox-hidden-label">This label text is visually hidden</label>
</span>
```

## Description Element
In some cases it can be helpful to provide additional more detailed information about the functionality of a checkbox in addition to the the text inside the `<label>` element. In these instances you can use the `.rvt-checkbox__description` element to provide more context to a user.

1. Add an `aria-describedby` attribute with a unique value to the checkbox input
1. Add a `<div class="rvt-checkbox__description"></div>` element after the <label> element as direct child of the `<span class="rvt-checkbox">` element.
1. Add an `id` attribute to the description element that matches the `aria-describedby` attribute added in step 1.

### Description Element Example
```html
<span class="rvt-checkbox">
  <input aria-describedby="checkbox-description" type="checkbox" name="checkbox-demo" id="checkbox-long">
  <label for="checkbox-long">Just a quick note</label>
  <div id="checkbox-description" class="rvt-checkbox__description">This checkbox has a really long label that can wrap on to two lines and still have nice left alignment.</div>
</span>
```
