# Breadcrumb

A navigation component that indicates the user's current location in the nav hierarchy

## Adding the markup

```
<nav role="navigation" aria-label="Breadcrumbs">
    <ol class="rvt-breadcrumbs">
        <li><a href="#"> Home </a></li>
        <li><a href="#"> Files </a></li>
        <li aria-current="page">my-file.txt</li>
    </ol>
</nav>
```

## When to use

Use breadcrumbs when your application has multiple levels in the navigation hierarchy. Breadcrumbs can help users navigate quickly between these levels.

## When to use something else

Avoid using the breadcrumb nav when your application only has one level of navigation.

## Accessibility requirements

The breadcrumb component is wrapped in a `nav` element so that it is announced to assistive technologies. It is also a good idea to add `aria-label` attributes to the `nav` element and current page `li` that describes the navigation.