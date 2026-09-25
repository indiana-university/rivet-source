/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { defineMetadata } from "html-validate";

export default defineMetadata({
	"rvt-icon": {
		attributes: {
			name: {
				enum: ["chevron-left"],
			},
		},
		flow: true,
		permittedContent: ["@phrasing"],
		permittedParent: ["@flow"],
		phrasing: true,
	},
});
