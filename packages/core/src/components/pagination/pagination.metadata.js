/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const deprecatedClasses = [
	{
		class: "rvt-pagination",
		replacement: "<rvt-pagination>",
	},
	{
		class: "rvt-pagination__item",
	},
];

export const elements = {
	"rvt-pagination": {
		flow: true,
		permittedContent: ["ul?"],
		requiredAncestors: ["nav[aria-label]", "nav[aria-labelledby]"],
	},
};

export const requiredDescendants = [
	{
		element: "rvt-pagination",
		required: [
			{ query: "[aria-current]", not: [`a[aria-current="page"]`], max: 0 },
			{ query: `a[aria-current="page"]`, max: 1 },
			{
				query: "svg",
				max: 0,
				message: `Replace with a[rel="first|prev|next|last"]`,
			},
		],
	},
];
