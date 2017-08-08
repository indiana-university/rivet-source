# Grid
A 12 column responsive grid with support for automatic columns that makes it easy to lay out your application.

## About the grid
The Rivet grid is a mobile-first grid system based on flexbox. It is based on five screen sizes and uses CSS classes to specify how many columns the grid should have at each of these screen sizes.

## The container

The `.rvt-container` is the basic layout unit in Rivet. A basic `.rvt-container` element is fluid by default. It will take up the full width of the view port with a default of `1.5rem` of padding on the left and right sides.

The container is meant to be a generic wrapper to add enough padding to the content of you application so that it doesn't bump up against the side of the viewport. The container can be used as is without any other grid items inside, but it is required to wrap all other grid elements.

### Container sizes

If you need to constrain the `.rvt-container` to a fixed size there are four modifier classes that will set a max-width on the container.

They are:

- `.rvt-container--freshman` = 640px
- `.rvt-container--sophomore` = 1024px
- `.rvt-container--junior` = 1140px
- `.rvt-container--senior` = 1380px

### Centering a container

To center a container that you have given a max-width using the modifier classes above, you can add the modifier class `.rvt-container--center`.

## Automatic columns

The rivet grid uses the power of flexbox to evenly distribute children marked up with the CSS class `.rvt-grid__item`  evenly inside of a parent `.rvt-grid`  container. So a `.rvt-grid` parent with four `.rvt-grid__items` create four columns with equal widths. See the example below.

```html
<!-- This markup will create 4 equal-width columns -->
<div class="rvt-container">
    <div class="rvt-grid">
        <div class="rvt-grid__item">
            Grid item contents...
        </div>
        <div class="rvt-grid__item">
            Grid item contents...
        </div>
        <div class="rvt-grid__item">
            Grid item contents...
        </div>
        <div class="rvt-grid__item">
            Grid item contents...
        </div>
    </div>
</div>
```

### Responsive automatic columns

Automatic columns will be distributed equally a all screen sizes by default. You can use additional responsive auto grid CSS class to specify the screen size at which you would like your grid to become an auto grid.

In the example below, we've used the `-lg` suffix on the `.rvt-grid__item` CSS class. This will make a grid that starts out collapsed into a single column on all screens up to large screens (1080px wide), at which point it will become an auto grid and each `.rvt-grid__item-lg` will become an evenly distributed column.

This convention will work for any of Rivet's named break points: `-sm`, `-md`, `-lg`, `-xl`, `-xxl`. The example below will start out stacked on small screens and become a grid of five equal-width columns at large screens (1080px) and wider.

```html
<div class="rvt-container">
    <div class="rvt-grid">
        <div class="rvt-grid__item-lg">
            Large auto grid contents...
        </div>
        <div class="rvt-grid__item-lg">
            Large auto grid contents...
        </div>
        <div class="rvt-grid__item-lg">
            Large auto grid contents...
        </div>
        <div class="rvt-grid__item-lg">
            Large auto grid contents...
        </div>
        <div class="rvt-grid__item-lg">
            Large auto grid contents...
        </div>
    </div>
</div>
```

## Setting column widths

You can set a specific number of columns you want grid items to span by adding the number of columns to the responsive grid classes. For example, adding the class `.rvt-grid__item-6-md-up` would make a grid item span six columns at medium screens (740px) and larger.

When you explicitly set column widths, remember that the total number of columns **should always equal 12 columns**.

```html
<div class="rvt-container rvt-container--junior vt-container--center">
    <div class="rvt-grid">
        <div class="rvt-grid__item-4-md-up">
            4 columns medium and up
        </div>
        <div class="rvt-grid__item-4-md-up">
            4 columns medium and up
        </div>
        <div class="rvt-grid__item-4-md-up">
            4 columns medium and up
        </div>
    </div>
</div>
```

### Mixing column widths with auto columns

It's also possible to mix and match specified columns with `.rvt-grid__item` auto columns. The grid items with specified columns will span the specified amount of columns and any auto grid items will fill the remaining space.

It's important to note that the auto grid items will stack at whichever grid breakpoint you specify on the non-auto grid item(s). In the example below we are using `.rvt-grid__item-6-md-up` to set a width of six columns on medium screens and larger, so the auto grid items will inherit the same behavior.

```html
<div class="rvt-container">
    <div class="rvt-grid">
        <div class="rvt-grid__item">
            <span><code>.rvt-grid__item</code></span>
        </div>
        <div class="rvt-grid__item-6-md-up">
            <span><code>.rvt-grid__item-6-md-up</code></span>
        </div>
        <div class="rvt-grid__item">
            <span><code>.rvt-grid__item</code></span>
        </div>
    </div>
</div>
```

## Push and pull

When you need to change the visual order of the grid items you can use `.rvt-grid__item-push-*` and `.rvt-grid__item-pull-*` modifiers.

```html
<div class="rvt-container">
    <div class="rvt-grid">
        <div class="rvt-grid__item-4-md-up rvt-grid__item-push-8-md">
            <span>I'm first in the source order</span>
        </div>
        <div class="rvt-grid__item-8-md-up rvt-grid__item-pull-4-md">
            <span>I'm second in the source order</span>
        </div>
    </div>
</div>
```

## Nesting

You can nest new `.rvt-grid`(s) inside of `.rvt-grid__item-*`(s) if you need more control over your layout.

```html
<div class="rvt-container">
    <div class="rvt-grid">
        <div class="rvt-grid__item-7-md-up rvt-grid__item-9-lg-up">
            Level one content...
            <div class="rvt-grid">
                <div class="rvt-grid__item-7-md-up rvt-grid__item-9-lg-up">
                    <div>
                        Level Two...
                    </div>
                </div>
                <div class="rvt-grid__item-5-md-up rvt-grid__item-3-lg-up">
                    Level Two content...
                </div>
            </div>
        </div>
        <div class="rvt-grid__item-5-md-up rvt-grid__item-3-lg-up">
            Level one content...
        </div>
    </div>
</div>
```
