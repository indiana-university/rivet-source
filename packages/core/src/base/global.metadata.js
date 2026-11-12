/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const notEmpty = "/^\\s*\\S+.*/";

export const elements = {
	"*": {
		attributes: {
			"aria-label": {
				enum: [notEmpty],
			},
			"aria-labelledby": {
				enum: [notEmpty],
			},
		},
	},
};
