# Buttons
Buttons are used to signal actions, submit forms, or trigger new content within the current context.

## Usability notes

### When to use
- Opening or closing a modal or dialog
- Triggering a dropdown menu
- Submitting data to the server

### When to consider something else
- Navigating to a new page or view in your application
- Navigating to different web page, e.g. external documentation

## Implementation notes
There are a number of button styles and sizes that can be achieved using a handful of modifier CSS classes.

### Contextual button modifiers
Certain contexts may require alternate button styles. For example, when a user is about to take a destructive action it may be advisable to use a different color button to alert them. In this case, adding the class `.button--danger` will create orange button that matches the [error alert color](link-to-alerts).

The available button color modifiers are:

- `.button--success`
- `.button--success-outline`
- `.button--danger`
- `.button--danger-outline`

## Small buttons
You can create smaller buttons by adding the `.button--small` modifier class. The small button modifier can be used together with the other button modifier classes to make any variation of small buttons.

For example, using the following markup, you could create a small secondary success (green) button.

```html
<button class="button button--small button--success-outline">
    Small &amp; secondary
</button>
```

### Link and input buttons
The `.button button--*` classes are meant to be used on the `<button>` elements, but they will work if you need to make an `<a>` tag or an `<input>` look like a button. If you're not sure whether to use a `<button>` or an `<a>` tag, you can reference the [documentation on links](/components/detail/links).

### Resources
- [Links vs. Buttons in Modern Web Applications](https://marcysutton.com/links-vs-buttons-in-modern-web-applications/)
