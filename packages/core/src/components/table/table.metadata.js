/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const borders = ["none", "normal", "cells"];

export const densities = ["normal", "compact"];

export const tones = ["normal", "subtle", "plain"];

export const deprecatedClasses = [
	{
		class: "rvt-table",
		replacement: "<rvt-table>",
	},
	{
		class: "rvt-table-cells",
		replacement: `<rvt-table borders="cells">`,
	},
	{
		class: "rvt-table-compact",
		replacement: `<rvt-table density="compact">`,
	},
	{
		class: "rvt-table-plain",
		replacement: `<rvt-table tone="plain" borders="none">`,
	},
	{
		class: "rvt-table-responsive",
		replacement: `<section rvt-table-responsive>`,
	},
	{
		class: "rvt-table-stripes",
		replacement: "<rvt-table striped>",
	},
];

export const elements = {
	"rvt-table": {
		attributes: {
			borders: {
				enum: borders,
			},
			density: {
				enum: densities,
			},
			striped: {
				boolean: true,
			},
			tone: {
				enum: tones,
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
				query: `rvt-table[tone="plain"][striped]`,
				max: 0,
				message: `Striping has no effect on a plain table`,
			},
		],
	},
];
