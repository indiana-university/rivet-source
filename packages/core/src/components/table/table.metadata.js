/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const spacing = ["normal", "compact"];

export const tones = ["normal", "strong", "subtle"];

export const traits = ["cells", "striped"];

export const deprecatedClasses = [
	{
		class: "rvt-table",
		replacement: "<rvt-table>",
	},
	{
		class: "rvt-table-cells",
		replacement: `<rvt-table trait="cells">`,
	},
	{
		class: "rvt-table-compact",
		replacement: `<rvt-table spacing="compact">`,
	},
	{
		class: "rvt-table-plain",
		replacement: `<rvt-table tone="subtle">`,
	},
	{
		class: "rvt-table-responsive",
		replacement: `<section rvt-table-responsive>`,
	},
	{
		class: "rvt-table-stripes",
		replacement: `<rvt-table trait="striped">`,
	},
];

export const elements = {
	"rvt-table": {
		attributes: {
			spacing: {
				enum: spacing,
			},
			tone: {
				enum: tones,
			},
			trait: {
				allowed(node, attr) {
					if (typeof attr !== "string") {
						return null;
					}
					const tokens = attr.split(/\s+/);
					if (
						node.getAttribute("tone") === "subtle" &&
						tokens.includes("striped")
					) {
						return `not allowed when [tone="subtle"] because striping has no effect without a header fill`;
					}
					return null;
				},
				enum: traits,
				list: true,
			},
		},
		flow: true,
		permittedContent: ["table?"],
	},
};

export const requiredDescendants = [
	{
		element: "rvt-table",
		required: [
			{
				query: `> *`,
				not: ["table"],
				max: 0,
				message: `Replace with <table>`,
			},
			{
				query: `> *`,
				max: 1,
			},
		],
	},
	{
		element: "body",
		required: [
			{
				query: `[rvt-table-responsive]`,
				not: ["section"],
				max: 0,
				message: `Use <section rvt-table-responsive> so the scrollable region is announced`,
			},
			{
				query: `section[rvt-table-responsive]`,
				not: [
					`section[rvt-table-responsive][aria-label]`,
					`section[rvt-table-responsive][aria-labelledby]`,
				],
				max: 0,
				message: `Add aria-label or aria-labelledby to name the scrollable region`,
			},
			{
				query: `section[rvt-table-responsive]`,
				not: [`section[rvt-table-responsive][tabindex="0"]`],
				max: 0,
				message: `Add tabindex="0" so the scrollable region is keyboard accessible`,
			},
		],
	},
];
