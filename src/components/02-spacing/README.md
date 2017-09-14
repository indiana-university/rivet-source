# Spacing

To maintain consistent spacing between components and to help create a sense of vertical rhythm, we have created a spacing system based on .5rem (8px) unit. Margins and padding can be applied using a set of CSS utility classes to add or remove margin and padding from any element.

## Implementation

The CSS classes for the spacing system use the following conventions:

- `m`, `p` = margin, padding
- `top`, `right`, `bottom`, `left` = the top, right, bottom, left side of the element
- `xs` = Extra Small (8px/.5rem)
- `sm` = Small (16px/1rem)
- `md` = Medium (24px/1.5rem)
- `lg` = Large (32px/2rem)
- `xl` = Extra large (40px/2.5rem)
- `xxl` = Extra extra large (48px/3rem)

So the class `.m-top-sm` would add 16px/1rem of margin on all screen sizes to the top of the element it was applied to.

### Responsive spacing

Each spacing utility class also comes with a set of modifiers that allow you to adjust spacing at different screen sizes. Take the following `div`

```html
<div class="p-bottom-sm p-bottom-lg-md-up">
    ...
</div>
```

With these spacing classes applied, it would have 16px/1rem of bottom padding at all screen sizes and 32px/2rem of bottom padding on large screens (940px wide) and up.

### Spacing modifiers

All spacing utilities described above have the following responsive modifiers available to them:

- `-sm-up` - screens **480–740px** and wider
- `-md-up` - screens **740–1080px** and wider
- `-lg-up` - screens **1080–1260px** and wider
- `-xl-up` - screens **1260–1400px** and wider
- `-xxl-up` - screens **1400px** and wider

### All spacing
Using the size conventions above you could apply the class `.p-all-xl` to add an Extra large amount (40px/2.5rem) to both the top and bottom of an element.

### No spacing
If you want to get crazy and remove all margin or padding from and element you could use the class `.m-all-remove`, or `.p-all-remove`.
