# Dropdown
The dropdown component is used to create a list of menu options who's visibility can be toggle using a button element.

## When to use
Use a dropdown menu when you need to give users a list of actions or links to choose from.

## When to consider something else
Although similar to a native HTML `<select>` element, the dropdown component should not be used as a replacement inside forms. Use the select element instead when you need to give users a list of mutually exclusive choices while filling out a form.

## Accessibility notes
The dropdown uses JavaScript to fully implement WAI-ARIA authoring standards for keyboard navigation within the menu. Dropdowns should be toggled using an HTML `<button>` element. The dropdown toggle needs an `aria-haspopup` attribute with a value of `true` and a `aria-expanded` attribute set initially to `false`. The `aria-haspopup` indicates to assistive technologies(AT) that the button controls a menu that will be activated. The `aria-expanded` attribute will be used to indicate to assistive technology whether or not the menu is currently open. Lastly, the dropdown menu needs an `aria-hidden` attribute initially set to `true`. This will hide (visually and from AT) until the menu is toggled via JavaScript.

### A not about buttons
While it is possible to use any element as a toggle for the dropdown menu, you should *always* use an HTML `<button>` element. The button element was made for triggering the addition of new content within the current context or preforming in-page actions and it's appearance is completely styleable using CSS (so dropdown toggles do not always need to look like the default Rivet button). Buttons are the best and most accessible choice for toggling the dopdown menu.

## Implementation notes
To use the dropdown component, add a data attribute of `data-dopdown-toggle` to the button element you want to use to show/hide the menu, then add an `id` with a matching value to the `.rvt-dropdown__menu` element.

```html
<div class="rvt-dropdown">
    <button class="rvt-button"
            data-dropdown-toggle="dropdown-docs-example"
            aria-haspopup="true"
            aria-expanded="false">
        <span>Primary</span>
        <svg role="img" alt="" class="rvt-m-left-xs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <!-- Icon ... -->
        </svg>
    </button>
    <div class="rvt-dropdown__menu" id="dropdown-docs-example" aria-hidden="true">
        <a href="#">Add item</a>
        <a href="#">Reorder items</a>
        <a href="#">Manage categories</a>
    </div>
</div>
```

## JavaScript API
For convieniece the Dropdown JavaScript exposes a couple of methods to use in your own scripts. The `init()` method is called by the main `rivet.js` file the first time the script is loaded. It will initiallize all of the dropdown menus that are in the DOM when the page loads. When dynamically updating the page (via AJAX calls, etc.) you will need to call the `init()` method in your script after each update to the DOM. This will re-initialize all dropdowns on the page, including any new dropdowns that may have been added to the DOM.

### Available methods
Here's a breakdown of the available Dropdown methods you can use in your scripts.

<table>
    <caption class="sr-only">API table</caption>
    <thead>
        <tr>
            <th scope="col">Method</th>
            <th scope="col">Descripton</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`Dropdown.init()`</td>
            <td>Initializes all dropdowns in the DOM. Must be called any time new Dropdowns are added to the DOM without a page reload.</td>
        </tr>
        <tr>
            <td>`Dropdown.toggle(id)`</td>
            <td>Toggles a dropdown menu. The `id` argument is a `String` that corresponding value of the dropdown's `data-dropdown-toggle` and `id` attributes. This will update the values of the Dropdown toggle's `aria-expanded` and the value of the menu's `aria-hidden` attributes based on their state when `toggle()` is called.</td>
        </tr>
        <tr>
            <td>`Dropdown.closeAll()`</td>
            <td>Closes all dropdown menus and sets their `aria-hidden` and `aria-expanded` attributes to the appropriate state.</td>
        </tr>
    </tbody>
</table>