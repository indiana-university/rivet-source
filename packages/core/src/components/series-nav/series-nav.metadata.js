/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const deprecatedClasses = [
	{
		class: "rvt-series-nav",
		replacement: "<rvt-series-nav>",
	},
	{
		class: "rvt-series-nav__previous",
		replacement: `a[rel="prev"]`,
	},
	{
		class: "rvt-series-nav__next",
		replacement: `a[rel="next"]`,
	},
	{
		class: "rvt-series-nav__item",
	},
	{
		class: "rvt-series-nav__label",
		replacement: "<rvt-eyebrow>",
	},
];

export const elements = {
	"rvt-series-nav": {
		flow: true,
		permittedContent: ["a?"],
		requiredAncestors: ["nav[aria-label]", "nav[aria-labelledby]"],
	},
};
