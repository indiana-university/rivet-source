/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export function removeEnd(str, end) {
	const endsWith = new RegExp(`${end}$`);
	return str.replace(endsWith, "");
}
