/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

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
		query: "[aria-current]",
		pattern: `li[aria-current="page"]:last-child`,
	},
];
