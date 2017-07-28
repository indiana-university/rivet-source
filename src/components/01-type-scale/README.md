# Typography

Typography is the core component of any interface. [Design System] uses a defined [Major Second](http://type-scale.com/?size=16&scale=1.125&text=A%20Visual%20Type%20Scale&webfont=Libre+Baskerville&font-family=%27Libre%20Baskerville%27,%20serif&font-weight=400&font-family-headers=&font-weight-headers=inherit&background-color=white&font-color=#333) type scale that has been rounded to the nearest whole pixel value. Using sizes from this scale will help create a hierarchy and consistency throughout your application.

## Typeface

Benton Sans is an official IU font and is available for free to all IU schools, departments, offices, and affiliated units.

## Font weight

Font weight can be used to emphasize different parts of your interface and help enforce visual hierarchy. [Design System] uses Benton Sans Regular and Benton Sans Bold font weights.

## Implementation notes
Try to keep the number of different font sizes you use in your application to a minimum. The size of fonts depends on the design of you application, but picking a handful of font sizes and sticking to them makes it easier to maintain consistency throughout the interface.

For instance, you might define a limited type scale for you app of:

- `1.8125rem` (29px) for **main headings**
- `1.25rem` (20px) for **subheadings**
- `1rem` (16px) for **interface copy**

### Responsive type scale

Each type scale helper class comes with a set of BEM-style modifiers that allow you adjust font-size at different screen sizes. Here's an example.

```html

<h1 class="ts-20 ts-32--md-up">Profile page</h1>
<p class="ts-14">The profile page is where you can select your personal settings.</p>

```

Given the markup above, the `h1` would have a font size of 1.25rem/20px on all screens small and larger, and 2.25rem/36px on medium screens(740px wide) and larger.

The responsive type scale CSS classes use the following conventions:

- `--sm-up` - screens **480–740px** and wider
- `--md-up` - screens **740–1080px** and wider
- `--lg-up` - screens **1080–1260px** and wider
- `--xl-up` - screens **1260–1400px** and wider
- `--xxl-up` - screens **1400px** and wider
