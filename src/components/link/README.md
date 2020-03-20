# Link

Inline text links are used to navigate between documents (pages).

## When to use

- Navigating to a new page or view in your application
- Navigating to different web page, e.g. external documentation

## When to use something else

Use the button component for:
- Opening or closing a modal or dialog
- Triggering a dropdown menu
- Submitting data to the server

## Adding the markup

To mark up a link in Rivet, add the `a` HTML element.

```
<a href="#">This is a text link</a> on a light background.
```

To bold the link text, add the class `rvt-link-bold`.

<p>This is a <a href="#" class="rvt-link-bold">bolded link</a>.</p>
```

## Accessibility requirements

Never use a link to say "click here." A nondescript link forces users to backtrack and read the surrounding text for more context. This is even more problematic for those who rely on screen readers, which can list links for quicker navigation. A list of links reading "click here" isn’t helpful for anyone.

## Implementation notes

Your link should always describe where it will take users. Users tend to scan text online, and elements that stand out (like links) grab attention. Clear links can help users navigate more quickly.

For example, instead of:

> [Learn more](#)

Use:

> [Learn how to reset your passphrase](#)