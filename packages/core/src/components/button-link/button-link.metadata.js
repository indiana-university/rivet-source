/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const deprecatedClasses = [
	{
		class: "rvt-cta",
		replacement: `<rvt-button-link>`,
	},
	{
		class: "rvt-cta--button",
		replacement: `<rvt-button-link tone="strong">`,
	},
];

export const elements = {
	"rvt-button-link": {
		attributes: {
			size: {
				enum: ["large", "small", "medium", "extra-large"],
			},
			tone: {
				enum: ["normal", "strong", "subtle"],
			},
			width: {
				enum: ["normal", "full"],
			},
		},
		flow: true,
		phrasing: true,
	},
};

export const requiredDescendants = [
	{
		element: "rvt-button-link",
		required: [
			{
				query: `> *`,
				not: ["a"],
				max: 0,
			},
			{
				query: `a`,
				max: 1,
			},
		],
	},
];
