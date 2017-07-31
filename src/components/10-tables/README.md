# Tables
Tables are used to display tabular data in rows and columns.

## When to use
Tables are great for displaying tabular data including statistical information.

## When to consider something else
When the content you are displaying has only two dimensions, for instance a list of terms and definitions, consider using a [definition list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl).

## Accessibility
- Use a `<caption>` tag inside of the `<table>` body when you need to add a title to a table.
- When using multiple levels of headers (`<th>`) in a table each header cell should also have a `scope="col"` or `scope="row"` attribute.
