# Disclosure

Show and collapse additional content

## Do

- Use to hide lengthy information that is secondary or low priority
- Use you need to conserve space in long passages of text
- Use to reveal additional information about a topic

## Don't

- Use to hide critical or required instructions
- Use as a way to hide an element. Use the `.rvt-display-none` or `.rvt-sr-only` utility classes instead.
- Group multiple instances together to form an accordion widget. Use the [Accordion]() component instead.

## Adding the markup

```html
```

## Initialization

In auto mode, disclosure components are initialized for you.

In manual mode, you can initialize a disclosure using the `Rivet.Disclosure.init()` method:

```js
```

In module mode, you can use the `Disclosure.init()` method described above or call `Disclosure.initAll()` to initialize all disclosures, including those not added to the DOM yet.

```js
```

## Options

### Open on initialization

You can set a disclosure to be open by default by adding the `rvt-disclosure-open-on-init` attribute:

```js
```

## JavaScript API

|Method|Description|
|-|-|
|`open()`|Opens the disclosure|
|`close()`|Closes the disclosure|

## Custom events

|Event|Description|
|-|-|
|`rvt:disclosureOpened`|Emitted when a disclosure is opened.|
|`rvt:disclosureClosed`|Emitted when a disclosure is closed.|

## Accessibility (a11y) requirements

TBD

### Labeling

If the content associated with an disclosure toggle button is visible, the toggle button element has `aria-expanded` set to `true`. If the panel is not visible, `aria-expanded` is set to `false`.

### Keyboard navigation

`enter` or `space`: When focus is on the disclosure toggle, shows the association content if it is hidden and hides the content if it is visible.