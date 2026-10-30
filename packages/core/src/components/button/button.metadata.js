/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const deprecatedClasses = [
	{
		class: "rvt-button",
		replacement: "<rvt-button>",
	},
	{
		class: "rvt-button--danger",
	},
	{
		class: "rvt-button--danger-secondary",
	},
	{
		class: "rvt-button--full-width",
		replacement: `<rvt-button width="full">`,
	},
	{
		class: "rvt-button--link",
		replacement: `<rvt-button>`,
	},
	{
		class: "rvt-button--loading",
	},
	{
		class: "rvt-button--plain",
		replacement: `<rvt-button type="subtle">`,
	},
	{
		class: "rvt-button--small",
		replacement: `<rvt-button size="small">`,
	},
	{
		class: "rvt-button--success",
	},
	{
		class: "rvt-button--success-secondary",
	},
	{
		class: "rvt-button--secondary",
		replacement: `<rvt-button> or <rvt-button type="normal">`,
	},
	{
		class: "rvt-button__content",
	},
];

export const elements = {
	"rvt-button": {
		flow: true,
		phrasing: true,
	},
};

export const requiredDescendants = [
	{
		element: "body",
		required: [
			{
				query: `button[class="rvt-button"]`,
				not: [`button[class="rvt-button--secondary"]`],
				max: 0,
				message: `Replace with <rvt-button type="strong">`,
			},
		],
	},
	{
		element: "rvt-button",
		required: [
			{
				query: `> *`,
				not: ["a", "button"],
				max: 0,
			},
			{
				query: `> *`,
				max: 1,
			},
			{
				query: `a`,
				max: 1,
			},
			{
				query: `button`,
				max: 1,
			},
			{
				query: `svg`,
				max: 0,
				message: `Replace with <rvt-icon>`,
			},
		],
	},
];
