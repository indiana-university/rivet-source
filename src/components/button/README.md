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

#### Small buttons

You can create smaller buttons by adding the `rvt-button--small` modifier class. The small button modifier can be used together with the other button modifier classes to make any variation of small buttons.

```
// Small default button
<button class="rvt-button rvt-button--small">Primary</button>

// Small success button
<button class="rvt-button rvt-button--success rvt-button--small">Success</button>

// Small danger button
<button class="rvt-button rvt-button--danger rvt-button--small">Danger</button>

// Small plain button
<button class="rvt-button rvt-button--plain rvt-button--small">Plain</button>
```

#### Full-width buttons

In some cases it can be helpful for buttons to have a larger click/touch area. If you need a button to take up the full width of its parent container, you can use the `.rvt-button--full-width` modifier.

```
<button class="rvt-button rvt-button--full-width">Full-width button</button>
```

### Button groups

When you need to display a group of buttons you can wrap them in a `div` with the class `rvt-button-group` applied to it. The `rvt-button-group` class will add an equal amount of margin to the right side of every button in the group except the last one.

```
<div class="rvt-button-group">
    <button type="button" class="rvt-button">Ok</button>
    <button type="button" class="rvt-button rvt-button--secondary">Cancel</button>
</div>
```

#### Right-aligning button groups

If you need to right align your buttons, you can add the `rvt-button-group--right` modifier class to the `.rvt-button-group` div.

In this example, the buttons would be aligned to the right edge of the `.rvt-button-group`'s parent container.

```
<div class="rvt-button-group rvt-button-group--right">
    <button type="button" class="rvt-button">Ok</button>
    <button type="button" class="rvt-button rvt-button--secondary">Cancel</button>
</div>
```

## Implementation notes

There are a number of button styles and sizes that can be achieved using a handful of modifier CSS classes.

The actions that buttons describe should be informative and concise. With few exceptions, button text should not wrap onto multiple lines.

### Contextual button modifiers

Certain contexts may require alternate button styles. For example, when a user is about to take a destructive action it may be advisable to use a different color button to alert them. In this case, adding the class `rvt-button--danger` will create an orange button that matches the [error alert color](#).

The available button color modifiers are:

- `.rvt-button--success`
- `.rvt-button--success-secondary`
- `.rvt-button--danger`
- `.rvt-button--danger-secondary`

### Using icons inside buttons

You can use icons inside the `<button>` element. (Just make sure to also include text alongside them.) Before the button icons can display properly, you need to do a few things:

1. Wrap the button text in a `<span>` element
2. Use Rivet’s utility classes to add some space between the button text and the icon
3. When adding icons to Rivet buttons, all icons should appear before the buttons text except for standard conventions like dropdown menus.

For best results, use an SVG icon that is sized to 16px by 16px.

#### Button icons and accessibility

In this example, we `aria-hidden="true"` attribute to the the SVG elements. This communicates to screen readers that the icons are decorative and should not be read aloud.

When you use icons inside buttons, you should still include button text to describe the action the button performs. If you want only the icon to be visible inside of a button (for example, a close button in a modal window), you should still include some visually-hidden text that describes the button’s action.

See the example below using the `rvt-sr-only` utility class to visually hide the button text.

> Rivet icon set

> The following examples use the Rivet icon set. Read about how to the icon set in the add-ons section.

```
<div class="rvt-button-group">
    <button type="button" class="rvt-button">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="currentColor" d="M14,7H9V2A1,1,0,0,0,7,2V7H2A1,1,0,0,0,2,9H7v5a1,1,0,0,0,2,0V9h5a1,1,0,0,0,0-2Z"/>
        </svg>
        <span class="rvt-m-left-xs">Add item</span>
    </button>
    <button type="button" class="rvt-button">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g fill="currentColor">
                <path d="M4,10.23H1.92V2H8V3h2V2A2,2,0,0,0,8,0H1.92a2,2,0,0,0-2,2v8.23a2,2,0,0,0,2,2H4Z"/>
                <path d="M14,16H8a2,2,0,0,1-2-2V7A2,2,0,0,1,8,5h6a2,2,0,0,1,2,2v7A2,2,0,0,1,14,16ZM8,7v7h6V7Z"/>
            </g>
        </svg>
        <span class="rvt-m-left-xs">Copy</span>
    </button>
    <button type="button" class="rvt-button rvt-button--danger">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g fill="currentColor">
                <path d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,14a6,6,0,1,1,6-6A6,6,0,0,1,8,14Z"/>
                <path d="M10.83,5.17a1,1,0,0,0-1.41,0L8,6.59,6.59,5.17A1,1,0,0,0,5.17,6.59L6.59,8,5.17,9.41a1,1,0,1,0,1.41,1.41L8,9.41l1.41,1.41a1,1,0,0,0,1.41-1.41L9.41,8l1.41-1.41A1,1,0,0,0,10.83,5.17Z"/>
            </g>
        </svg>
        <span class="rvt-m-left-xs">Delete</span>
    </button>
    <button type="button" class="rvt-button rvt-button--secondary">
        <span class="rvt-sr-only">Edit entry</span>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="currentColor" d="M14.62,4.19,11.74,1.34a1.1,1.1,0,0,0-1.55,0L0,11.62,0,16l4.45,0L14.64,5.73A1.1,1.1,0,0,0,14.62,4.19ZM3.62,14H2V12.44l6-6L9.58,8ZM11,6.57,9.4,5,11,3.4,12.57,5Z"/>
        </svg>
    </button>
</div>
```

### Link and input buttons

The `rvt-button` `rvt-button--*` classes are meant to be used on the `<button>` elements, but they will work if you need to make an `<a>` tag or an `<input>` look like a button. If you’re not sure whether to use a `<button>` or an `<a>` tag, you can reference the [documentation on links](#).