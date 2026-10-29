/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const deprecatedClasses = [
	{
		class: "rvt-loader",
		replacement: "<rvt-loader>",
	},
	{
		class: "rvt-loader--reverse",
		replacement: `<rvt-loader type="reverse">`,
	},
	{
		class: "rvt-loader--xxs",
		replacement: `<rvt-loader size="xxs">`,
	},
	{
		class: "rvt-loader--xs",
		replacement: `<rvt-loader size="xs">`,
	},
	{
		class: "rvt-loader--sm",
		replacement: `<rvt-loader size="sm">`,
	},
	{
		class: "rvt-loader--md",
		replacement: `<rvt-loader size="md">`,
	},
	{
		class: "rvt-loader--lg",
		replacement: `<rvt-loader size="lg">`,
	},
	{
		class: "rvt-loader--xl",
		replacement: `<rvt-loader size="xl">`,
	},
	{
		class: "rvt-loader--xxl",
		replacement: `<rvt-loader size="xxl">`,
	},
];

export const elements = {
	"rvt-loader": {
		attributes: {
			size: {
				enum: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
			},
			type: {
				enum: ["normal", "reverse"],
			},
		},
		flow: true,
		permittedContent: [],
		phrasing: true,
		textContent: "none",
	},
};
