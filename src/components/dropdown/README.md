# Dropdown

Use the dropdown component to create a list of menu options that can be toggled with a button element.

## When to use

Use a dropdown menu when you need to give users a list of actions or links to choose from.

## When to use something else

Although similar to a native HTML `select` element, the dropdown component should not be used as a replacement inside forms. Use the `select` element instead when you need to give users a list of mutually exclusive choices while filling out a form.

## Initialization

In order to initialize the dropdown as an ES6 module, you will need to create a new instance of it, and pass it the element you wish to instantiate as a dropdown.

```
const dropdownElement = document.querySelector('[data-dropdown="your-data-dropdown-value"]');
document.newDropdown = new Rivet.Dropdown(dropdownElement);
```

## "Public" methods

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