# Button

Buttons are intended to signal actions to users.

## When to use

- Opening or closing a modal or dialog
- Triggering a dropdown menu
- Submitting data to the server

## When to consider something else

- Navigating to a new page or view in your application
- Navigating to different web page, e.g. external documentation

## Adding the markup

A button is made up of a `button` element with the class `rvt-button`.

```
<button class="rvt-button">Primary</button>
```

> Button types

> Be aware that buttons will automatically submit nearby forms on the page unless they have the type="button" attribute.

### Additional variations

Modifier classes can be added to set a button's color to a specific status:
```
// Success
<button class="rvt-button rvt-button--success">Success</button>

// Danger
<button class="rvt-button rvt-button--danger">Danger</button>
```

If a transparent background is desired, the plain modifier can be used.

```
<button class="rvt-button rvt-button--plain">Plain</button>
```

#### Secondary variations

The default button and its variations can be inverted using a secondary modifier:

```
// Secondary default button
<button class="rvt-button rvt-button--secondary">Secondary</button>

// Secondary success button
<button class="rvt-button rvt-button--success-secondary">Success</button>

// Secondary danger button
<button class="rvt-button rvt-button--danger-secondary">Danger</button>
```