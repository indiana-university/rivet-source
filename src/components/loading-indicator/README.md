# Loading indicator

The Rivet loading indicator helps notify users when their action is being processed

> New in Rivet 1.2.0

> The loading indicator is new as of 1.2.0. If you need help moving to 1.2.0, see our [instructions for updating Rivet](#).

## When to use

The loading indicator can be used to indicate the loading of page content, such as when a single page application makes a request for new content. The loading indicator element does not come with any specific positioning styles, so you’ll need to position it appropriately in the container where your content will eventually display once it’s loaded.

## Adding the markup

The loading indicator is made up of a `div` with the class `rvt-loader` and an `aria-label` attribute.

```
<div class="rvt-loader" aria-label="Content loading"></div>
```