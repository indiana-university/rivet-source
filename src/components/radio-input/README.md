# Radios

Radios allow users to select a single value out of a set number of choices.

## When to use

Use radio button when you need to present users with a few mutually exclusive choices and they can only select one option.

## When to use something else

When you have a longer list of mutually exclusive options (for example, a list of 50 states), consider using a select input.

## Adding the markup

### Inline

Radio buttons appear within fieldsets. The Rivet inline radio consists of a wrapping `ul` element with the class `rvt-inline-list` and individual `li` elements which wrap the individual radio options. Each radio option is a `<div class="rvt-radio">` element, containing the `input` and `label` elements.

```html
<fieldset>
  <legend class="rvt-sr-only">Radio inline</legend>
  <ul class="rvt-inline-list">
    <li>
      <div class="rvt-radio">
        <input type="radio" name="radio-demo" id="radio-1">
        <label for="radio-1">Option one</label>
      </div>
    </li>
    <li>
      <div class="rvt-radio">
        <input type="radio" name="radio-demo" id="radio-2">
        <label for="radio-2">Option two</label>
      </div>
    </li>
  </ul>
</fieldset>
```

### List

The Rivet radio list is nearly identical to the Rivet inline radio, with the exception that the `ul` element receives the `rvt-plain-list` class instead.

```html
<fieldset>
  <legend class="rvt-sr-only">Radio list</legend>
  <ul class="rvt-plain-list">
    <li>
      <div class="rvt-radio">
        <input type="radio" name="radio-demo" id="radio-1">
        <label for="radio-1">Option one</label>
      </div>
    </li>
    <li>
      <div class="rvt-radio">
        <input type="radio" name="radio-demo" id="radio-2">
        <label for="radio-2">Option two</label>
      </div>
    </li>
  </ul>
</fieldset>
```

### Hidden fields

Hidden inputs (as some frameworks require) can be included in the radio components without any further adjustment.

```html
<fieldset>
  <legend class="rvt-sr-only">Radio list with hidden inputs</legend>
  <ul class="rvt-plain-list">
    <li>
      <div class="rvt-radio">
        <input type="radio" name="radio-demo" id="radio-1">
        <input type="hidden">
        <label for="radio-1">Option one</label>
      </div>
    </li>
    <li>
      <div class="rvt-radio">
        <input type="radio" name="radio-demo" id="radio-2">
        <input type="hidden">
        <label for="radio-2">Option two</label>
      </div>
    </li>
  </ul>
</fieldset>
```

## Visually-hidden label modifier

To visually hide the label of a radio, but still make it accessible to screen readers, use the `rvt-radio--sr-only-label` modifier on the `rvt-radio` wrapper element.

The markup in this example will visually hide the label element, leaving only the radio element visible. This can be useful in situations such as when radios are used to select individual rows of data from a table.

```html
<div class="rvt-radio rvt-radio--sr-only-label">
  <input type="radio" name="radio-demo" id="radio-hidden-label">
  <label for="radio-hidden-label">This label text is visually hidden</label>
</div>
```

## Description element

In some cases it can be helpful to provide more detailed information about a radio option in addition to the the text inside the `<label>` element. In these instances you can use the `.rvt-radio__description` element to provide more context to a user.

1. Add a `<div class="rvt-radio__description" id="radio-description"></div>` element as a direct child of the `<div class="rvt-radio">` element, placed after the `<label>` element. Make the id unique for the document.
2. Add an `aria-describedby` attribute to the radio `<input>`, referencing the `id` attribute of the description element.

```html
<div class="rvt-radio">
  <input aria-describedby="radio-description" type="radio" name="radio-demo" id="radio-long">
  <label for="radio-long">Just a quick note</label>
  <div id="radio-description" class="rvt-radio__description">This radio has a really long label that can wrap on to two lines and still have nice left alignment.</div>
</div>
```

## Implementation notes

### Labels

- Write the label as a phrase, not as a sentence, and use no ending punctuation
- Use parallel phrasing between related radio inputs, and try to keep the length about the same for all labels
- Focus the label text on the differences among the options. If all the options have the same introductory text, move that text to the group label.
- Describe just the option with the label. Keep labels brief so it’s easy to refer to them in messages and documentation. If the option requires further explanation, provide the explanation in a static text control using complete sentences and ending punctuation.
- Use sentence-style capitalization

#### Group labels

- Use the group label to explain the purpose of the group, not how to make the selection. Assume that users know how to use radio buttons.
- All radio button groups need labels. Write the label as a word or phrase, not as a sentence, ending with a colon using static text or a <legend>, when using a fieldset to group radios.

## Resources

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Mozilla Developer Network Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)
- [MSDN Design Documentation](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742436.aspx)
