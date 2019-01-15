# Hey!
We're excited that you want to contribute to Rivet. If you're ever unsure about anything please feel free to [email us](mailto:rivet@iu.edu).

## Contributing to Rivet

### Outside contributions
We're happy to accept pull requests from contributors outside of Indiana University, but before we can merge the code they will need to sign a [Contributor License Agreement (CLA)](https://en.wikipedia.org/wiki/Contributor_License_Agreement). Although a signed CLA is required to merge pull requests, we are happy to accept bug reports via [GitHub issues](https://github.com/indiana-university/rivet-source/issues).

The Rivet team will reach out to outside contributors to initiate the CLA process once a pull request has been opened.

See the CONTRIBUTING.md file in the root of this repository for more information.

### Getting started with a contribution
The first step in contributing to Rivet is to submit your suggestions to the team. To submit your proposed contribution create a new issue on [GitHub](https://github.com/indiana-university/rivet-source/issues). Someone from the team will respond to your submission and the begin the review process. Visit the Rivet docs to [read more about the review process](https://rivet.iu.edu/components/information/contributing/#review-process).

### Submission requirements

**Each submission should include**:

- a fairly short descriptive title
- a clear description of the need or problem your design solves
- **at least one** of the following: screenshots/images of you rendered design, wireframes, design mockups, links ([Codepen](http://codepen.io/), [jsFiddle](https://jsfiddle.net/), etc.), Axure mockups, iPhone photo of a napkin sketch :pencil:
- if you are proposing a content change, please include a draft of  the text content you're recommending
- any other document, links, research you would like to include

### Review process
After the Github issue is created and the submission has enough information and supporting materials (i.e. issue template is completely filled out) someone from the team will mark the issue as **request**. Otherwise, someone from the team will ask the submitter for further information/documentation and mark the issue as **needs more info**.

#### Review criteria
Once we have enough info the Rivet team will do a review of the proposed design based on the following criteria:

**Note**: Using the criteria from [this document](https://github.com/18F/web-design-standards/wiki/Contribution-Guidelines%3A-Design) which is super thorough and has a lot of great ideas for how to structure this type of process.

- **Usability** — Is the interaction flow clearly documented? Is the pattern responsive?
- **Accessibility** — Is the pattern accessible to all intended audiences?
- **Visual design** — Is the contribution consistent with our visual style?
- **Content** — Does the pattern have plain language, correct spelling, and grammar? Does the author clearly describe actions?

If the team decides to not move forward with the design submission the issue will be closed and the contributor will be notified.

## Submitting a Github issue
To help us understand the kind of contribution you want to make we ask that you first submit a Github issue. Here are a few guidelines to follow when creating a new issue:

1. Go to the Rivet repository on [GitHub](https://github.com/indiana-university/rivet-source/issues).
3. Click the "New Issue" button.
4. Fill out the provided issue template to the best of your ability. If you are submitting a design concept for a new or existing component please attach a screenshot, a link to an Axure mockup, or feel free to link to example HTML/CSS/javaScript (a link to pen on [Codepen](http://codepen.io/) would be great!).
5. After you have filled out the issue template click the **Submit new issue** button to create your new issue :tada:.
6. Once the team has had a chance to review the issue they will either mark it as **request**, or ask you for more information before moving on to the next steps.

## Submitting a pull request
1. Fork the main `rivet-source` repository and then clone your fork locally. Follow [these instructions on syncing your local fork](https://help.github.com/articles/fork-a-repo/#keep-your-fork-synced). Set your new `upstream` remote to point to `https://github.com/indiana-university/rivet-source.git`.
2. Create a new feature branch off of `develop` (the default branch) with the prefix `feature/` e.g. `feature/modal`
3. Commit your changes. Be sure to keep your commits narrow in scope and avoid committing changes not related to your feature.
4. Locally merge any upstream changes into your feature branch: `git pull upstream develop`
5. Push your feature branch to your fork: `git push origin feature/**your feature**`
6. [Open a pull request](https://help.github.com/articles/about-pull-requests/) with a title and clear description of your feature branch against `develop`

## Coding style
A lot of this taken from [this doc](https://github.com/airbnb/css/blob/master/README.md), because it's really good :100:

### HTML
- Use [BEM naming methodology](https://css-tricks.com/bem-101/) - “Block-Element-Modifier”
- 2 spaces for indentation
- Use valid HTML5 markup

### CSS & Sass
- 2 spaces for indentation
- Prefer dashes over camelCasing in class names.
- Underscores are ok for [BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- **Do not use ID selectors**
- When using multiple selectors in a rule declaration, give each selector its own line.
- Put a space before the opening brace { in rule declarations
- In properties, put a space after, but not before, the : character.
- Put closing braces } of rule declarations on a new line
- Put blank lines between rule declarations

### Comments
Make use comments as often as you can. It will help other developers understand your decisions and make it easier to maintain over time.

- Prefer CSS (not Sass) multi-line comments anywhere that actual CSS will be compiled/output. Use Sass-style comments (e.g.. `//`) in code that doesn't output any actual CSS (variables, mixins, functions, etc).
- Use lots of white space in your comments. It makes code easier to scan and comments easier to read. Comments should have at least one blank line above and below them.
- Break comments that exceed 80 characters on to new lines (see below).

#### Examples

```css

/**
 * This is a really nice comment that helps other people.
 */

```

**Longer multi-line comments**
```css

/**
 * This
 * This is a comment that is very descriptive which is good.
 * Try to keep the line length of comments to 75-80 characters
 * so that they are easier to read.
 */

```

### javaScript (WIP)
- 2 spaces
- single quotes
