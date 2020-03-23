# Box

The box component can be used to help visually group related content

## Adding the markup

The most basic version of the box component is made up of a `div` with the class `rvt-box`. Visually, it includes a subtle rounded border and a white background. Padding and margins should be applied with [Rivet’s spacing utility classes](#).

```
<div class="rvt-box">
  This is basic box
</div>
```

### Box body

Nesting an element with the `rvt-box__body` class inside the box will add equal amounts of padding to each side of the box.

```
<div class="rvt-box">
  <div class="rvt-box__body">
    This is a basic box
  </div>
</div>
```

### Box header and footer

Optional header and footer elements can be nested inside the box to create more complex layouts.

In this example, we are using the `rvt-box__header`, `rvt-box__body`, and `rvt-box__footer` elements to visually group content.

```
<div class="rvt-box">
  <div class="rvt-box__header">
    Header text
  </div>
  <div class="rvt-box__body">
    <p class="rvt-m-all-remove">This is a box with a header, a footer, and some content with <a href="#">a
        link</a>.</p>
  </div>
  <div class="rvt-box__footer rvt-text-right">
    Footer text
  </div>
</div>
```

### Light box

You can remove the subtle gray header and footer background by using the `rvt-box--light` variant. This can be helpful in reducing visual clutter when using multiple box components on the same page.

```
<div class="rvt-box rvt-box--light">
  <div class="rvt-box__header">
    Header text
  </div>
  <div class="rvt-box__body">
    <p class="rvt-m-all-remove">This is a box with a header, a footer, and some content with <a href="#">a
        link</a>.</p>
  </div>
  <div class="rvt-box__footer rvt-text-right">
    Footer text
  </div>
</div>
```
