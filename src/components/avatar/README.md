# Avatar
A text or image-based graphic to represent a person or user

## When to use
Use the avatar component to visually represent a person within content or a user interface. This could include:

- A photo avatar of a person who said a quote (such as when used within the `quote` component)
- A text or image avatar to represent a user who is logged into a system (such as when used within the `identity module` in a `header`)

## When to use something else
The image avatar should be used with raster images. If a vector graphic is desired, consider using something like a SVG instead.

## Adding the markup

The container for an avatar is made up of a `div` with a class of `rvt-avatar`.

```
<div class="rvt-avatar">

</div>
```

A modifier class can also be added to determine the size of the avatar. In this example, the size of the avatar has been set to extra small (`xs`).

```
<div class="rvt-avatar rvt-avatar--xs">

</div>
```

### Image avatars

Image avatars are made up of an `img` element with the class `rvt-avatar__image` and a `src` attribute pointing to the image. In this example, an external image has been included within an avatar set to medium (`md`).

```
<div class="rvt-avatar rvt-avatar--md">
    <img class="rvt-avatar__image" src="http://www.fillmurray.com/300/300" alt="">
</div>
```

### Text avatars

Text avatars are made up of two letter initials within a span with the class `rvt-avatar__text`. In this example, the letters "XL" have been included within an avatar set to extra large (`xl`). The font-size of the text will scale appropriately with the size of the avatar.

```
<div class="rvt-avatar rvt-avatar--xl">
    <span class="rvt-avatar__text">XL</span>
</div>
```

### Responsive avatars

Avatars can be made to resize based on browser viewpoint breakpoints. This is accomplished by adding a responsive modifier class. In this example, the avatar is the default size until the viewport reaches the medium breakpoint size, when it will be resized to extra large.

```
<div class="rvt-avatar rvt-avatar--xl-md-up">
    <span class="rvt-avatar__text">XL</span>
</div>
```