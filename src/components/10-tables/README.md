# Tables
Tables are used to display tabular data in rows and columns.

## Usability notes

### When to use
Tables are great for displaying tabular data including statistical information.

### When to consider something else
When the content you are displaying has only two dimensions, for instance a list of terms and definitions, consider using a [definition list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl).

## Microcopy notes
- Keep labels short. For best scannability, use just two to three words.
- Limit the data or information in each cell. Make repetitive information, like the properties of the data, part of the label.
- Sort the information or data logically, using alphabetical or numerical order

## Accessibility notes
- Use a `<caption>` tag inside of the `<table>` body when you need to add a title to a table.
- When using multiple levels of headers (`<th>`) in a table each header cell should also have a `scope="col"` or `scope="row"` attribute.
