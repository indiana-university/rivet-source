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

### Box rows

The `rvt-box__row` class adds a small amount of padding and a subtle top border. This works particularly well for displaying lists of content within a Box.

#### Box rows with a list

In the following example, we're using Rivet's plain list utility class along with the `rvt-box__row` class to style the list items.

```
<div class="rvt-box">
  <ul class="rvt-plain-list">
    <li class="rvt-box__row">
      <a href="#" class="rvt-link-bold">A link in a row</a>
    </li>
    <li class="rvt-box__row rvt-box__row--selected">
      Some text in a row
    </li>
    <li class="rvt-box__row">
      Some text in a row
    </li>
  </ul>
</div>
```

#### Box rows with generic elements

Box rows can also be created using `div` elements if lists do not make sense semantically.

```
<div class="rvt-box">
  <div>
    <div class="rvt-box__row">
      Plain box row one
    </div>
    <div class="rvt-box__row">
      Plain box row two
    </div>
    <div class="rvt-box__row">
      Plain box row three
    </div>
  </div>
</div>
```

> **Box rows must be wrapped in a parent element**

> To ensure correct styling, a series of box rows must be wrapped in a parent element, such as a ul or div. Do not wrap box rows in an element with the .rvt-box__body class applied, as the extra padding will prevent the rows from filling the full width of the box.