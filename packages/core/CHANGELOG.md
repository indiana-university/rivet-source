# @rivet-iu/core

## 3.0.0-alpha.12

### Minor Changes

- [#903](https://github.com/indiana-university/rivet-source/pull/903) [`7bbb39a`](https://github.com/indiana-university/rivet-source/commit/7bbb39aff843ea573589e6ed9c61a87b8e58c9e6) Thanks [@gfitzwat](https://github.com/gfitzwat)! - Generate favicons from tokens (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`).

- [#900](https://github.com/indiana-university/rivet-source/pull/900) [`302ae49`](https://github.com/indiana-university/rivet-source/commit/302ae49490295f33edf54b31e3ce09a7ef5cd126) Thanks [@basham](https://github.com/basham)! - Lint packages with HTML-validate.

- [#897](https://github.com/indiana-university/rivet-source/pull/897) [`691af88`](https://github.com/indiana-university/rivet-source/commit/691af88869bb4cdf24089aeb036c1e706753284b) Thanks [@basham](https://github.com/basham)! - Header dropdown menu:

  - Do not move focus to the first item if it opened due to a mouse event.
  - Left align item labels to align with the menu label.
  - Use anchor positioning API to keep the menu contained to the viewport boundaries.
  - Improve contrast in all color themes.
  - Items labels no longer span multiple lines.
  - Set menu width based on the item label width.
  - Align the `aria-current` style with other v3 work.

  Priority nav:

  - Use `<rvt-icon>` for the "More" chevron rather than using an inline SVG.

- [#895](https://github.com/indiana-university/rivet-source/pull/895) [`516ee7b`](https://github.com/indiana-university/rivet-source/commit/516ee7b39264f16dec21ad693ce1c90acdeab8e9) Thanks [@basham](https://github.com/basham)! - Add brand-ultra-light color token and background-light color theme. Use this new color in alert, accordion, pagination, series nav, and table components.

### Patch Changes

- [#899](https://github.com/indiana-university/rivet-source/pull/899) [`3cb178d`](https://github.com/indiana-university/rivet-source/commit/3cb178d55370d0fbfcf13e2a598d9f0be099626c) Thanks [@basham](https://github.com/basham)! - Breadcrumbs: Adjusted current page style to make it look less like a link.

- [#894](https://github.com/indiana-university/rivet-source/pull/894) [`370f725`](https://github.com/indiana-university/rivet-source/commit/370f725f951f444ccf9c2bd6bb151e3531158301) Thanks [@basham](https://github.com/basham)! - Updated dependencies.
- Updated dependencies [[`7bbb39a`](https://github.com/indiana-university/rivet-source/commit/7bbb39aff843ea573589e6ed9c61a87b8e58c9e6), [`516ee7b`](https://github.com/indiana-university/rivet-source/commit/516ee7b39264f16dec21ad693ce1c90acdeab8e9)]:
  - @rivet-iu/tokens@1.0.0-alpha.2

## 3.0.0-alpha.11

### Minor Changes

- 08cd982: [#872](https://github.com/indiana-university/rivet-source/pull/872) - Add border variable.
- 08cd982: [#868](https://github.com/indiana-university/rivet-source/pull/868) - Create Drilldown component.
- 08cd982: [#873](https://github.com/indiana-university/rivet-source/pull/873) - Add font files to dist output.
- 08cd982: [#889](https://github.com/indiana-university/rivet-source/pull/889) - Add prepare script.

### Patch Changes

- 08cd982: [#859](https://github.com/indiana-university/rivet-source/pull/859) - Fix padding in billboard reverse variant.
- 08cd982: [#891](https://github.com/indiana-university/rivet-source/pull/891) - Fix Safari bug: Oblique style in Hero component does not work.
- 08cd982: [#875](https://github.com/indiana-university/rivet-source/pull/875) - Reduce margin on section intro teaser.
- 08cd982: [#863](https://github.com/indiana-university/rivet-source/pull/863) - Feature Card: Only show arrow if there is a link in the title.
- 08cd982: [#878](https://github.com/indiana-university/rivet-source/pull/878) - Dropdown: Increase contrast within crimson theme.
- 08cd982: [#870](https://github.com/indiana-university/rivet-source/pull/870) - Keep focus outline on top without applying relative position.
- 08cd982: [#874](https://github.com/indiana-university/rivet-source/pull/874) - Remove font stretch in rich text headings.
- 08cd982: [#860](https://github.com/indiana-university/rivet-source/pull/860) - Fix square border radius on stickers.
- 08cd982: [#867](https://github.com/indiana-university/rivet-source/pull/867) - Remove max-width on quote.
- 08cd982: [#864](https://github.com/indiana-university/rivet-source/pull/864) - Upgrade dependencies and format code.
- 08cd982: [#861](https://github.com/indiana-university/rivet-source/pull/861) - Add inline code styles.
- 08cd982: [#865](https://github.com/indiana-university/rivet-source/pull/865) - Fix feature card arrow hover color.
- 08cd982: [#890](https://github.com/indiana-university/rivet-source/pull/890) - Update serif and mono styles.
- 08cd982: [#866](https://github.com/indiana-university/rivet-source/pull/866) - Refine stat group component.
- Updated dependencies [08cd982]
  - @rivet-iu/tokens@1.0.0-alpha.1
