/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const deprecatedClasses = [
	{
		class: "rvt-seriesnav",
		replacement: "<rvt-series-nav>",
	},
	{
		class: "rvt-seriesnav__previous",
		replacement: `<a rel="prev">`,
	},
	{
		class: "rvt-seriesnav__next",
		replacement: `<a rel="next">`,
	},
	{
		class: "rvt-seriesnav__text",
	},
	{
		class: "rvt-seriesnav__label",
		replacement: "<rvt-eyebrow>",
	},
	{
		class: "rvt-seriesnav__item",
		replacement: "<span>",
	},
	{
		class: "rvt-seriesnav__icon",
	},
	// v3 alpha classes
	{
		class: "rvt-series-nav",
		replacement: "<rvt-series-nav>",
	},
	{
		class: "rvt-series-nav__previous",
		replacement: `<a rel="prev">`,
	},
	{
		class: "rvt-series-nav__next",
		replacement: `<a rel="next">`,
	},
	{
		class: "rvt-series-nav__text",
	},
	{
		class: "rvt-series-nav__label",
		replacement: "<rvt-eyebrow>",
	},
	{
		class: "rvt-series-nav__item",
		replacement: "<span>",
	},
	{
		class: "rvt-series-nav__icon",
	},
];

export const elements = {
	"rvt-series-nav": {
		flow: true,
		permittedContent: ["a", "rvt-eyebrow", "span"],
		requiredAncestors: ["nav[aria-label]", "nav[aria-labelledby]"],
	},
};

export const requiredDescendants = [
	{
		element: "rvt-series-nav",
		query: `a`,
		max: 2,
	},
	{
		element: "rvt-series-nav",
		query: `a[rel="prev"]`,
		max: 1,
	},
	{
		element: "rvt-series-nav",
		query: `a[rel="next"]`,
		max: 1,
	},
];
