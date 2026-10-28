/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const deprecatedClasses = [
	{
		class: "rvt-breadcrumbs",
		replacement: "<rvt-breadcrumbs>",
	},
];

export const elements = {
	"rvt-breadcrumbs": {
		flow: true,
		permittedContent: ["ol?"],
		requiredAncestors: ["nav[aria-label]", "nav[aria-labelledby]"],
	},
};

export const requiredDescendants = [
	{
		element: "rvt-breadcrumbs",
		required: [
			{ query: `[aria-current]`, not: [`li[aria-current="page"]`], max: 0 },
			{ query: `li[aria-current="page"]:last-child`, max: 1 },
		],
	},
];
