# Base header
The base header provides consistent branding in a condensed space. It replaces the common text “Indiana University” with a more useful link to your application’s default view. The base header is the bare minimum version of the header that **must be included in your application**.

## Accessibility
**All versions** of the Rivet header should include a skip link that is only visible when in focus and that links via an `id` attribute to the `<main>` element of you application. See the [skip link example](./header--skip-link) for more details on implementation.

## Header extensibility
The base header can be extended to fit the navigation needs of your application by using a handful of smaller sub-components and modifier CSS classes.

- [Identity menu extension](header--id-menu.html)
- [Main navigation extension](./header--main-nav.html)
