# Pagination

The pagination component is used to break up large sets of data across multiple pages.

## When to use

Pagination is invaluable when a user's action returns a large data set such as search results, or a large number of rows in a data table to break results into multiple pages to help with load times.

## When to use something else

With smaller amounts of data consider displaying the whole data set in one page that users can scroll through instead of breaking it into pages.

## Adding the markup

### Basic pagination

A basic pagination component uses an unordered list wrapped in a nav element to let users move between pages in a set of data. Use basic pagination like the following example when you will only ever have five or fewer pages of data to show.

```
<nav role="navigation" aria-label="Pagination">
  <ul class="rvt-pagination">
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 1">1</a>
    </li>
    <li class="rvt-pagination__item is-active">
      <a href="#" aria-current="true" aria-label="Page 2, current page">2</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 3">3</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 4">4</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 5">5</a>
    </li>
  </ul>
</nav>
```

### Positioning the pagination

The pagination component is left-aligned by default, but you can easily center or right-align it using the `rvt-pagination--center` or `rvt-pagination--right modifier` classes.

```
<nav role="navigation" aria-label="Right-aligned pagination">
  <ul class="rvt-pagination rvt-pagination--right">
    <li class="rvt-pagination__item is-active">
      <a href="#" aria-current="page" aria-label="Page 1, current page">1</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 2">2</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 3">3</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 4">4</a>
    </li>
    <li class="rvt-pagination__item is-disabled">
      <a href="#" class="rvt-flex" tabindex="-1" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g fill="currentColor">
            <circle cx="8" cy="8" r="2"></circle>
            <circle cx="14" cy="8" r="2"></circle>
            <circle cx="2" cy="8" r="2"></circle>
          </g>
        </svg>
      </a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 20, last page">20</a>
    </li>
  </ul>
</nav>
```

### Small pagination

Add the CSS modifier class `rvt-pagination--small` if you need to display the pagination component at a smaller size.

```
<nav role="navigation" aria-label="Small pagination">
  <ul class="rvt-pagination rvt-pagination--small">
    <li class="rvt-pagination__item is-active">
      <a href="#" aria-current="page" aria-label="Page 1, current page">1</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 2">2</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 3">3</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 4">4</a>
    </li>
    <li class="rvt-pagination__item is-disabled">
      <a href="#" class="rvt-flex" tabindex="-1" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g fill="currentColor">
            <circle cx="8" cy="8" r="2"></circle>
            <circle cx="14" cy="8" r="2"></circle>
            <circle cx="2" cy="8" r="2"></circle>
          </g>
        </svg>
      </a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 20, last page">20</a>
    </li>
  </ul>
</nav>
```

### Large data sets

When you need to paginate large sets of data over many pages, use a modified pagination component shown in the following example.

- Use the ellipsis icons to help visually indicate that there are more sets of pages before and/or after the currently displayed set. Note in this example we use the tabindex aria-hidden attributes to remove the ellipsis from the tab order and hide the content from screen readers
- Make the first and last page in the set available so that users can navigate to those pages no matter when group of pages are currently shown.
- Make the first item a link with the text Previous that navigates to the page directly before the current page once a user has navigated through the first set of visible pages
- Make the last item a link with the text Next that navigates to the page directly after the current page once a user has navigated through the first set of visible pages

#### Default state for large data sets

In the default state, the pagination shows the first four pages with a link to the last page. We use an ellipsis icon to visually indicate that the list of pages is truncated and that there are more pages available.

```
<nav role="navigation" aria-label="Large pagination">
  <ul class="rvt-pagination rvt-pagination">
    <li class="rvt-pagination__item is-active">
      <a href="#" aria-current="page" aria-label="Page 1, current page">1</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 2">2</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 3">3</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 4">4</a>
    </li>
    <li class="rvt-pagination__item is-disabled">
      <a href="#" class="rvt-flex" tabindex="-1" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g fill="currentColor">
            <circle cx="8" cy="8" r="2"></circle>
            <circle cx="14" cy="8" r="2"></circle>
            <circle cx="2" cy="8" r="2"></circle>
          </g>
        </svg>
      </a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 20, last page">20</a>
    </li>
  </ul>
</nav>
```

#### Advanced state

This examples shows the pagination component once a user has navigated to a set of pages where the first, last, previous, and next page links are available.

```
<nav role="navigation" aria-label="Advanced pagination">
  <ul class="rvt-pagination">
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Previous page">Previous</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 1">1</a>
    </li>
    <li class="rvt-pagination__item is-disabled">
      <a href="#" class="rvt-flex" tabindex="-1" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g fill="currentColor">
            <circle cx="8" cy="8" r="2"></circle>
            <circle cx="14" cy="8" r="2"></circle>
            <circle cx="2" cy="8" r="2"></circle>
          </g>
        </svg>
      </a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 6">6</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 6">7</a>
    </li>
    <li class="rvt-pagination__item is-active" aria-current="true">
      <a href="#" aria-label="Page 8, current page">8</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 9">9</a>
    </li>
    <li class="rvt-pagination__item is-disabled">
      <a href="#" class="rvt-flex" tabindex="-1" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g fill="currentColor">
            <circle cx="8" cy="8" r="2"></circle>
            <circle cx="14" cy="8" r="2"></circle>
            <circle cx="2" cy="8" r="2"></circle>
          </g>
        </svg>
      </a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Page 20, last page">20</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#" aria-label="Next set of pages">Next</a>
    </li>
  </ul>
</nav>
```

## Accessibility requirements

The pagination component is wrapped in a `nav` element so that it is announced to assistive technologies. Use an `aria-label` attribute to describe the purpose of your pagination. This will help assistive technologies distinguish between navigation sections on pages that use more than one `nav` element.

### Accessible dynamic pagination

This article on [a11ymatters.com](http://a11ymatters.com) has some really good tips on implementing dynamic `aria-label`(s) on pagination items based on how many pages are returned.

## Implementation notes

When using the `is-disabled` class to create pagination links that appear to be disabled, add a `tabindex="-1"` attribute to the a tag so that it removes the disabled link from the tab order. It's also advisable to use JavaScript to disable the link's default functionality with the `preventDefault()` method.
