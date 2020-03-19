# Timeline

Show users chronologically ordered information

## When to use

The timeline component should be used to structure chronologically relevant information in a visually meaningful way, such as displaying a series of time-related events/activities that require further explanation.

## When to use something else

If you are attempting to visualize for users where they are in a process, use the Step Indicator.

When the information you convey is just as informative through the use of text, use ordered or unordered lists

## Adding the markup

The timeline component consists of a wrapper `div` with the class `rvt-timeline`, which encloses individual `div` elements with the class `rvt-timeline__item`.

```
<div class="rvt-timeline">
  <div class="rvt-timeline__item">
  </div>
  <div class="rvt-timeline__item">
  </div>
</div>
```

Each `rvt-timeline__item` represents an individual item on the timeline. Within each item is a `div` with the class `rvt-timeline__marker`, and a `div` with the class `rvt-timeline__content`.

```
<div class="rvt-timeline">
  <div class="rvt-timeline__item">
    <div class="rvt-timeline__marker" aria-hidden="true"></div>
    <div class="rvt-timeline__content"></div>
  </div>
</div>
```

The content `div` contains `heading` element with the name of the event or activity, a `span` element with the date, season, or other temporal label, and a `p` tag with any additional information about the item. Please note that the `heading` level should be appropriate to the context in which the timeline appears.

```
<div class="rvt-timeline">
  <div class="rvt-timeline__item">
    <div class="rvt-timeline__marker" aria-hidden="true"></div>
    <div class="rvt-timeline__content">
      <h3 class="rvt-timeline__heading">Sample Item 1</h3>
      <span class="rvt-timeline__date">Summer 2019</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in nulla ante. Suspendisse potenti.</p>
    </div>
  </div>
</div>
```

## Additional options

### Right-aligned

By default, the timeline aligns to the left-side of the screen with items appearing to its right. You can adjust the functionality so that the timeline aligns to the right-side of the screen with items on its left by adding the modifier class `rvt-timeline--right`.

```
<div class="rvt-timeline rvt-timeline--right">
  <div class="rvt-timeline__item">
    <div class="rvt-timeline__marker" aria-hidden="true"></div>
    <div class="rvt-timeline__content">
      <h3 class="rvt-timeline__heading">Sample Item 1</h3>
      <span class="rvt-timeline__date">Summer 2019</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in nulla ante. Suspendisse potenti.</p>
    </div>
  </div>
</div>
```

### Centered

You can adjust the functionality of the timeline so that the timeline itself appears in the middle of the screen by adding the modifier class `rvt-timeline--center`. Centered timeline items default to appearing on the left-side of the line. To switch an item to appearing on the right, add the `rvt-timeline__item--right` modifier class.

```
<div class="rvt-timeline rvt-timeline--center">
  <div class="rvt-timeline__row">
    <div class="rvt-timeline__item rvt-timeline__item--right">
      <div class="rvt-timeline__marker" aria-hidden="true"></div>
      <div class="rvt-timeline__content">
        <h3 class="rvt-timeline__heading">Sample Item 1</h3>
        <span class="rvt-timeline__date">Summer 2019</span>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in nulla ante. Suspendisse potenti.</p>
      </div>
    </div>
  </div>
</div>
```

### External date labels

The `rvt-timeline__date--label` class can be added to labels to make them appear on the opposite side of the timeline from the main pieces of content. This only works for certain screen sizes, but is compatible with all three alignment options.

The external labels are set to a width of `10rem` in order to create a uniform appearance. To adjust this, use Rivet width utility classes on the `span` with the `rvt-timeline__date--label` class.

```
<div class="rvt-timeline">
  <div class="rvt-timeline__item">
    <div class="rvt-timeline__marker" aria-hidden="true"></div>
    <div class="rvt-timeline__content">
      <h3 class="rvt-timeline__heading">Sample Item 1</h3>
      <span class="rvt-timeline__date rvt-timeline__date--label">Summer 2019</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in nulla ante. Suspendisse potenti.</p>
    </div>
  </div>
</div>
```

## Implementation notes

- Keep date labels short (a date, season, year, or other temporal descriptions)
