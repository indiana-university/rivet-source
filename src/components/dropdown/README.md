# Dropdown

Use the dropdown component to create a list of menu options that can be toggled with a button element.

## When to use

Use a dropdown menu when you need to give users a list of actions or links to choose from.

## When to use something else

Although similar to a native HTML `select` element, the dropdown component should not be used as a replacement inside forms. Use the `select` element instead when you need to give users a list of mutually exclusive choices while filling out a form.

## Adding the markup

### Using the default dropdown and menu list configuration

```
<div class="rvt-dropdown" data-dropdown="dropdownNavigation">
  <button type="button" class="rvt-button" data-dropdown-toggle="dropdownNavigation" aria-haspopup="true"
    aria-expanded="false">
    <span class="rvt-dropdown__toggle-text">Navigation menu</span><svg role="img" alt="" class="rvt-m-left-xs"
      xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="currentColor"
        d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z" />
    </svg>
  </button>

  <div class="rvt-dropdown__menu" id="dropdownNavigation" role="menu" hidden data-dropdown-menu>
    <a href="#">Item one</a>
    <a href="#">Item two</a>
    <a href="#" aria-current="page">Item three</a>
    <div role="group" aria-label="Related">
      <a href="#">Related item one</a>
      <a href="#">Related item two</a>
    </div>
  </div>
</div>
```

### Right-aligning the menu list element

To right-align the menu list element with the right side of the dropdown button, add the class `rvt-dropdown__menu--right` to the dropdown menu:

```
<div class="rvt-dropdown__menu rvt-dropdown__menu--right" id="dropdownNavigation" role="menu" hidden data-dropdown-menu>
```

### Using buttons in the menu list

If the links within the menu list are not navigating the user to another page, the `button` element can be used instead of anchor links.

```
<button type="button" role="menuitemradio">...</button>
<button type="button" aria-checked="true" role="menuitemradio">...</button>
<button type="button" role="menuitemradio">...</button>
<div role="group" aria-label="Related">
    <button type="button" role="menuitem">...</button>
    <button type="button" role="menuitem">...</button>
</div>
```

### Using a heading within the menu list

To add a heading within the menu list, add the following heading markup:

```
<div class="rvt-dropdown__menu-heading" aria-hidden="true">Menu list heading</div>
```

Within the menu list markup:

```
<div class="rvt-dropdown__menu" id="dropdownHeading" role="menu" hidden data-dropdown-menu>
  <a href="#" role="menuitemradio">Item One</a>
  <a href="#" aria-checked="true" role="menuitemradio">Item Two</a>
  <a href="#" role="menuitemradio">Item Three</a>
  <div class="rvt-dropdown__menu-heading" aria-hidden="true">Menu list heading</div>
    <div role="group" aria-label="Related">
        <a href="#">Nested item one</a>
        <a href="#">Nested item two</a>
    </div>
  </div>
</div>
```

## Initialization

In order to initialize the dropdown as an ES6 module, you will need to create a new instance of it, and pass it the element you wish to instantiate as a dropdown.

```
const dropdownElement = document.querySelector('[data-dropdown="your-data-dropdown-value"]');
document.newDropdown = new Rivet.Dropdown(dropdownElement);
```

## JavaScript API

If you use the appropriate data attribute/id combination in your markup, the dropdown will work without the need for any additional JavaScript. But if you need to control the dropdown programmatically, there are several methods from the Rivet dropdown's API you can use:

| Method           | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| .open()  | Opens the dropdown menu list |
| .close() | Closes the dropdown menu list |
| .init()  | Adds the built-in event listeners to the dropdown |
| .destroy() | Removes all built-in event listeners from the dropdown |

## Custom events

| Event        | Description                                                                                                                                                                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dropdownOpen`  | Emitted when the dropdown is opened (using the Dropdown.open() method). The value of the dropdown id attribute is also passed along via the custom event’s detail property and is available to use in your scripts as event.detail.id()  |
| `dropdownClose` | Emitted when the dropdown is closed (using the Dropdown.close() method). The value of the dropdown id attribute is also passed along via the custom event’s detail property and is available to use in your scripts as event.detail.id() |

## Accessibility requirements

The Rivet dropdown is built to follow the WAI-ARIA authoring standards. It is marked up with the appropriate ARIA attributes and uses the JavaScript included in `rivet.js` to implement the keyboard navigation and focus management required to meet the [ARIA Authoring Practices standards](http://w3c.github.io/aria-practices/). If you need to create the dropdown functionality in another framework/library like React, Angular, etc., please ensure that it meets the following accessibility requirements.

### Focus

- Dropdown button and Menu options should have a visible keyboard `:focus` state
- When `escape` key is pressed and the menu is active/open, focus should be returned to the Dropdown button associated with that menu.
- (Optional) When focused on the last menu item, the `down` arrow key should move focus to the first menu item.
- (Optional) When focused on the first menu item, the `up` arrow key should move focus to the last menu item.

### Labeling

- Dropdown button has [aria-haspopup](https://w3c.github.io/aria/#aria-haspopup) set to `true`.
- Menu has role [menu](https://w3c.github.io/aria/#menu).
- When menu is visible, button has [aria-expanded](https://w3c.github.io/aria/#aria-expanded) set to `true`. When menu is hidden, it is set to `false`.
🚫 (Optional) Dropdown button has [aria-controls](https://w3c.github.io/aria/#aria-controls) attribute that refers to the Menu
- Menu visibility should be toggled using the `aria-hidden` attribute.
- Menu items should use the appropriate roles, states, and properties depending their functionality. [More on that here](https://w3c.github.io/aria-practices/#menu).

### Keyboard navigation

- `enter` or `space` = Open Menu
- `escape` = Close Active Menu
- `down` arrow = Open Menu (when button focused)
- `up`/`down` arrows = Moves focus to previous/next menu option