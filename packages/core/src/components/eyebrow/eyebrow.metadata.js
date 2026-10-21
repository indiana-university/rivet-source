/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const elements = {
	"rvt-eyebrow": {
		attributes: {
			size: {
				enum: ["normal", "fluid", "large"],
			},
			type: {
				enum: ["normal", "strong"],
			},
		},
		flow: true,
		permittedContent: ["@phrasing"],
		phrasing: true,
	},
};
