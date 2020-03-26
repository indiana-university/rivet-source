# Media object

The media object is a simple layout component that can generally be used to display items in a list of content.

## Adding the markup

The media object component is made up of three content areas nested inside a main `.rvt-mo` wrapper:

`.rvt-mo__prepend` (1)
`.rvt-mo__main` (2)
`.rvt-mo__append` (3)

### Basic media object

The simplest media object configuration consists of a wrapper element with the `.rvt-mo` class, a child element with the `.rvt-mo__prepend` class, and a second child element with the `.rvt-mo__main` class.

In this example, we've created a simple avatar to place inside the element with the `.rvt-mo__prepend` class. Some [Rivet spacing utility classes](#) are used to add small amounts of padding between each area of the media object.

```
<div class="rvt-mo">
  <div class="rvt-mo__prepend">
    <!-- Inline styles are for demo purposes only -->
    <div>
      <img src="https://www.fillmurray.com/g/200/200" alt="">
    </div>
  </div>
  <div class="rvt-mo__main">
    <a href="#" class="rvt-link-bold rvt-ts-18">Rivet 1.2.0 is now available!</a>
    <div class="rvt-ts-14">Updated Sept. 24 by <strong>bmacklin</strong></div>
  </div>
</div>
```

### Using media objects to represent records

You can add buttons and form elements to a media object, allowing you to represent an entry in a list of [CRUD application](#) records that a user can interact with.

The example below features a [checkbox](#) in the `.rvt-mo__prepend` area (for record selection) and a dropdown in the `.rvt-mo__append` area (for record actions or configuration):

```
<div class="rvt-mo">
  <div class="rvt-mo__prepend">
    <input id="check-1" type="checkbox" aria-describedby="option-1-title">
    <label for="check-1">
      <span class="rvt-sr-only">Select this item</span>
    </label>
  </div>
  <div class="rvt-mo__main">
    <div href="#" class="rvt-text-bold rvt-ts-18" id="option-1-title">Rivet 1.2.0 is now available!</div>
    <div>
      <span class="rvt-ts-14">Updated Sept. 24 by bmacklin</span>
      <span class="rvt-badge">Updated</span>
    </div>
  </div>
  <div class="rvt-mo__append">
    <div class="rvt-dropdown">
      <button class="rvt-button rvt-button--small rvt-button--plain" type="button" data-dropdown-toggle="dropdown-1"
        aria-haspopup="true" aria-expanded="false">
        <span class="rvt-sr-only">Application menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g fill="currentColor">
            <circle cx="8" cy="8" r="2"></circle>
            <circle cx="14" cy="8" r="2"></circle>
            <circle cx="2" cy="8" r="2"></circle>
          </g>
        </svg>
      </button>
      <div class="rvt-dropdown__menu rvt-dropdown__menu--right" id="dropdown-1" role="menu" aria-hidden="true">
        <button type="button" role="menuitemradio">Notify all</button>
        <button type="button" role="menuitemradio" aria-checked="true">Notify admins</button>
        <button type="button" role="menuitemradio">Notify contributors</button>
      </div>
    </div>
  </div>
</div>
```

#### Combining media object and box components

You can combine the media object component with the [box component](#) to create list views for complex content. This combination can be used in place of tables when displaying lists of records that are not tabular data.

```
<div class="rvt-box">
  <div class="rvt-box__header">
    Messages
  </div>
  <div class="rvt-box__row">
    <div class="rvt-mo">
      <div class="rvt-mo__prepend">
        <div style="width: 2rem; height: 2rem; border-radius: 999rem; overflow: hidden;" class="rvt-m-right-sm">
          <img src="https://www.fillmurray.com/g/200/200" alt="">
        </div>
      </div>
      <div class="rvt-mo__main">
        <a href="#" class="rvt-link-bold rvt-ts-18">Rivet 1.2.0 is now available!</a>
        <div class="rvt-ts-14">Updated Sept. 24 by <strong>bmacklin</strong></div>
      </div>
    </div>
  </div>
  <div class="rvt-box__row">
    <div class="rvt-mo">
      <div class="rvt-mo__prepend">
        <div style="width: 2rem; height: 2rem; border-radius: 999rem; overflow: hidden;" class="rvt-m-right-sm">
          <img src="https://www.fillmurray.com/g/200/200" alt="">
        </div>
      </div>
      <div class="rvt-mo__main">
        <a href="#" class="rvt-link-bold rvt-ts-18">Rivet 1.2.0 is now available!</a>
        <div class="rvt-ts-14">Updated Sept. 24 by <strong>bmacklin</strong></div>
      </div>
    </div>
  </div>
  <div class="rvt-box__row">
    <div class="rvt-mo">
      <div class="rvt-mo__prepend">
        <div style="width: 2rem; height: 2rem; border-radius: 999rem; overflow: hidden;" class="rvt-m-right-sm">
          <img src="https://www.fillmurray.com/g/200/200" alt="">
        </div>
      </div>
      <div class="rvt-mo__main">
        <a href="#" class="rvt-link-bold rvt-ts-18">Rivet 1.2.0 is now available!</a>
        <div class="rvt-ts-14">Updated Sept. 24 by <strong>bmacklin</strong></div>
      </div>
    </div>
  </div>
</div>
```

## Implementation notes

### Media object content areas

Each of the three media object areas (`.rvt-mo__prepend`, `.rvt-mo__main`, `.rvt-mo__append`) will expand to fit the content you put inside of them, but you should try to maintain an approximate ratio where the the main content area (`.rvt-mo__main`) takes up the majority of the width of the row, and the two supplemental areas (`.rvt-mo__prepend` and `.rvt-mo__append`) fill the remaining space.

### Media objects and the grid

The media object is designed to be a simple layout aid used for displaying lists of non-tabular items with similar content. You should not use [the Rivet grid](#) inside any of the media object content areas shown in [the previous example](#).