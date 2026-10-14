/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

test("children", async () => {
	await expect(`<div class="rvt-hero__eyebrow"></div>`).toBeInvalid();
});
