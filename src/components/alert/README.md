# Page-level alerts

Alerts are used to display brief important messages to users. They are designed to attract the user’s attention, but not interrupt their work.

## When to use

- To notify users about system status including error, warnings, and updates.
- To notify users they’ve successfully completed a task
- Use along with inline validation alerts to summarize multiple errors on longer forms

## When to use something else

- When it’s necessary to interrupt the user’s work flow.
- When user input/action is required to continue working
- If action taken by the user will result in losing/destroying their work, use a modal dialog that allows the user to confirm the destructive action.

## Adding the markup

Rivet alerts consist of a `div` element with the class `rvt-alert` wrapped around the title (`rvt-alert__title`) and message (`rvt-alert__message`). The default alert does **not** require the alert JavaScript to be initialized.

```
<div class="rvt-alert" role="alert" aria-labelledby="sample-alert-title">
    <h1 class="rvt-alert__title" id="sample-alert-title">Alert title</h1>
    <p class="rvt-alert__message">Lorem ipsum dolor sit amet</p>
</div>
```

### Additional options

#### Statuses

Rivet provides additional options that allow you to convey status-related information via alerts. These are accessed by the addition of the modifier classes below. For more information about when to apply a given status, please see [UPDATE THIS IN THE FUTURE].

```
// Informational alert
<div class="rvt-alert rvt-alert--info" role="alert" aria-labelledby="info-alert-title">
    <h1 class="rvt-alert__title" id="info-alert-title">Alert title</h1>
    <p class="rvt-alert__message">Lorem ipsum dolor sit amet</p>
</div>

// Success alert
<div class="rvt-alert rvt-alert--success" role="alert" aria-labelledby="success-alert-title">
    <h1 class="rvt-alert__title" id="success-alert-title">Alert title</h1>
    <p class="rvt-alert__message">Lorem ipsum dolor sit amet</p>
</div>

// Warning alert
<div class="rvt-alert rvt-alert--warning" role="alert" aria-labelledby="warning-alert-title">
    <h1 class="rvt-alert__title" id="warning-alert-title">Alert title</h1>
    <p class="rvt-alert__message">Lorem ipsum dolor sit amet</p>
</div>

// Danger alert
<div class="rvt-alert rvt-alert--danger" role="alert" aria-labelledby="danger-alert-title">
    <h1 class="rvt-alert__title" id="danger-alert-title">Alert title</h1>
    <p class="rvt-alert__message">Lorem ipsum dolor sit amet</p>
</div>
```

#### Inline

Rivet provides inline alert variants for validating forms. Adding the `rvt-inline-alert--standalone` modifier class to the standard inline alert element will give the alert a subtle background color and left border to add some visual contrast.

Inline alert must be paired with a status variant and the appropriate `SVG` icon.

When using a standalone inline alert with a group of inputs, make sure to add the `aria-describedby` attribute to each input (in this case radio buttons) that is invalid. The `aria-describedby` by value should correspond to a matching `id` attribute on the `rvt-inline-alert__message` element.

```
// Information alert
<div class="rvt-inline-alert rvt-inline-alert--standalone rvt-inline-alert--info">
    <span class="rvt-inline-alert__icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g fill="currentColor">
                <path d="M8,16a8,8,0,1,1,8-8A8,8,0,0,1,8,16ZM8,2a6,6,0,1,0,6,6A6,6,0,0,0,8,2Z"/>
                <path d="M8,12a1,1,0,0,1-1-1V8A1,1,0,0,1,9,8v3A1,1,0,0,1,8,12Z"/>
                <circle cx="8" cy="5" r="1"/>
            </g>
        </svg>
    </span>
    <span class="rvt-inline-alert__message" id="radio-list-message">
        This field is required to continue.
    </span>
</div>

// Success alert
<div class="rvt-inline-alert rvt-inline-alert--standalone rvt-inline-alert--success">
    <span class="rvt-inline-alert__icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g fill="currentColor">
                <path d="M10.2,5.4,7.1,9.53,5.67,8.25a1,1,0,1,0-1.34,1.5l2.05,1.82a1.29,1.29,0,0,0,.83.32h.12a1.23,1.23,0,0,0,.88-.49L11.8,6.6a1,1,0,1,0-1.6-1.2Z"/>
                <path d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,14a6,6,0,1,1,6-6A6,6,0,0,1,8,14Z"/>
            </g>
        </svg>
    </span>
    <span class="rvt-inline-alert__message" id="radio-list-message">
        This field is required to continue.
    </span>
</div>

// Warning alert
<div class="rvt-inline-alert rvt-inline-alert--standalone rvt-inline-alert--warning">
    <span class="rvt-inline-alert__icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g fill="currentColor">
                <path d="M11,9H5A1,1,0,0,1,5,7h6a1,1,0,0,1,0,2Z"/>
                <path d="M8,16a8,8,0,1,1,8-8A8,8,0,0,1,8,16ZM8,2a6,6,0,1,0,6,6A6,6,0,0,0,8,2Z"/>
            </g>
        </svg>
    </span>
    <span class="rvt-inline-alert__message" id="radio-list-message">
        This field is required to continue.
    </span>
</div>

// Danger alert
<div class="rvt-inline-alert rvt-inline-alert--standalone rvt-inline-alert--danger">
    <span class="rvt-inline-alert__icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g fill="currentColor">
                <path d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,14a6,6,0,1,1,6-6A6,6,0,0,1,8,14Z" />
                <path d="M10.83,5.17a1,1,0,0,0-1.41,0L8,6.59,6.59,5.17A1,1,0,0,0,5.17,6.59L6.59,8,5.17,9.41a1,1,0,1,0,1.41,1.41L8,9.41l1.41,1.41a1,1,0,0,0,1.41-1.41L9.41,8l1.41-1.41A1,1,0,0,0,10.83,5.17Z"/>
            </g>
        </svg>
    </span>
    <span class="rvt-inline-alert__message" id="radio-list-message">
        This field is required to continue.
    </span>
</div>
```

#### Alert lists

Alert lists provide a way to group a set of errors together. For instance, when summarizing a list of errors on a long form. These consist of a `ul` element with the class `rvt-alert-list` wrapped around list items, each with a class of `rvt-alert-list__item`.

```
<ul class="rvt-alert-list">
    <li class="rvt-alert-list__item">
        <div class="rvt-alert rvt-alert--danger" role="alert">
            <h1 class="rvt-alert__title">Please correct the following errors.</h1>
            <p class="rvt-alert__message">Alert lists are useful for summarizing multiple errors on a page.</p>
        </div>
    </li>
    <li class="rvt-alert-list__item">
        <div class="rvt-alert rvt-alert--danger" role="alert">
            <h1 class="rvt-alert__title">Errors can have a title only, <a href="#">with a link</a> to the invalid element.</h1>
        </div>
    </li>
    <li class="rvt-alert-list__item">
        <div class="rvt-alert rvt-alert--danger" role="alert">
            <h1 class="rvt-alert__title">Error message three is soooo long!</h1>
            <p class="rvt-alert__message">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias veniam iste, nesciunt aliquam illum quaerat hic expedita ducimus error assumenda explicabo quos harum delectus deserunt, autem corrupti quas doloremque. Veritatis.</p>
        </div>
    </li>
</ul>
```

#### Dismissable alerts

Rivet alerts can be dismissable with the addition of a `button` element with the class `rvt-alert__dismiss` and the data attribute `data-alert-close`. This button encloses a `span` element designed to provide context for accessibility and an `SVG` close icon. **You will need to initialize the alert JavaScript in order to use this functionality.**

```
<div class="rvt-alert rvt-alert--info" role="alertdialog" aria-labelledby="dismissable-alert-title">
    <h1 class="rvt-alert__title" id="dismissable-alert-title">Alert title</h1>
    <p class="rvt-alert__message">Lorem ipsum sit dolor amet</p>
    <button type="button" class="rvt-alert__dismiss" data-alert-close>
        <span class="v-hide">Dismiss this alert</span>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="currentColor" d="M9.41,8l5.29-5.29a1,1,0,0,0-1.41-1.41L8,6.59,2.71,1.29A1,1,0,0,0,1.29,2.71L6.59,8,1.29,13.29a1,1,0,1,0,1.41,1.41L8,9.41l5.29,5.29a1,1,0,0,0,1.41-1.41Z"/>
        </svg>
    </button>
</div>
```

## Initialization

In order to initialize the alert, you will need to create a new instance of it, and pass it the element you wish to instantiate as a modal.

```
const alertElement = document.querySelector('[data-alert="your-data-alert-value"]');
const newAlert = new Rivet.Alert(alertElement);
```

## JavaScript API

If you use the appropriate data attribute/id combination in your markup, alerts will work without the need for any additional JavaScript. But if you need to control the alert programmatically, there are a handful of methods from the Rivet alert’s API you can use:

| Method          | Description                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| .destroy()      | Removes all built-in event listeners from the alert                                    |
| .dismiss()      | Removes the element from the DOM.                                                      |
| .init()         | Adds the built-in event listeners to the alert                                         |
| .open(callback) | `callback` - An optional callback function that is executed after the alert is opened. |

## Custom events

| Event              | Description                                                                                                                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `rvt:alertDismiss` | Emitted when the alert is dismissed (using the Alert.open() method, or the `data-alert-dismiss` attribute). The value of the alert `id` attribute is also passed along via the custom event’s detail property and is available to use in your scripts as event.detail.id |

## Accessibility requirements

The Rivet alert is built to follow the WAI-ARIA authoring standards. It is marked up with the appropriate ARIA attributes and uses the JavaScript included in `rivet.js` to implement the keyboard navigation and focus management required to meet the [ARIA Authoring Practices standards](http://w3c.github.io/aria-practices/). If you need to create the alert functionality in another framework/library like React, Angular, etc., please ensure that it meets the following accessibility requirements.

✅ The element that serves as the alert container has a role of `alert`.

✅ Alerts that have a dismiss or close button should use the `role="alertdialog"` attribute.

✅ Use the `aria-labelledby` attribute to link the alert title with the alert element.

✅ Dynamically rendered alerts are automatically announced by most screen readers, but it’s important to note that screen readers will not inform users of alerts that are present before a page has finished loading.

### Alert lists

Alert lists can be particularly useful for summarizing multiple errors on a page, and providing links to the invalid fields. These summaries are especially helpful for non-sighted users, who will not receive the visual cue provided by multiple inline alerts appearing on the page when a form is submitted.

## Implementation notes

- Page-level alerts can be used with an optional dismiss button (X icon), however it’s important to avoid allowing users to dismiss alerts that are used to display error messages. Do allow users to dismiss alerts wherever appropriate.
- Avoid using error messages that automatically disappear. If a user doesn’t have time to read the error message they may not know how to correct the problem once it has been automatically removed.
- Write helpful alert messages. For errors, Include a brief description of the problem and how to fix it. Check out the Voice and tone/microcopy section for more information.

## Microcopy notes

- Alert title should be clear and concise. “Success!” rather than “Application was submitted successfully!”
- Alert message should be descriptive and should clearly articulate the problem the user has encountered or the information you are trying to convey to the user. “The user ID and password you entered do not match” is more clear than “Unauthorized”.
- Where appropriate, alert title should be a link to the position on the page where the invalid element can be found.
- Alert message should offer next steps where appropriate.

### Good example

**Scheduled System Maintenance** This system will be unavailable on August 1st due to scheduled system maintenance. Please check back on August 2nd.

- Clear title; explains that maintenance was scheduled and expected
- Informs the user of the length of the outage
- Lets the user know when the system is expected to be available

### Bad example

**System is Down** The system is currently unavailable.

- Doesn’t indicate that maintenance was scheduled and expected
- Doesn’t inform the user how long the system will be unavailable
- Doesn’t let the user know when the system is expected to be available again
