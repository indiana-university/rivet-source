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

## Compact box

The compact variant of the box component reduces the amount of padding applied to a box's header, footer, and content. This variant can be useful in situations where you are displaying large amounts of data and need to conserve vertical space.

```
<div class="rvt-box rvt-box--compact">
  <div class="rvt-box__header">
    A box with rows
  </div>
  <ul class="rvt-plain-list">
    <li class="rvt-box__row">
      Some text in a row
    </li>
    <li class="rvt-box__row">
      Some text in a row
    </li>
    <li class="rvt-box__row">
      Some text in a row
    </li>
  </ul>
</div>
```

## Colored box

The box component also supports colored variants based on [Rivet’s alert color naming conventions](#).

The colored box variants should be used sparingly and only to indicate some sort of state (error, warning, success, etc.) or call out important information in your application.

```
<div class="rvt-box rvt-box--danger">
  <div class="rvt-box__header">
    A box with rows
  </div>
  <ul class="rvt-plain-list">
    <li class="rvt-box__row">
      Some text in a row
    </li>
    <li class="rvt-box__row">
      Some text in a row
    </li>
    <li class="rvt-box__row">
      Some text in a row
    </li>
  </ul>
</div>
```

### Colored box row variants

Colors can also be applied to individual rows to call out state changes or important information. The row variant modifier classes add a subtle background color and left border that matches each of Rivet's alert styles.

```
<div class="rvt-box">
  <div class="rvt-box__header">
    A box with rows
  </div>
  <div>
    <div class="rvt-box__row">
      Default row
    </div>
    <div class="rvt-box__row rvt-box__row--info">
      Info row variant
    </div>
    <div class="rvt-box__row rvt-box__row--success">
      Success row variant
    </div>
    <div class="rvt-box__row rvt-box__row--warning">
      Warning row variant
    </div>
    <div class="rvt-box__row rvt-box__row--danger">
      Danger row variant
    </div>
  </div>
</div>
```

## Card variant

The card variant of the box component can be used along with Rivet’s [type scale utilities](#) and [spacing utilities](#) to create basic card layouts. Adding the `rvt-box--card` modifier class adds a subtle shadow to help visually separate the the box content from the background.

```
<div class="rvt-box rvt-box--card">
  <div class="rvt-box__body">
    This is the card variant of a box with a body element
  </div>
</div>
```

### Card image

The card variant can include an optional image. Nesting an `img` inside an element with the `rvt-box__image` class will apply the proper sizing, cropping, and border radius.

**Card images must be the first child**

The element with the `rvt-box__image` class must be the first child of `.rvt-box` so that the image sits flush with the sides of the box (see the example below). It should not be used inside elements with the `rvt-box__body` or `rvt-box__row` classes.

```
<div class="rvt-box rvt-box--card">
  <div class="rvt-box__image">
    <img src="http://www.fillmurray.com/g/800/450" alt="">
  </div>
  <div class="rvt-box__body">
    <h2 class="rvt-ts-20 rvt-text-bold">Card title</h2>
    <p class="rvt-m-top-xxs">This is the card variant of a box with a body element</p>
    <a href="#" class="rvt-link-bold">Card link</a>
  </div>
</div>
```