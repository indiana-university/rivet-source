# Breadcrumb
A nav component that indicates the users current location in the navigation hierarchy.

## When to use
Use breadcrumbs when your application has multiple levels in the navigation heirarchy. A breadcrumb nav can help users navigate quickly between screens.

## When to consider something else
Avoid using the breadcrumb nav when your application only has one level of navigation.

## Accessibility
The breadcrumb component is wrapped in a `nav` element so that it is announced to assistive technologies. It is also a good idea to add `aria-label` attributes to the `nav` element and current page `li` that describes the navigation.

## Resources
- [NN Group on the benefits of breadcrumb navigation](https://www.nngroup.com/articles/breadcrumb-navigation-useful/)
- [ARIA authoring practices example of accessible breadcrumb nav](https://www.w3.org/TR/wai-aria-practices/examples/breadcrumb/index.html)