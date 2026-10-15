/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

test("attributes", async () => {
	await expect(`<rvt-eyebrow size="fluid" strong></rvt-eyebrow>`).toBeValid();
	await expect(
		`<rvt-eyebrow size="fluid 14" strong="weak"></rvt-eyebrow>`,
	).toBeInvalid();
	await expect(`<rvt-eyebrow size="16"></rvt-eyebrow>`).toBeInvalid();
});

test("flow", async () => {
	await expect(`<div><rvt-eyebrow></rvt-eyebrow></div>`).toBeValid();
});

test("permitted content", async () => {
	await expect(`<rvt-eyebrow><div></div></rvt-eyebrow>`).toBeInvalid();
	await expect(`<rvt-eyebrow><span></span></rvt-eyebrow>`).toBeValid();
});

test("phrasing", async () => {
	await expect(`<span><rvt-eyebrow></rvt-eyebrow></span>`).toBeValid();
});
