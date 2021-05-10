# Card
Use the card to visually group related information or represent items in a list.

## Usage
The Card has three variants that affect the way it behaves.

1. The default card
2. The `rvt-card--raised` variant which adds a box shadow, background color, and rounded corner to create a "raised" appearance
3. The `rvt-card--clickable` variant which makes the entire card a clickable link

### Raised variant
The raised variant is created by adding a `rvt-card--raised` modifier class to the main card container element. It will add a white background color, rounded corners, and a shadow to the card to give it a common card-link "raised" appearance.

### Clickable variant
The clickable variant is created by adding a `rvt-card--clickable` modifier class to the main card container element. This modifier will make the `a` element inside of the [card title element](#link-to-title-element-heading-below) cover the card element effectively making the entire card a clickable link.

### Do
- Use cards to represent items in a list.
- Use the _cover_ variant when the card only contains one link—a direct child of the `rvt-card__title` element.

### Don't
- Do not use the Raised variant as wrappers for multiple page sections. Cards are meant to draw attention to important parts of content on a page. If every part of the page is a card, the card is no longer effective as an attention getter.
- Do not use the cover variant if the card contains more than one link

## Card Elements
These are the elements that make up the card. The card container is the only required element in a card. All other elements are technically optional.

1. Container - `rvt-card` (*the only required element*)
1. Image - `rvt-card__image`
1. Body - `rvt-card__body`
1. Eyebrow - `rvt-card__eyebrow`
1. Title - `rvt-card__title`
1. Content - `rvt-card__content`
1. Meta - `rvt-card__meta`

### 1. Container
The main container element is the only element required to use the Card for although for most uses, other elements will come in handy.

#### 2. Image
The image element creates a container where an photos or graphics can be placed. For example when using a card to represent a blog post or news article.

#### 3. Body
The body element creates a small amount of padding around the main content of the card. It should come after and be a direct sibling of the image element.

#### 4. Eyebrow
The Eyebrow is an optional element that can be used to label content when needed. For example the category of a news story.

#### 5. Title
The tile element is used to display the title of the item a card is meant to represent. For example a blog post, or used as a link to another page on your website.

#### 6. Content
The content element is a container for supporting text content related to the item a card represents. For example, the short introduction or summary of a related page. Generally speaking the content element should contain one paragraph (`<p>`) element with the short description.

#### 7. Meta
The meta element should be the last element inside the card body element. The meta container should be used for metadata related to the item a card is meant to represent. For example the time that an entry was updated, or the date a news article was published.