# Calendar Tile

A text-based graphic to represent a day

## When to use

Use the calendar tile component to visually reference a day. This could include:

- An event description
- A feed of upcoming events

## When to use something else

If you are constructing a calendar (visually representing calendar days individually with potentially multiple event listings), please consider using something else, such as a library.

## Adding the markup

The container for a calendar tile is made up of a `div` with a class of `rvt-cal`. The container accepts spans with the classes `rvt-cal__month` and `rvt-cal__day`. Both spans are optional, making it possible to use just the month, just the day, or both. For context, we prefer both month and day.

```
<div class="rvt-cal">
  <span class="rvt-cal__month">
  </span>
  <span class="rvt-cal__day">
  </span>
</div>
```
