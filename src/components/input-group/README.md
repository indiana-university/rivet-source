# Input Groups

Use input groups to combine a text input with an action button or dropdown menu.

## Adding the markup

An input group is composed of several elements. Like other inputs, the input group must have a standalone `label` element. Next is `div` wrapper with the class `rvt-input-group` which encases the remaining elements. Within the `div` is an `input` element with the class `rvt-input-group__input`.

Finally, there are two options for how to display the action button or dropdown menu. If the component is within a `div` element with the class `rvt-input-group__append`, and is placed after the `input` element, it will appear to the right of the text input. If the component is within a `div` element with the class `rvt-input-group__prepend`, and is placed before the `input` element, it will appear to the left of the text input.

```
// Input group with action button on the right of the input
<label for="search" class="rvt-sr-only">Search</label>
<div class="rvt-input-group">
    <input class="rvt-input-group__input" type="text" id="search">
    <div class="rvt-input-group__append">
        <button class="rvt-button">Search docs</button>
    </div>
</div>

// Input group with dropdown on the left of the input
<label for="segmented-prepend" class="rvt-sr-only">Add new</label>
<div class="rvt-input-group rvt-m-top-xl">
    <div class="rvt-input-group__prepend">
        <div class="rvt-dropdown">
            <button type="button" class="rvt-button rvt-p-right-xs rvt-p-left-xs" data-dropdown-toggle="segmented-prepend-example">
                <span class="rvt-m-right-xs">Filter</span>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"/>
                </svg>
            </button>
            <div class="rvt-dropdown__menu" role="menu" aria-hidden="true" id="segmented-prepend-example">
                <button type="button" role="menuitemradio">My Stuff</button>
                <button type="button" role="menuitemradio" aria-checked="true">All stuff</button>
                <button type="button" role="menuitemradio">Archives</button>
            </div>
        </div>
    </div>
    <input class="rvt-input-group__input" type="text" id="segmented-prepend">
</div>
```

## Implementation notes

- Form <label>s must be outside of the `rvt-input-group` container
- Inputs inside an input group need a label. If you don’t want them to visually appear in your design, use the `rvt-sr-only` utility class to hide them visually, but still make them available to assistive technology like a screen reader.
- The input group `rvt-input-group__text` elements are not replacements for the standard <label> element. They are only meant to help describe certain form inputs.
- When using `rvt-input-group__text`, give the input an `aria-describedby` attribute associated with the `id` of the text, as in the following examples.

```
<label for="text-append-example">Email address</label>
<div class="rvt-input-group">
    <input class="rvt-input-group__input" type="text" id="text-append-example" aria-describedby="email-text">
    <div class="rvt-input-group__append">
        <div class="rvt-input-group__text" id="email-text">@iu.edu</div>
    </div>
</div>

<label for="text-prepend-example" class="rvt-sr-only">Website</label>
<div class="rvt-input-group rvt-m-top-xl">
    <div class="rvt-input-group__prepend">
        <div class="rvt-input-group__text" id="website-text">http(s)</div>
    </div>
    <input class="rvt-input-group__input" type="text" id="text-prepend-example" aria-describedby="website-text">
</div>
```
