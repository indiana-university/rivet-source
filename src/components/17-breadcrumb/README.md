# Breadcrumbs
A navigation component that indicates the user's current location in the nav hierarchy

## When to use
Use breadcrumbs when your application has multiple levels in the navigation hierarchy. Breadcrumbs can help users navigate quickly between these levels.

## When to consider something else
Avoid using the breadcrumb nav when your application only has one level of navigation.

## Implementation notes
The default breadcrumb is minimally styled with CSS-generated content (/) used as separators. There is also a `.rvt-breadcrumbs--call-out` modifier class that adds a small amount of padding and a light gray background. This is useful for when you need to draw more attention to the breadcrumb.

## Accessibility
The breadcrumb component is wrapped in a `nav` element so that it is announced to assistive technologies. It is also a good idea to add `aria-label` attributes to the `nav` element and current page `li` that describes the navigation.

## Resources
- [NN Group on the benefits of breadcrumb navigation](https://www.nngroup.com/articles/breadcrumb-navigation-useful/)
- [ARIA authoring practices example of accessible breadcrumb nav](https://www.w3.org/TR/wai-aria-practices/examples/breadcrumb/index.html)
