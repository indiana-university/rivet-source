# Select

The select component creates a dropdown that allows users to choose one item from a list.

## When to use

Use the select element when you need to present users with a list of mutually exclusive options and they can **only select one option**.

## When to use something else

When you only need to present a user with three or less options, consider using a group of radio buttons instead.

## Adding the markup

The select component consists of a label, and a corresponding `select` element with the class `rvt-select`.

```
<label for="select-demo">Select input:</label>
<select class="rvt-select" id="select-demo">
    <option>Choose an option...</option>
    <option value="Option One">Option One</option>
    <option value="Option One">Option Two</option>
    <option value="Option One">Option Three</option>
    <option value="Option One">Option Four</option>
</select>
```

### Inline validation

Rivet provides the markup and styles for various states of inline form validation. These inline validation states should be used in combination with alerts to provide helpful validation error messages to users.

```
<label for="select-info-state">Type</label>
<select name="" id="example-info-state" class="rvt-validation-info" aria-describedby="inline-select">
    <option>Choose an option...</option>
    <option value="Option One">Option One</option>
    <option value="Option One">Option Two</option>
    <option value="Option One">Option Three</option>
    <option value="Option One">Option Four</option>
</select>
<div class="rvt-inline-alert rvt-inline-alert--info">
    <span class="rvt-inline-alert__icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g fill="currentColor">
                <path d="M8,16a8,8,0,1,1,8-8A8,8,0,0,1,8,16ZM8,2a6,6,0,1,0,6,6A6,6,0,0,0,8,2Z" />
                <path d="M8,12a1,1,0,0,1-1-1V8A1,1,0,0,1,9,8v3A1,1,0,0,1,8,12Z" />
                <circle cx="8" cy="5" r="1" />
            </g>
        </svg>
    </span>
    <span class="rvt-inline-alert__message" role="alert" id="inline-select">
        You must choose an option.
    </span>
</div>
```

## Implementation notes

### Labels

- Write the label as a word or phrase, not as a sentence, and end it with a colon
- Use sentence-style capitalization

### Options

- Don’t make the content of the select list or combo box (or its units label) part of a sentence
- Write each option as a word or phrase, not as a sentence, and use no ending punctuation
- Use parallel phrasing, and try to keep the length about the same for all options
- Sort options in a logical order — names in alphabetical order, numbers in numeric order, and dates in chronological order. Lists with 12 or more items should be sorted alphabetically to make items easier to find.
  - Exception: One or more common items may be placed at the beginning of an otherwise sorted set of options, such as placing “United States” at the top of a country select. When placing items out of order, always place a non-selectable separator (—) between the unsorted and sorted items.
