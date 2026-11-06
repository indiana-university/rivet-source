/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const deprecatedClasses = [
	{
		class: "rvt-cta",
		replacement: `<rvt-link type="action">`,
	},
	{
		class: "rvt-cta--button",
		replacement: `<rvt-link type="action" tone="strong">`,
	},
];

export const elements = {
	"rvt-link": {
		attributes: {
			size: {
				enum: ["large", "small", "medium", "extra-large"],
			},
			tone: {
				enum: ["normal", "strong", "subtle"],
			},
			type: {
				enum: ["action"],
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
		element: "rvt-link",
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
