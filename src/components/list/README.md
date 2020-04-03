# List

Group and organize collections of content.

## When to use

- Use unordered lists when your collection has no specific order.
- Use ordered lists when you want to display content in some specific order like ranking or a series of steps in a process.
- Use definition lists to display groups of terms with descriptions like a glossary or other metadata.

## Adding the markup

Lists can be divided into three types - ordered, unordered, and definitions.

### Ordered lists

Ordered lists are created by wrapping an `ol` tag around `li` tags. Each `li` tag represents an item in the ordered list.

```
<ol>
    <li>List Item One</li>
    <li>List Item Two</li>
    <li>List Item Three</li>
    <li>List Item Four</li>
</ol>
```

### Unordered lists

Unordered lists are created by wrapping an `ul` tag around `li` tags. Each `li` tag represents an item in the unordered list.

```
<ul>
    <li>List Item One</li>
    <li>List Item Two</li>
    <li>List Item Three</li>
    <li>List Item Four</li>
</ul>
```

#### Additional options

##### Plain lists

You can use the helper class `rvt-plain-list` to remove list formatting for display purposes.

```
<ul class="rvt-plain-list">
    <li>List Item One</li>
    <li>List Item Two</li>
    <li>List Item Three</li>
    <li>List Item Four</li>
</ul>
```

##### Inline lists

You can use the helper class `rvt-inline-list` to remove list formatting and display list items inline. These items will have some extra right and bottom margin applied to them (for instance, where they flow onto more than one line).

```
<ul class="rvt-inline-list">
    <li>List Item One</li>
    <li>List Item Two</li>
    <li>List Item Three</li>
    <li>List Item Four</li>
</ul>
```

### Definition lists

Definition lists are created by wrapping an `dl` tag around `dt` and `dd` tags. Each `dt` tag represents a term in the definition list. It can be paired with any number of `dd` tags, which represent the definitions.

## Implementation notes

- Maintain a parallel structure. If you begin a list item with a verb, all others should begin with a verb too.
- Don’t include punctuation unless a complete sentence follows in the same bullet (like in the sentence above)
