# Grid

A 12 column responsive grid with support for automatic columns that makes it easy to lay out your application.

## When to use

Use the grid when you need to create structure within your application.

## When to use something else

## How it works

The Rivet grid consists of containers, rows, and columns.

### Containers

The container is meant to be a generic wrapper to add enough padding to the content of your application so that it doesn’t bump up against the sides of the viewport. They are centered by default. The container can be used as is without any other grid items inside, but it **is required to wrap all other grid elements**.

```
<div class="rvt-container-xl">
  <div class="rvt-row">
    <div class="rvt-cols">
      <span>Column</span>
    </div>
  </div>
</div>
```

#### Container sizes

All containers must be limited to a specific size. There are four variants that change the `max-width` of the container.

- `rvt-container-sm` = 640px
- `rvt-container-md` = 1024px
- `rvt-container-lg` = 1140px
- `rvt-container-xl` = 1380px

### Rows

The row uses `flexbox` to control the alignment and distribution of columns. **The row is required to wrap all column elements.**

#### Gutters

Gutters are modifier classes for rows, which control the space between columns. The class `rvt-row--loose` will create larger gutters, while the class `rvt-row--tight` will make them smaller.

```
<div class="rvt-container-xl">
  <div class="rvt-row rvt-row--loose">
    <div class="rvt-cols">
      <span>Column</span>
    </div>
  </div>
</div>
```

### Columns

The column serves as a vertical division within a row. Rows can be adjusted in many ways.

#### Automatic columns

The Rivet grid uses flexbox to evenly distribute columns by default. The example below would produce four, evenly distributed columns.

```
<div class="rvt-container-xl">
  <div class="rvt-row">
    <div class="rvt-cols">
      <span>Column</span>
    </div>
    <div class="rvt-cols">
      <span>Column</span>
    </div>
    <div class="rvt-cols">
      <span>Column</span>
    </div>
    <div class="rvt-cols">
      <span>Column</span>
    </div>
  </div>
</div>
```

##### Automatic responsive columns

Additional classes allow you to specify breakpoints (see Breakpoints below) at which your columns should become automatic columns. Until the screen size reaches the specified breakpoint, your column will take up the width of the row.

In the example below, each column will have 100% width, until the screen size reaches the `-lg` breakpoint. At that point, the columns will evenly distribute themselves.

```
<div class="rvt-container-xl">
  <div class="rvt-row">
    <div class="rvt-cols-lg">
      <span>Column</span>
    </div>
    <div class="rvt-cols-lg">
      <span>Column</span>
    </div>
    <div class="rvt-cols-lg">
      <span>Column</span>
    </div>
  </div>
</div>
```

#### Setting column widths

The Rivet grid system is a 12 grid system. This means that when explicitly setting column widths, the numbers **should always equal 12.**

```
<div class="rvt-container-xl">
  <div class="rvt-row">
    <div class="rvt-cols-4-md">
      <span>Column</span>
    </div>
    <div class="rvt-cols-4-md">
      <span>Column</span>
    </div>
    <div class="rvt-cols-4-md">
      <span>Column</span>
    </div>
  </div>
</div>
```

##### Mixing column widths with auto columns

You can also mix and match explicit column widths with automatic columns. For example, in the example below, the automatic columns will adjust to evenly distribute the remaining space.

```
<div class="rvt-container-xl">
  <div class="rvt-row">
    <div class="rvt-cols">
      <span>Column</span>
    </div>
    <div class="rvt-cols-6-md">
      <span>Column</span>
    </div>
    <div class="rvt-cols">
      <span>Column</span>
    </div>
  </div>
</div>
```

#### Push and Pull

When you need to change the visual order of the grid items, you can use `rvt-cols-push-*` and `rvt-cols-pull-*` modifiers.

```
<div class="rvt-container-xl">
  <div class="rvt-row">
    <div class="rvt-cols-4-md rvt-cols-push-8-md">
      <span>First column in source</span>
    </div>
    <div class="rvt-cols-8-md rvt-cols-pull-4-md">
      <span>Second column in source</span>
    </div>
  </div>
</div>
```

#### Right-align last item

You can right-align the final item in a grid by adding the `rvt-cols--last` modifier. This can be helpful when using set column widths that add up to less than 12 columns.

```
<div class="rvt-container-xl">
  <div class="rvt-row">
    <div class="rvt-cols-4-md">
      <span>Column/span>
    </div>
    <div class="rvt-cols-7-md rvt-cols--last">
      <span>Column</span>
    </div>
  </div>
</div>
```

### Breakpoints

For our purposes here, breakpoints are the pixel values related to screen size at which point something will respond. For example, if you use the `rvt-cols-4-md` class, your column will become an automatic column when the screen size is 740px or larger.

| Sass variable    | Viewport width (px) | Viewport width (rem) |
| ---------------- | ------------------- | -------------------- |
| \$breakpoint-sm  | 480px               | 30rem                |
| \$breakpoint-md  | 740px               | 46.25rem             |
| \$breakpoint-lg  | 1080px              | 67.5rem              |
| \$breakpoint-xl  | 1260px              | 78.75rem             |
| \$breakpoint-xxl | 1400px              | 87.5rem              |
