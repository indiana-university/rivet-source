/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const elements = {
	"rvt-sr-only": {
		attributes: {
			tabindex: {
				allowed() {
					return `Instead use attribute [rvt-util="sr-only"] on a built-in interactive element like a button or link.`;
				},
			},
		},
		flow: true,
		permittedContent: [],
		phrasing: true,
	},
};
