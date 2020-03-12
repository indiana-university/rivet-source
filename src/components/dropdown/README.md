# Dropdown

Use the dropdown component to create a list of menu options that can be toggled with a button element.

## When to use

Use a dropdown menu when you need to give users a list of actions or links to choose from.

## When to use something else

Although similar to a native HTML <select> element, the dropdown component should not be used as a replacement inside forms. Use the select element instead when you need to give users a list of mutually exclusive choices while filling out a form.

## Initialization

In order to initialize the dropdown as an ES6 module, you will need to create a new instance of it, and pass it the element you wish to instantiate as a dropdown.

```
const dropdownElement = document.querySelector('[data-dropdown="your-data-dropdown-value"]');
document.newDropdown = new Rivet.Dropdown(dropdownElement);
```

## "Public" methods

## Custom events

## Accessibility requirements