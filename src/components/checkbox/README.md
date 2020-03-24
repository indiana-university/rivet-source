# Checkbox

Checkboxes allow users to select one or more options from a list of choices.

## When to use

Use checkboxes to allow users to pick zero, one, or many options from a list of values. A checkbox is a good choice when you need to present users a single option that they can turn on or off.

## When to consider something else

When you need to present users with a list of mutually exclusive options and they can select only one option, consider using a list of [radio buttons](#) or a [select input](#).

## Adding the markup

The checkbox component is made up of a `form` element wrapping a `fieldset`. Inside the fieldset, there is a `legend` that is set to screenreader only using the class `rvt-sr-only`. Following the legend, there's a `ul` with the class `rvt-inline-list`, and each list item contains a checkbox option: `input[type="checkbox"]` and `label`. The `id` must match with each `input[type="checkbox"]` and `label` pair, and the `name` attribute assigned to each of the `input` elements is the same for each `form`.

```
<form>
    <fieldset>
        <legend class="rvt-sr-only">Checkboxes inline</legend>
        <ul class="rvt-inline-list">
            <li>
                <input type="checkbox" name="checkbox-demo" id="checkbox-1">
                <label for="checkbox-1">Option one</label>
            </li>
            <li>
                <input type="checkbox" name="checkbox-demo" id="checkbox-2">
                <label for="checkbox-2">Option two</label>
            </li>
        </ul>
    </fieldset>
</form>
```