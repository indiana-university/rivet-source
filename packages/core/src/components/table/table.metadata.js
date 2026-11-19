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
	"*": {
		attributes: {
			"rvt-table-responsive": {
				allowed(node) {
					if (!node.closest(`section[rvt-table-responsive]`)) {
						return `only allowed on <section> so the scrollable region is announced`;
					}
					if (
						!node.hasAttribute("aria-label") &&
						!node.hasAttribute("aria-labelledby")
					) {
						return `requires aria-label or aria-labelledby to name the scrollable region`;
					}
					if (node.getAttribute("tabindex") !== "0") {
						return `requires tabindex="0" so the scrollable region is keyboard accessible`;
					}
					return null;
				},
			},
		},
	},
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
];
