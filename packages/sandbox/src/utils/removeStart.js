/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export function removeStart(str, start) {
	const startsWith = new RegExp(`^${start}`);
	return str.replace(startsWith, "");
}
