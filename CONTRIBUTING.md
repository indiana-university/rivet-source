# Hey!

We're excited that you want to contribute to the UITS Design system. If you're ever unsure about anything please feel free to [email us](mailto:uxo@iu.edu) or post in the **#design-system** channel on Slack.

## Design contribution
The first step in contributing to the design system is to submit your suggestions to the team. To submit your proposed contribution create a new issue on [github.iu.edu](https://github.iu.edu/UITS/uitsds/issues) ([see more below](submitting-a-github-issue)). Someone from the team will respond to your submission and the begin the review process.

### Submission requirements

**Each submission should include**:

- a fairly short descriptive title
- a clear description of the need or problem your design solves
- **at least one** of the following: screenshots/images of you rendered design, wireframes, design mockups, links ([Codepen](http://codepen.io/), [jsFiddle](https://jsfiddle.net/), etc.), Axure mockups, iPhone photo of a napkin sketch :pencil:
- if you are proposing a content change, please include a draft of  the text content you're recommending
- any other document, links, research you would like to include

### Review process
Work in progress...

After the Github issue is created and the submission has enough information and supporting materials (i.e. issue template is completely filled out) someone from the team will mark the issue as **proposed**. Otherwise, someone from the team will ask the submitter for further information/documentation and mark the issue as **needs more info**.

#### Review criteria
Once we have enough info the team will do a review of the proposed design based on the following criteria:

**Note**: Using the criteria from [this document](https://github.com/18F/web-design-standards/wiki/Contribution-Guidelines%3A-Design) which is super thorough and has a lot of great ideas for how to structure this type of process.

- **Usability** — Is the interaction flow clearly documented? Is the pattern responsive?
- **Accessibility** — Is the pattern accessible to all intended audiences?
- **Visual design** — Is the contribution consistent with our visual style?
- **Content** — Does the pattern have plain language, correct spelling, and grammar? Does the author clearly describe actions?

If the team decides to not move forward with the design submission the issue will be closed.

#### Alpha Status
If the team finds the proposed pattern to meet the above criteria someone from the development team will pair up with the designer to create a HTML/CSS/javaScript prototype of the submission. At this stage the component will move from _Proposed_ status into the design system with _Alpha_ status.

#### Beta status, Usability & Accessibility testing
After the prototype component has been created and is functional, it will move to _Beta_ status within the design system. The component will be tested to ensure that it meets accessibility requirements. The User Experience office will conduct usability tests to ensure that it's easy to use and understand.

#### Ready Status
Once the new component is tested and meets all requirements it will move to _Ready_ status in the design system at which point it will be ready for teams to use in production applications.

This bit probably needs fleshed out a bit more...

## Submitting a Github issue

To help us understand the kind of contribution you want to make we ask that you first submit a Github issue on github.iu.edu. Here are a few guidelines to follow when creating a new issue:

1. Go to the UITS Design system repository on [github.iu.edu](https://github.iu.edu/UITS/uitsds/issues).
2. Login with your IU CAS username and passphrase. Don't worry if you've never logged into github.iu.edu before—anyone with a CAS username and passphrase can log in.
3. Click the "New Issue" button.
4. Fill out the provided issue template to the best of your ability. If you are submitting a design concept for a new or existing component please attach a screenshot, a link to an Axure mockup, or feel free to link to example HTML/CSS/javaScript (a link to pen on [Codepen](http://codepen.io/) would be great!).
5. After you have filled out the issue template click the **Submit new issue** button to create your new issue :tada:.
6. Once the team has had a chance to review the issue they will either mark it as **Proposed**, or ask you for more information before moving on to the next steps.

### Github Resources
If you need more info, this [Knowledge Base article](https://kb.iu.edu/d/bagk) explains IU's Github Enterprise service in a little more detail and has some handy links to Git and GitHub documentation.

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
.selector-one{
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
