/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { removeStart } from "./removeStart.js";

export function baseUrl(path) {
	const p = removeStart(path, "/");
	return [import.meta.env.BASE_URL, p].join("/");
}
