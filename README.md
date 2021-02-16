# Rivet

[Rivet](https://rivet.iu.edu/) is Indiana University’s design system. A collection of code and visual assets used to create patterns across software titles, Rivet makes it easier to build and maintain consistent user interfaces.

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause) [![npm version](https://img.shields.io/npm/v/rivet-uits.svg?style=flat)](https://www.npmjs.com/package/rivet-uits) [![CircleCI](https://circleci.com/gh/indiana-university/rivet-source.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/indiana-university/rivet-source)

![Browserstack logo](./src/components/_extras/Browserstack-logo@2x.png)

## Using Rivet

To use Rivet on your website or web application, follow the instructions on one of the pages listed below:

- [Install with npm](https://rivet.iu.edu/getting-started/npm/)
- [Download CSS and JavaScript](https://rivet.iu.edu/components/#download-rivet)
- [Use hosted CSS and JavaScript](https://rivet.iu.edu/components/#hosted-css-and-javascript)

## Contributing to Rivet

This section describes how to start working with Rivet.

### Install Node and npm

Before you can start working with Rivet, you'll need to make sure you have Node and npm installed.

To check if you have both installed, run the following command in your terminal:

```sh
node -v && npm -v
```

If both are installed, you should see version numbers for each. If you don't have Node or npm installed, go to the [Node website for installation instructions](https://nodejs.org/en/download/).

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

### Testing Javascript
We use [Cypress](https://www.cypress.io/) to run automated end-to-end tests on Rivet's JavaScript components. To run tests do the following:

1. Start the local development server by typing `npm run start` in your terminal.
2. Once the development server is running, open a new terminal window and type `npm run cypress:test` to run the Cypress tests.
3. Check the output in your terminal to make sure all the tests ran successfully.