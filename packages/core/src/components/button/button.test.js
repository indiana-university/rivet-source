/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

test("deprecated classes", async () => {
	await expect(`<button class="rvt-button--loading"></button>`).toBeInvalid();
});
