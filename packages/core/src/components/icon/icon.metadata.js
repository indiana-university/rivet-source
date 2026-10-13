/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { defineMetadata } from "html-validate";

export default defineMetadata({
	"rvt-icon": {
		attributes: {
			name: {
				required: true,
			},
		},
		flow: true,
		permittedContent: ["@phrasing"],
		phrasing: true,
	},
});
