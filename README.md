# Principles
Designers and developers can use this system as a foundation for great experiences across all UITS applications. They can also contribute to it—and make the system relevant to any team.

We want to hear about the patterns you need, but we need to make sure all patterns are cohesive. So, we’ve established these principles to help guide the creation process:

**Be clear.**
Make design decisions based on user needs. Design interfaces that help our users accomplish their goals quickly and easily.

**Be flexible.**
Our design system is for all types of UITS applications, even ones that have yet to be imagined. We need to design and build for flexibility.

**Be productive.**
Done is better than perfect. Iteration is only half the battle. Testing with users could reveal issues or questions we didn’t anticipate.

## Getting started
We are using [Fractal](http://fractal.build/guide) to generate the UITS design system components. Fractal is super versatile component library generator made by the folks at [Clear Left](https://clearleft.com/). It makes it super easy to create and document components all in one place.

Fractal is built in Node.js so it's a great choice for cross-platform development teams (Windows and Mac).

To get started working with the UITS design system you'll first need to make sure you have Node.js and NPM installed your system. Check if you have Node.js and NPM installed by running the following in your terminal:

```sh
node -v && npm -v
```

If you don't have Node and NPM installed, go to the Node.js website for instructions:

[Node.js](https://nodejs.org/en/download/)

### Working with the components
To get started working locally on your computer first clone or download this repo.

```sh
git clone https://github.iu.edu/UITS/rivet-source.git
cd rivet-source
```

Next you'll need to install it's dependencies via NPM:

```sh
npm install
```

After you've installed the dependencies, run `gulp dev:serve`. Then, navigate to [http://localhost:3000/](http://localhost:3000/) and you should see the Design System Welcome screen.

The default gulp task will watch all component templates (.hbs) and Sass (.scss) files and recompile and update on each change.

Read more about configuring components on the [Fractal webiste](http://fractal.build/guide/components).

## Submitting a Github issue
To help us understand the kind of contribution you want to make we ask that you first submit a Github issue. Here are a few guidelines to follow when creating a new issue:

1. Go to the Rivet repository on [GitHub](https://github.com/indiana-university/rivet-source/issues).
3. Click the "New Issue" button.
4. Fill out the provided issue template to the best of your ability. If you are submitting a design concept for a new or existing component please attach a screenshot, a link to an Axure mockup, or feel free to link to example HTML/CSS/javaScript (a link to pen on [Codepen](http://codepen.io/) would be great!).
5. After you have filled out the issue template click the **Submit new issue** button to create your new issue :tada:.
6. Once the team has had a chance to review the issue they will either mark it as **request**, or ask you for more information before moving on to the next steps.

## Submitting a pull request
1. Fork the main `rivet-source` repository and then clone your fork locally. Follow [these instructions on syncing your local fork](https://help.github.com/articles/fork-a-repo/#keep-your-fork-synced). Set your new `upstream` remote to point to https://github.iu.edu/UITS/rivet-source.git.
2. Create a new feature branch off of `develop` (the default branch) with the prefix `feature-` e.g. `feature-modal`
3. Commit your changes. Be sure to keep your commits narrow in scope and avoid committing changes not related to your feature.
4. Locally merge any upstream changes into your feature branch: `git pull upstream develop`
5. Push your feature branch to your fork: `git push origin feature-**your feature**`
6. [Open a pull request](https://help.github.com/articles/about-pull-requests/) with a title and clear description of your feature branch against `develop`

## Coding style
A lot of this taken from [this doc](https://github.com/airbnb/css/blob/master/README.md), because it's really good :100:

### HTML
- Use [BEM naming methodology](https://css-tricks.com/bem-101/) - “Block-Element-Modifier”
- 4 spaces for indentation
- Use valid HTML5 markup

### CSS & Sass

- 4 spaces for indentation
- Prefer dashes over camelCasing in class names.
- Underscores are ok for [BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- **Do not use ID selectors**
- When using multiple selectors in a rule declaration, give each selector its own line.
- Put a space before the opening brace { in rule declarations
- In properties, put a space after, but not before, the : character.
- Put closing braces } of rule declarations on a new line
- Put blank lines between rule declarations

### Rule declaration

**Not good**

```css
.selector-one {
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}

#lol-no {
  // ...
}
```

**Good**

```css
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```


### Comments
Make use comments as often as you can. It will help other developers understand your decisions and make it easier to maintain over time.

- Prefer CSS (not Sass) multiline comments anywhere that actual CSS will be compiled/output. Use Sass-style comments (e.g.. `//`) in code that doesn't output any actual CSS (variables, mixins, functions, etc).
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

### Testing Javascript
We use [Cypress](https://www.cypress.io/) to run automated end-to-end tests on Rivet's JavaScript components. To run tests do the following:

1. Start the local development server by typing `npm run start` in your terminal.
2. Once the development server is running, open a new terminal window and type `npm run cypress:test` to run the Cypress tests.
3. Check the output in your terminal to make sure all the tests ran successfully.