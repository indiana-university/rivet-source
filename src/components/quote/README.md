# Quote
Call prominent attention to a quotation using large text and a citation

## When to use
Use the quote component when you have a quotation that you would like to display prominently in your page. This could include:

- A sentence or short phrase, attributed to a specific person
- A short testimonial from a user about a specific product

## When to use something else
If the quote is too long to easily read, consider using the HTML `blockquote` element or HTML paragraph styles instead.

## Adding the markup

The container for a quote is made up of a `div` with a class of `rvt-quote`.

```
<div class="rvt-quote">

</div>
```

The visual display of the quote is made up of a `blockquote` element with a class of `rvt-quote__text`, a `p` element with the quote's text.

```
<div class="rvt-quote">
  <blockquote class="rvt-quote__text">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </blockquote>
</div>
```

If you would like to include an avatar image with the quote, the avatar markup can be added before the `blockquote`. You will also need to add a CSS modifier class to the `rvt-quote` element.

```
<div class="rvt-quote rvt-quote--avatar">
  <div class="rvt-avatar rvt-avatar--md">
    <img class="rvt-avatar__image" src="http://www.fillmurray.com/300/300" alt="">
  </div>

  <blockquote class="rvt-quote__text">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p class="rvt-quote__citation">
      <span class="rvt-quote__title">Author Name</span>
      <span class="rvt-qutoe__subtitle">Writer of books, PhD</span>
    </p>
  </blockquote>
</div>
```