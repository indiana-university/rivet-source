# Disclosure

Summary of the disclosure.

## Things to consider

If you want a dropdown, use that instead. If you want tabs, use those instead.

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

TBD

### Keyboard navigation

TBD