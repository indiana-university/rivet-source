/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const elements = {
	"rvt-eyebrow": {
		attributes: {
			size: {
				enum: ["fluid", "14"],
			},
			strong: {
				boolean: true,
			},
		},
		flow: true,
		permittedContent: ["@phrasing"],
		phrasing: true,
	},
};
