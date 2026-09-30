/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

const el = "rvt-icon";
const Icon = (content = "") => `<${el} name="check">${content}</${el}>`;

test("attributes", async () => {
	await expect(`<${el}></${el}>`).toBeInvalid();
});

test("flow", async () => {
	await expect(`<div>${Icon()}</div>`).toBeValid();
	await expect(`<p>${Icon()}</p>`).toBeValid();
});

test("permitted content", async () => {
	await expect(Icon(`<span class="rvt-sr-only">Phrasing</span>`)).toBeValid();
	await expect(Icon(`<div class="rvt-sr-only">Flow</div>`)).toBeInvalid();
});

test("phrasing", async () => {
	await expect(`<p>${Icon()}</p>`).toBeValid();
});
