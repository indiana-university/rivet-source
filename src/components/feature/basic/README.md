# Feature

Call out important information in a structured manner

## When to use

Use the feature component when you want to display structured information prominently in your page. This is intended for details (often from a larger selection that is linked). This could include:

- Information about a course or service offered
- Details of an event
- A snippet from a full-length article or news item

## When to use something else

If you are writing a full-length article, you may wish to use HTML paragraph styles instead.

## Basic markup

Every feature component implementation begins with a `div` container with the `rvt-feature` class and two optional interior `div` containers with the class of `rvt-feature__image` and `rvt-feature__body`, respectively.

```
<div class="rvt-feature">
  <div class="rvt-feature__image">
  </div>
  <div class="rvt-feature__body">
  </div>
</div>
```

An `img` element should be placed within the `rvt-feature__image` div (if using). The `rvt-feature__body` tag can accept many different forms of markup; however, has special formatting for elements with the classes of `rvt-feature__title` or `rvt-feature__detail`.

```
<div class="rvt-feature">
  <div class="rvt-feature__image">
  </div>
  <div class="rvt-feature__body">
    <h2 class="rvt-feature__title">Lorem ipsum dolor sit</h2>
    <p class="rvt-feature__detail">Vero blanditiis eos aliquam.</p>
  </div>
</div>
```

## Common patterns

There are three common patterns for the feature component.

### Content

The content pattern consists of an image, title, detail, and a call to action (all of which are optional). When working with content-based information (such as creating a call out on the homepage for a service, etc.), it is best to consult this pattern.

#### Adding the markup

The content pattern for the feature component is very similar to the example above; however, this implementation is typically paired with the Action component, as seen below.

```
<div class="rvt-feature">
  <div class="rvt-feature__image">
  </div>
  <div class="rvt-feature__body">
    <h2 class="rvt-feature__title">Lorem ipsum dolor sit</h2>
    <p class="rvt-feature__detail">Vero blanditiis eos aliquam.</p>
    <div class="rvt-m-top-sm">
      <a href="" class="rvt-action">
        <span class="rvt-action__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
            <title>Asset 3</title>
            <path d="M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm3.7,15L12,21.75a1.14,1.14,0,0,1-.41.31A1.17,1.17,0,0,1,10.5,22,1.17,1.17,0,0,1,10,20.85a1.24,1.24,0,0,1,.26-.6L15.45,14,10.23,7.75A1.16,1.16,0,0,1,10,6.89a1.14,1.14,0,0,1,.41-.79,1.21,1.21,0,0,1,.86-.26,1.22,1.22,0,0,1,.79.41l5.67,6.82A1.45,1.45,0,0,1,18,14,1.49,1.49,0,0,1,17.7,15Z" fill="currentColor"/>
          </svg>
        </span>
        <span class="rvt-action__text">Vestibulum eu mollis est</span>
      </a>
    </div>
  </div>
</div>
```

### Events

The events pattern typically consists of an image, title, and multiple details (such as one for a date, one for the time, and one for a description).

#### Adding the markup

The content pattern for the feature component is very similar to the example above; however, this implementation typically features multiple details, as shown below. Oftentimes one of the `rvt-feature__detail` elements or the `rvt-feature__title` itself will include a link to an RSVP or other related page.

```
<div class="rvt-feature">
  <div class="rvt-feature__image">
  </div>
  <div class="rvt-feature__body">
    <h2 class="rvt-feature__title"><a href="#">Event name</a></h2>
    <p class="rvt-feature__detail">Date</p>
    <p class="rvt-feature__detail">Start time - End time</p>
    <p class="rvt-feature__detail">Description of event</p>
  </div>
</div>
```

### News

The news pattern typically consists of an image, title, and multiple details; however, often an author will be featured above the title.

#### Adding the markup

Like the event pattern, the news pattern will usually feature a link, most often to the full-text of the article or information about the author.

```
<div class="rvt-feature">
  <div class="rvt-feature__image">
  </div>
  <div class="rvt-feature__body">
    <p class="rvt-feature__detail"><a href="#">Author</p>
    <h2 class="rvt-feature__title"><a href="#">Lorem ipsum dolor sit</a></h2>
    <p class="rvt-feature__detail">Publish date</p>
    <p class="rvt-feature__detail">Short snippet from or summary of the article.</p>
  </div>
</div>
```

### Additional options

The feature component is by default vertically oriented; however, with the addition of the `rvt-feature--horizontal` CSS class, any of the above patterns can be switched to a horizontal orientation.

```
<div class="rvt-feature rvt-feature--horizontal">
  <div class="rvt-feature__image">
  </div>
  <div class="rvt-feature__body">
    <h2 class="rvt-feature__title">Lorem ipsum dolor sit</h2>
    <p class="rvt-feature__detail">Vero blanditiis eos aliquam.</p>
  </div>
</div>
```
