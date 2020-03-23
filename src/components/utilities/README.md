# Utilities

Rivet comes with a handful of useful utility classes that make it easy to change display mode, color, text style, and more.

---

# Display

Use Rivet's display utilities to make content containers behave like block or inline elements.

## Using the display property utilities

The Rivet `rvt-display-*` utilities can be used to easily change the css `display:` property. The display utilities included in Rivet are:

```
// Display inline
<div class="rvt-display-inline">Display inline</div>

// Display inline-block
<div class="rvt-display-inline-block">Display inline</div>

// Display block
<span class="rvt-display-block">Display block</span>

// Display flex
<div class="rvt-display-flex">
    <div>Flex child</div>
    <div>Flex child</div>
    <div>Flex child</div>
</div>
```

### Display none

The class `rvt-display-none` can be added to set the `display` of an element to `none`.

<span class="rvt-display-none">Display none</span>

#### Accessibility

Use caution when applying the `rvt-display-none` utility. This utility sets the element to `display: none`, preventing it from being announced by assistive technology. If you want to hide the element visually and make sure it's still announced to screenreaders, then use the `rvt-sr-only` class instead.

### Vertically centered flex children

You can use `.rvt-vertical-center` along with `.rvt-display-flex` to vertically center child elements. This sets the `align-items` property to `center`.

```
// .rvt-vertical-center (only works with .rvt-display-flex)
<div class="rvt-display-flex rvt-vertical-center">
    <div>Flex child</div>
    <div>Flex child</div>
    <div>Flex child</div>
</div>
```

---