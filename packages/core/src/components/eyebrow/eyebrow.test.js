/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

const Eyebrow = (content = "") => `<rvt-eyebrow>${content}</rvt-eyebrow>`;

test("flow", async () => {
	await expect(`<div>${Eyebrow()}</div>`).toBeValid();
	await expect(`<p>${Eyebrow()}</p>`).toBeValid();
});

test("permitted content", async () => {
	await expect(
		Eyebrow(`<span class="rvt-sr-only">Phrasing</span>`),
	).toBeValid();
	await expect(Eyebrow(`<div class="rvt-sr-only">Flow</div>`)).toBeInvalid();
});

test("phrasing", async () => {
	await expect(`<p>${Eyebrow()}</p>`).toBeValid();
});
