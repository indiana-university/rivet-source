# Table

Tables are used to display tabular data in rows and columns.

## When to use

If you’re wrangling a lot of data, tables can help you visualize that content. They’re much easier to scan than long paragraphs cluttered with numbers or dates.

## When to use something else

Do **not** use tables to structure webpages. The Rivet grid is a great alternative to this.

If your data only has two dimensions, consider using a definition list as an alternative.

## Adding the markup

Default tables in Rivet come with styled headers and bottom borders on row to help with readability.

```
<table>
    <caption class="sr-only">Table example one</caption>
    <thead>
        <tr>
            <th scope="col">Service</th>
            <th scope="col">Description</th>
            <th scope="col">URL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">One.IU</th>
            <td>One.IU was created to bring a modern app store experience to finding what you need at IU. With One.IU, you search for what you want to do, and click to launch it.</td>
            <td><a href="#">one.iu.edu</a></td>
        </tr>
        <tr>
            <th scope="row">Box</th>
            <td>Box is a no-cost cloud storage and collaboration environment available to students, faculty, and staff.</td>
            <td><a href="#">box.iu.edu</a></td>
        </tr>
    </tbody>
</table>
```

### Additional options

#### Striped table

You can use the `rvt-table-stripes` class to alternate light gray backgrounds on table rows for improved scannability.

```
<table class="rvt-table-stripes">
    <caption class="sr-only">Table example one</caption>
    <thead>
        <tr>
            <th scope="col">Service</th>
            <th scope="col">Description</th>
            <th scope="col">URL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">One.IU</th>
            <td>One.IU was created to bring a modern app store experience to finding what you need at IU. With One.IU, you search for what you want to do, and click to launch it.</td>
            <td><a href="#">one.iu.edu</a></td>
        </tr>
        <tr>
            <th scope="row">Box</th>
            <td>Box is a no-cost cloud storage and collaboration environment available to students, faculty, and staff.</td>
            <td><a href="#">box.iu.edu</a></td>
        </tr>
    </tbody>
</table>
```

#### Plain table

The `rvt-table-plain` class will remove all borders and thead formatting on a table.

```
<table class="rvt-table-plain">
    <caption class="sr-only">Table example one</caption>
    <thead>
        <tr>
            <th scope="col">Service</th>
            <th scope="col">Description</th>
            <th scope="col">URL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">One.IU</th>
            <td>One.IU was created to bring a modern app store experience to finding what you need at IU. With One.IU, you search for what you want to do, and click to launch it.</td>
            <td><a href="#">one.iu.edu</a></td>
        </tr>
        <tr>
            <th scope="row">Box</th>
            <td>Box is a no-cost cloud storage and collaboration environment available to students, faculty, and staff.</td>
            <td><a href="#">box.iu.edu</a></td>
        </tr>
    </tbody>
</table>
```

#### Compact table

The `rvt-table-compact` class will decrease the amount of vertical padding applied to each table cell. This variant can be useful in situations where you need to conserve vertical space when displaying large amounts of data.

```
<table class="rvt-table-compact">
    <caption class="sr-only">Table example one</caption>
    <thead>
        <tr>
            <th scope="col">Service</th>
            <th scope="col">Description</th>
            <th scope="col">URL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">One.IU</th>
            <td>One.IU was created to bring a modern app store experience to finding what you need at IU. With One.IU, you search for what you want to do, and click to launch it.</td>
            <td><a href="#">one.iu.edu</a></td>
        </tr>
        <tr>
            <th scope="row">Box</th>
            <td>Box is a no-cost cloud storage and collaboration environment available to students, faculty, and staff.</td>
            <td><a href="#">box.iu.edu</a></td>
        </tr>
    </tbody>
</table>
```

#### Cells table

The `rvt-table-cells` class adds borders to all table cells which can help with vertical and horizontal visual scanning.

```
<table class="rvt-table-cells">
    <caption class="sr-only">Table example one</caption>
    <thead>
        <tr>
            <th scope="col">Service</th>
            <th scope="col">Description</th>
            <th scope="col">URL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">One.IU</th>
            <td>One.IU was created to bring a modern app store experience to finding what you need at IU. With One.IU, you search for what you want to do, and click to launch it.</td>
            <td><a href="#">one.iu.edu</a></td>
        </tr>
        <tr>
            <th scope="row">Box</th>
            <td>Box is a no-cost cloud storage and collaboration environment available to students, faculty, and staff.</td>
            <td><a href="#">box.iu.edu</a></td>
        </tr>
    </tbody>
</table>
```

## Accessibility (a11y) requirements

The Rivet table is built to follow the WAI-ARIA authoring standards. It is marked up with the appropriate ARIA attributes required to meet the [ARIA Authoring Practices standards](http://w3c.github.io/aria-practices/).

### Labeling

✅ The table container has the `role` of table.

✅ Each row container has the `role` of row and is either a DOM descendant of or owned by the `table` element or an element with `role` rowgroup.

✅ Each cell is either a DOM descendant of or owned by a `row` element and has one of the following roles:

- `columnheader` if the cell contains a title or header information for the column.
- `rowheader` if the cell contains title or header information for the row.
- `cell` if the cell does not contain column or row header information.

✅ If there is an element in the user interface that serves as a label for the table, `aria-labelledby` is set on the table element with a value that refers to the labelling element. Otherwise, a label is specified for the table element using `aria-label`.

✅ If the table has a caption or description, `aria-describedby` is set on the table element with a value referring to the element containing the description.

✅ If the table contains sortable columns or rows, `aria-sort` is set to an appropriate value on the header cell element for the sorted column or row as described in the section on grid and table properties.

✅ If the table includes cells that span multiple rows or multiple columns, then `aria-rowspan` or `aria-colspan` is applied.

### Implementation notes

- Keep labels short. For best scannability, use just two to three words.
- Limit the data or information in each cell. Make repetitive information, like the properties of the data, part of the label.
- Sort the information or data logically, using alphabetical or numerical order.
