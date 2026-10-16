/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

test("attributes", async () => {
	await expect(`<rvt-eyebrow size="normal"></rvt-eyebrow>`).toBeValid();
	await expect(`<rvt-eyebrow size="fluid"></rvt-eyebrow>`).toBeValid();
	await expect(`<rvt-eyebrow size="large"></rvt-eyebrow>`).toBeValid();
	await expect(`<rvt-eyebrow size="fluid large"></rvt-eyebrow>`).toBeInvalid();
	await expect(`<rvt-eyebrow size="true"></rvt-eyebrow>`).toBeInvalid();
	await expect(`<rvt-eyebrow type="normal"></rvt-eyebrow>`).toBeValid();
	await expect(`<rvt-eyebrow type="strong"></rvt-eyebrow>`).toBeValid();
	await expect(`<rvt-eyebrow type="normal strong"></rvt-eyebrow>`).toBeValid();
	await expect(`<rvt-eyebrow type="true"></rvt-eyebrow>`).toBeInvalid();
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
