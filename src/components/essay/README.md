# Essay

Prominently display meaningful statistics and relevant imagery.

## When to use

Use the essay component when you want to display data relevant to your webpage, such as:

- The number of students in a program
- A number related to the rank of a program

## When to use something else

- If you need to share more than 2-6 pieces of information, consider using an ordered list.
- If each piece of information contains a paragraph or more of text, consider using an ordered list.

## Adding the markup

The essay component consists of a `div` element with the class `rvt-essay`, which encloses up to three `div` elements with the class `rvt-essay__column`.

```
<div class="rvt-essay">
  <div class="rvt-essay__column">
  </div>
</div>
```

To include a statistic within the column, add a `div` with the class `rvt-essay__stat`. Then add a `div` with the class `rvt-essay__stat-number` with the number, and a `div` with the class `rvt-essay__stat-caption` with information which qualifies the number.

```
<div class="rvt-essay">
  <div class="rvt-essay__column">
    <div class="rvt-essay__stat">
      <div class="rvt-essay__stat-number">1496</div>
      <div class="rvt-essay__stat-caption">students</div>
    </div>
  </div>
</div>
```

To include an image within the column, add a `div` with the class `rvt-essay__image`. Then, set the `background-image` to your image of choice.

```
<div class="rvt-essay">
  <div class="rvt-essay__column">
    <div class="rvt-essay__image" style="background-image: url('https://www.fillmurray.com/600/400');">
    </div>
  </div>
</div>
```

Essays can be composed of both stat blocks, and images.

```
<div class="rvt-essay">
  <div class="rvt-essay__column">
    <div class="rvt-essay__image" style="background-image: url('https://www.fillmurray.com/600/400');"></div>
  </div>
  <div class="rvt-essay__column">
    <div class="rvt-essay__stat">
      <div class="rvt-essay__stat-number">1496</div>
      <div class="rvt-essay__stat-caption">students</div>
    </div>
  </div>
</div>
```

And multiple columns.

```
<div class="rvt-essay">
  <div class="rvt-essay__column">
    <div class="rvt-essay__image" style="background-image: url('https://www.fillmurray.com/600/400');"></div>
    <div class="rvt-essay__stat">
      <div class="rvt-essay__stat-number">1</div>
      <div class="rvt-essay__stat-caption">program</div>
    </div>
  </div>
  <div class="rvt-essay__column">
    <div class="rvt-essay__stat">
      <div class="rvt-essay__stat-number">1496</div>
      <div class="rvt-essay__stat-caption">students</div>
    </div>
    <div class="rvt-essay__image" style="background-image: url('https://www.fillmurray.com/600/400');"></div>
  </div>
</div>
```

### Additional options

#### Large images

The essay component allows for images. By default images are the same size as stat blocks; however, there is a large variant, which allows the image to take up twice the height of a normal image. To use the large variant, add the `rvt-essay__image--large` modifier to the `div` with the class `rvt-essay__image`.

```
<div class="rvt-essay">
  <div class="rvt-essay__column">
    <div class="rvt-essay__image rvt-essay__image--large" style="background-image: url('https://www.fillmurray.com/600/400');">
    </div>
  </div>
</div>
```

#### Stat links

Stat blocks can be transformed into links by switching out the outer `div` element for an `a` tag.

```
<div class="rvt-essay">
  <div class="rvt-essay__column">
    <a href="#" class="rvt-essay__stat">
      <div class="rvt-essay__stat-number">1496</div>
      <div class="rvt-essay__stat-caption">students</div>
    </a>
  </div>
</div>
```

#### Background colors

Stat blocks are set up to handle additional background color options. The classes `rvt-bg-crimson` and `rvt-bg-crimson-dark` can be added to stat items. This will change the `background-color` to the specified color, and change the text to `#ffffff`.

```
<div class="rvt-essay">
  <div class="rvt-essay__column">
    <div class="rvt-essay__stat rvt-bg-crimson-dark">
      <div class="rvt-essay__stat-number">1496</div>
      <div class="rvt-essay__stat-caption">students</div>
    </div>
  </div>
</div>
```
