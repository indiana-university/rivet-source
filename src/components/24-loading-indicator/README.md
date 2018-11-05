# Loading indicator

The Rivet loading indicator helps notify users when their action is being processed.

## Implementation notes
The loading indicator can be used to indicate the loading of page content, for instance in single page applications when making a request for new content. The loading indicator element does not come with any specific positioning so you will need to position it appropriately in the container where your content will eventually display once it's loaded.

### Using the loading indicator inside buttons
It can be helpful to indicate that the submit button is in an inactive/loading state for instance when a user submits a form and the data is being sent to the server. The loading indicator can be used inside of buttons in combination with the `.rvt-button--loading` modifier class.

```html
<!--
  The `.rvt-button--loading` class gets applied while the button is
  in the loading state and then removed when it is finished.
 -->
<button class="rvt-button rvt-button--loading" aria-busy="true" disabled>
  <span class="rvt-button__text">Update settings</span>
  <div class="rvt-loader" aria-label="Content loading"></div>
</button>
```

While the button is in the loading state the `aria-busy="true"` and `disabled` attributes should be applied. This helps prevent users from trying to resubmit data while the current form is being submitted.

#### Handling button text display while in the loading state
When using the loading indicator inside buttons the visible button text should be wrapped in a `.rvt-button__text` class. This CSS class will visually hide the button text but maintain the display width of the button while the loading indicator is visible.

### Loading indicator sizes
The loading indicator comes in multiple sizes that follow the standard Rivet size naming conventions.

- `rvt-loader--xxs`
- `rvt-loader--xs` - The default size. Same as `rvt-loader` with no modifier. NOTE: this is the **only** size that is allowed to be used inside of buttons.
- `rvt-loader--sm`
- `rvt-loader--md`
- `rvt-loader--lg`
- `rvt-loader--xl`
- `rvt-loader--xxl`