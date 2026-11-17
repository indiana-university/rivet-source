/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const densities = ["normal", "compact"];

export const tones = ["normal", "subtle", "plain"];

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
		replacement: `<rvt-table density="compact">`,
	},
	{
		class: "rvt-table-plain",
		replacement: `<rvt-table tone="plain">`,
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
			density: {
				enum: densities,
			},
			tone: {
				enum: tones,
			},
			trait: {
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
			{
				query: `rvt-table[tone="plain"][trait="striped"]`,
				max: 0,
				message: `Striping has no effect on a plain table`,
			},
		],
	},
];
