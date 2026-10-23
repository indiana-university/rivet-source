/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const descendantCount = [
	{
		container: "rvt-breadcrumbs",
		constraints: [
			{ selector: `li[aria-current="page"]`, max: 1 },
			{ selector: "[aria-current]", max: 0 },
		],
	},
];

export const elements = {
	"rvt-breadcrumbs": {
		flow: true,
		permittedContent: ["ol?"],
		requiredAncestors: ["nav[aria-label]", "nav[aria-labelledby]"],
	},
};
