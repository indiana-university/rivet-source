# Rivet Design System

[Rivet](https://rivet.iu.edu/) is a design system for building digital interfaces at Indiana University — built with plain HTML, CSS, and JavaScript. It helps teams create familiar and accessible experiences across platforms.

![GitHub](https://img.shields.io/github/license/indiana-university/rivet?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/indiana-university/rivet?style=flat-square)

## Rivet 3 is in progress

Rivet 3 is the next major version of the design system. It is in active development, but you can start exploring it today:

- [`v3-main` branch](https://github.com/indiana-university/rivet-source/tree/v3-main): The latest Rivet 3 source code.
- [Development sandbox](https://indiana-university.github.io/rivet-source/): Live examples of Rivet 3 components and layouts.

## Use Rivet 2

To use Rivet on your website or web application, follow the instructions on one of the pages listed below:

- [Use CSS and JavaScript via CDN](https://rivet.iu.edu/getting-started/#hosted-assets)
- [Install with npm](https://rivet.iu.edu/getting-started/#install-using-npm)

## Contribute to Rivet

For information on how to contribute to the design system, see the [Rivet wiki](https://github.com/indiana-university/rivet-source/wiki).

## Packages in Rivet 3

This repo contains several packages in the `packages` folder:

- `core`: CSS and JavaScript for components.
- `tokens`: Low level design tokens for components.
- `sandbox`: Development sandbox environment.

## Develop Rivet 3

[pnpm](https://pnpm.io/) is the package manager used for Rivet. Install it to run the development scripts.

Start the development sandbox environment with hot module reloading (HMR).

```
pnpm dev
```

Start the development sandbox environment without hot module reloading (HMR). This is what gets [published on GitHub Pages](https://indiana-university.github.io/rivet-source/).

```
pnpm preview
```

Build and output files to each package's `dist` folder. This is what gets published to npm.

```
pnpm build
```
