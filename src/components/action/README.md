# Action

Provide visible and concise path forward to a user

## When to use

Use the action component when you want to spur users on to a desired endpoint. This could include:

- A link at the bottom of a featured event to encourage users to RSVP
- A link at the bottom of a call out send users to more complete information about something

## When to use something else

If you need a link within a body of text, consider using HTML links instead.

## Adding the markup

The action component consists of three parts. The first piece is a link with the CSS class `rvt-action`. The link wraps around two spans - one for the icon and one for the link text. The icon span receives the class `rvt-action__icon`. An `SVG` can be placed within this span. The span for the link's text receives the class `rvt-action__text`.

Please note, the action component is intended for use on light backgrounds. A `reverse` variant is available for use on dark backgrounds. For more details, please see `Additional options` below.

```
<a href="#0" class="rvt-action">
  <span class="rvt-action__icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
  <title>Asset 3</title>
  <path d="M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm3.7,15L12,21.75a1.14,1.14,0,0,1-.41.31A1.17,1.17,0,0,1,10.5,22,1.17,1.17,0,0,1,10,20.85a1.24,1.24,0,0,1,.26-.6L15.45,14,10.23,7.75A1.16,1.16,0,0,1,10,6.89a1.14,1.14,0,0,1,.41-.79,1.21,1.21,0,0,1,.86-.26,1.22,1.22,0,0,1,.79.41l5.67,6.82A1.45,1.45,0,0,1,18,14,1.49,1.49,0,0,1,17.7,15Z" fill="currentColor"/>
</svg>
  </span>
  <span class="rvt-action__text">Read more about Admissions</span>
</a>
```

### Additional options

The action component is intended for use with light backgrounds by default. Should you need to use an action component on a dark background, add the `rvt-action--reverse` CSS class.

```
<a href="#0" class="rvt-action rvt-action--reverse">
  <span class="rvt-action__icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
  <title>Asset 3</title>
  <path d="M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm3.7,15L12,21.75a1.14,1.14,0,0,1-.41.31A1.17,1.17,0,0,1,10.5,22,1.17,1.17,0,0,1,10,20.85a1.24,1.24,0,0,1,.26-.6L15.45,14,10.23,7.75A1.16,1.16,0,0,1,10,6.89a1.14,1.14,0,0,1,.41-.79,1.21,1.21,0,0,1,.86-.26,1.22,1.22,0,0,1,.79.41l5.67,6.82A1.45,1.45,0,0,1,18,14,1.49,1.49,0,0,1,17.7,15Z" fill="currentColor"/>
</svg>
  </span>
  <span class="rvt-action__text">Read more about Admissions</span>
</a>
```
