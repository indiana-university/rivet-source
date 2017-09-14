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
git clone https://github.iu.edu/UITS/uitsds.git
cd uitsds
```

Next you'll need to install it's dependencies via NPM:

```sh
npm install
```

After you've installed the dependencies, run `gulp dev:serve`. Then, navigate to [http://localhost:3000/](http://localhost:3000/) and you should see the Design System Welcome screen.

The default gulp task will watch all component templates (.hbs) and Sass (.scss) files and recompile and update on each change.

Read more about configuring components on the [Fractal webiste](http://fractal.build/guide/components).

## Deployment
To make it easier to share work in progress, commits to this repo are deployed automatically [using Webhooks](https://github.iu.edu/UITS/uitsds/settings/hooks) to [https://uitsdsgn.webtest.iu.edu/BRANCH-NAME](https://uitsdsgn.webtest.iu.edu/uitsds), where `BRANCH-NAME` is the name of the branch you are committing to. Commits to the `master` and `develop` branches will deploy to the default https://uitsdsgn.webtest.iu.edu/uitsds directory. Directories on webtest are deleted when their corresponding branch is deleted on github.

### Deployment process
The deployment process uses [Webhooks](https://github.iu.edu/UITS/uitsds/settings/hooks) to trigger a php script on the webtest server. The repo is checked out and built, and then the `_build` directory is copied to a subdirectory of wwws reflecting the name of the branch. Deployment takes about a minute to pull, build, and copy. If you encounter issues with deployment, you can check the recent deliveries of the Webhooks, where you can redeliver a Webhook payload to fire the script again:

`push` webhook: https://github.iu.edu/UITS/uitsds/settings/hooks/1053

`delete` webhook: https://github.iu.edu/UITS/uitsds/settings/hooks/1066

## Submitting a pull request
Work in progress...

This should be pretty standard Github branching stuff. We have a larger discussion about whether or not to follow specific workflow models like [Gitflow](https://danielkummer.github.io/git-flow-cheatsheet/) once we get into doing actual releases, etc...

### Pull request basics

- Fork repo, or ask to be added as a member? I dunno...
- Branches that are never deleted:
	- `develop`
	- `master`
- **Always create new feature branch** off of `develop` with the prefix `feature-` e.g. `feature-modal` then follow this process:
	1. Work, work, work, commit, commit, commit
	2. Push new feature branch to your fork and create pull request against `origin/develop` describing your work
	3. Team will review, ask for any necessary changes
	4. Once changes have been maid and tested, feature branch gets merged into `develop`

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

### javaScript
Work in progress...
