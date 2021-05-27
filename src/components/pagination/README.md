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
<nav role="navigation" aria-label="Default results pages">
  <ul class="rvt-pagination">
    <li class="rvt-pagination__item is-disabled">  
      <a href="#0" aria-label="Previous set of pages">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path fill="currentColor" d="M10.5,15a1,1,0,0,1-.77-.36L4.87,8.8a1.25,1.25,0,0,1,0-1.61L9.73,1.36a1,1,0,0,1,1.54,1.28L6.8,8l4.47,5.36A1,1,0,0,1,10.5,15ZM6.41,8.47h0Zm0-1h0Z"/>
        </svg>        
        <span class="rvt-sr-only">Previous</span>
      </a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#0" aria-label="Page 1">1</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#0" aria-current="page">2</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#0" aria-label="Page 3">3</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#0" aria-label="Page 4">4</a>
    </li>
    <li class="rvt-pagination__item">
      <a href="#0">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path fill="currentColor" d="M5.5,15a1,1,0,0,1-.77-1.64L9.2,8,4.73,2.64A1,1,0,0,1,6.27,1.36L11.13,7.2a1.25,1.25,0,0,1,0,1.61L6.27,14.64A1,1,0,0,1,5.5,15ZM9.6,8.48h0Zm0-1h0Z"/>
        </svg>
        <span class="rvt-sr-only">Next set of pages</span>
      </a>
    </li>
  </ul>
</nav>
```

### Positioning the pagination
By default the pagination component will be left aligned to its parent container. If you want to center the pagination component you can use Rivet's flexbox utility classes. You will need to first wrap the pagination component in a `div` and then apply the following classes.

```html
<div class="rvt-flex rvt-justify-center">
  <!-- Pagination component markup -->
</div>
```