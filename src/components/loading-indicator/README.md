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

### Using the loading indicator inside buttons

It can be helpful to indicate that the submit button is in an inactive/loading state, such as when a user submits a form and the data is being sent to the server. The loading indicator can be used inside of buttons by applying the `rvt-button--loading` modifier class.

#### Button loading state

While the button is in the loading state, the `aria-busy="true"` and `disabled` attributes should be applied. This helps prevent users from trying to resubmit data while the current form is being submitted.

```
<button class="rvt-button rvt-button--loading" aria-busy="true" disabled>
  <span class="rvt-button__content">Update settings</span>
  <div class="rvt-loader rvt-loader--xs" aria-label="Content loading"></div>
</button>
```