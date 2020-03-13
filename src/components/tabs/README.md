# Tabs

Use tabs to allow users to switch between logical chunks of content without having to leave the current page.

## When to use

Tabs are useful for allowing users to quickly switch between related pieces of content. This could include:

- Displaying a small number (2-5 categories) of closely related, distinct data
- Displaying multiple unique views of the same data

## When to use something else

Tabs are inappropriate for cases which result in 6 or more categories or require long labels for clarity. In these cases, it becomes too difficult to easily fit the tabs horizontally on your target users' screens.

If the content of each tab is long enough that it could be its own page content or distinct enough from the other tabs, it may be better to create individual pages for the content instead.

## Adding the markup

The tabs component consists of a `div` with the class `rvt-tabs` wrapped around a `div` with the class `rvt-tabs__tablist` for containing the buttons used to activate tabs, and a `div` for each panel with the class `rvt-tabs__panel`.

The wrapper `div` is given the data attribute `data-tabset`. This data attribute is given a unique identifier which is used to initialize the component. See [initialization](#initialization).

Each button element has a `data-tab` attribute, which is given a value corresponding to the `id` of the panel to which it relates.

```
<div class="rvt-tabs" data-tabset="tabset-1">
  <div class="rvt-tabs__tablist" role="tablist" aria-label="Rivet tabs">
    <button class="rvt-tabs__tab" role="tab" aria-selected="false" data-tab="tab-1" id="t-one">Tab one</button>
    <button class="rvt-tabs__tab" role="tab" aria-selected="false" data-tab="tab-2" id="t-two">Tab two</button>
    <button class="rvt-tabs__tab" role="tab" aria-selected="false" data-tab="tab-3" id="t-three">Tab three</button>
  </div>
  <div class="rvt-tabs__panel" tabindex="0" role="tabpanel" id="tab-1" aria-labelledby="t-one" data-tab-panel="tab-1" hidden>
    <span class="rvt-ts-23 rvt-text-bold">Panel 1</span>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
  <div class="rvt-tabs__panel" tabindex="0" role="tabpanel" id="tab-2" aria-labelledby="t-two" data-tab-panel="tab-2" hidden>
    <span class="rvt-ts-23 rvt-text-bold">Panel 2</span>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  <div class="rvt-tabs__panel" tabindex="0" role="tabpanel" id="tab-3" aria-labelledby="t-three" data-tab-panel="tab-3" hidden data-tab-init>
    <span class="rvt-ts-23 rvt-text-bold">A grid inside a tab panel</span>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</div>
```

### Fitted tabs variant

In the fitted tabs variant, the width of the tabs container is distributed equally across each tab. This variant is created by adding the `rvt-tabs--fitted` modifier class to the `rvt-tabs` wrapper `div`.

```
<div class="rvt-tabs rvt-tabs--fitted" data-tabset="tabset-1">
  <div class="rvt-tabs__tablist" role="tablist" aria-label="Rivet tabs">
    <button class="rvt-tabs__tab" role="tab" aria-selected="false" data-tab="tab-1" id="t-one">Tab one</button>
    <button class="rvt-tabs__tab" role="tab" aria-selected="false" data-tab="tab-2" id="t-two">Tab two</button>
    <button class="rvt-tabs__tab" role="tab" aria-selected="false" data-tab="tab-3" id="t-three">Tab three</button>
  </div>
  <div class="rvt-tabs__panel" tabindex="0" role="tabpanel" id="tab-1" aria-labelledby="t-one" data-tab-panel="tab-1" hidden>
    <span class="rvt-ts-23 rvt-text-bold">Panel 1</span>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
  <div class="rvt-tabs__panel" tabindex="0" role="tabpanel" id="tab-2" aria-labelledby="t-two" data-tab-panel="tab-2" hidden>
    <span class="rvt-ts-23 rvt-text-bold">Panel 2</span>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  <div class="rvt-tabs__panel" tabindex="0" role="tabpanel" id="tab-3" aria-labelledby="t-three" data-tab-panel="tab-3" hidden data-tab-init>
    <span class="rvt-ts-23 rvt-text-bold">A grid inside a tab panel</span>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</div>
```

## Initialization

In order to initialize the modal as an ES6 module, you will need to create a new instance of it, and pass it the element you wish to instantiate as a set of tabs.

```
const tabsElement = document.querySelector('[data-tabset="tabset-1"]');
document.newTabs = new Rivet.Tabs(tabsElement);
```

## "Public" methods

If you use the appropriate data attribute/id combination in your markup, modals will work without the need for any additional JavaScript. But if you need to control the modal programmatically, there are a handful of methods from the Rivet modal’s API you can use:

| Method                      | Description                                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| .activateTab(tab, callback) | - `tab` - The element to be activated. - `callback` - An optional callback function that is executed after the tab is activated. |
| .destroy()                  | Adds the built-in event listeners to the tab component.                                                                          |
| .init()                     | Removes all built-in event listeners from the tab component.                                                                     |

## Custom events

| Event          | Description                                                                                                                                                                                                                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tabActivated` | Emitted when an individual tab panel is activated (using the `Tabs.activateTab()` method, or via a click on a button with the `data-tab` attribute). The value of the `data-tab` attribute is also passed along (if it exists) via the custom event’s detail property and is available to use in your scripts as event.detail.id() |

## A11y requirements

The Rivet tab component is built to follow the WAI-ARIA authoring standards. It is marked up with the appropriate ARIA attributes and uses the JavaScript included in `rivet.js` to implement the keyboard navigation and focus management required to meet the [ARIA Authoring Practices standards](http://w3c.github.io/aria-practices/). If you need to create the modal functionality in another framework/library like React, Angular, etc., please ensure that it meets the following accessibility requirements.

### Focus

✅ Tabs should have a visible `:focus` state.

✅ Active tabs should have a visible `aria-selected="true"` state.

✅ Activating a tab should set its associated tab panel’s `tabindex` attribute to `-1`. All in active tabs should have their `tabindex` attribute set to `0` so that after the used activates a tab, pressing `tab` will move focus to the active tab’s tab panel.

### Labeling

✅ Tabs should be wrapped in an element with a role of tablist.

✅ Each tab (button) should have a role of tab.

✅ Each tab panel should have a role of tabpanel.

✅ The active tab should have the attribute `aria-selected` set to `true`. All inactive tabs should have `aria-selected` set to `false`.

✅ Each `tabpanel` should have an `aria-labelledby` attribute that references its associated tab.

### Keyboard navigation

✅ `tab`: Moves focus to next tabbable element inside the modal. If focus is on the last tabbable element inside the modal, moves focus to the first tabbable element inside the modal.

✅ `enter` or `space`: Activate tab (when focused).

✅ `<- ->`: Moves focus to previous/next tab.

## Implementation Notes

- Do not stack rows of tabs - only use a small set of tabs in a single row
- Order tabs in a logical manner
- Default tab (on page load) should be the first tab. The first tab should be the most frequently viewed or most important tab
- Tab order should stay the same as the user moves between tabs
- Label tabs with clear concise categories - 1-2 words is ideal
- Do not use all capital letters in the tab labels
- Do not include a ‘More’ tab
- Page should not reload or refresh when the user switches to a different tab
- Only the content of the tab and tab bar indicating the user’s location should change. The rest of the page should remain the same.
