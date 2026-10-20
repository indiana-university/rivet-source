/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

test("flow", async () => {
	await expect(`<div><rvt-sr-only></rvt-sr-only></div>`).toBeValid();
});

test("permitted content", async () => {
	await expect(`<rvt-sr-only>Content</rvt-sr-only>`).toBeValid();
	await expect(`<rvt-sr-only><span></span></rvt-sr-only>`).toBeInvalid();
});

test("phrasing", async () => {
	await expect(`<span><rvt-sr-only></rvt-sr-only></span>`).toBeValid();
});
