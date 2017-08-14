# Tables
Tables are used to display tabular data in rows and columns.

## Usability notes

### When to use
If you’re wrangling a lot of data, tables can help you visualize that content. They’re much easier to scan than long paragraphs cluttered with numbers or dates.

### When to consider something else
- Consider using a [definition list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl) when your data only has two dimensions.
- Don’t use tables to structure web pages

## Microcopy notes
- Keep labels short. For best scannability, use just two to three words.
- Limit the data or information in each cell. Make repetitive information, like the properties of the data, part of the label.
- Sort the information or data logically, using alphabetical or numerical order

## Accessibility notes
- Use a `<caption>` tag inside of the `<table>` body when you need to add a title to a table.
- When using multiple levels of headers (`<th>`) in a table each header cell should also have a `scope="col"` or `scope="row"` attribute.
