# Table

Tables are used to display tabular data in rows and columns.

## When to use

If you’re wrangling a lot of data, tables can help you visualize that content. They’re much easier to scan than long paragraphs cluttered with numbers or dates.

## When to use something else

Do **not** use tables to structure webpages. The Rivet grid is a great alternative to this.

If your data only has two dimensions, consider using a definition list as an alternative.

## Responsive table wrapper
To add low-tech responsive behavior to tables so that they are horizontally scrollable on small screens you can wrap your table in an element with the class of `.rvt-table-responsive`. See requirements below.

### Requirements for responsive tables

1. Add wrapper element with `.rvt-table-responsive` CSS class.
1. Add a `role="region"` attribute
1. Make the table wrapper focusable by adding a `tabindex="0"` attribute
1. Associate an `aria-labelledby` attribute with the `id` on the table `<caption>` element

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

### Implementation notes

- Keep labels short. For best scannability, use just two to three words.
- Limit the data or information in each cell. Make repetitive information, like the properties of the data, part of the label.
- Sort the information or data logically, using alphabetical or numerical order.
