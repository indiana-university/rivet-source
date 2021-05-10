# Subnav

Provide additional navigation outside of the main header

## When to use

- To allow users to move between pages in a specific subsection of your application
- To provide users with additional navigation beyond that included in the main application header

## When to consider something else

- For top-level navigation, use components like the [header](#) and [breadcrumb navigation](#)
- For navigation between steps of a process that's been split across multiple pages, use the [step indicator](#)
- To allow users to switch between chunks of related content without having to leave the current page, use [tabs](#)

## Adding the markup

The menu component is made up of a `nav` wrapper with the class `rvt-subnav` and an `aria-label` attribute. Inside the wrapper is an unordered list (`ul`) with the class `rvt-subnav__list` and list items (`li`), each with the class `rvt-subnav__item`.

```
<nav class="rvt-subnav" aria-label="Section navigation">
  <ul class="rvt-subnav__list">
    <li class="rvt-subnav__item">
      <a href="#" aria-current="page">Item one</a>
    </li>
    <li class="rvt-subnav__item">
      <a href="#">Item two</a>
    </li>
    <li class="rvt-subnav__item">
      <a href="#">Item three</a>
    </li>
    <li class="rvt-subnav__item">
      <a href="#">Item four</a>
    </li>
    <li class="rvt-subnav__item">
      <a href="#">Item five</a>
    </li>
  </ul>
</nav>
```

## Accessibility requirements

Add the `aria-current="page"` attribute to a navigation link to indicate the current page.

## Implementation notes

Keep navigation labels short (1-2 words).