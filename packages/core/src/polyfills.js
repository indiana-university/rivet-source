/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

if (!("anchorName" in document.documentElement.style)) {
	await import("./polyfills.css");
	const { default: polyfill } =
		await import("@oddbird/css-anchor-positioning/fn");
	polyfill();
}
