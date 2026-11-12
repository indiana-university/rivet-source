/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

test("attributes", async () => {
	await expect(`<nav></nav>`).toBeValid();
	await expect(`<nav aria-label="Breadcrumbs"></nav>`).toBeValid();
	await expect(`<nav aria-labelledby="nav-label"></nav>`).toBeValid();
	await expect(`<nav aria-label=""></nav>`).toBeInvalid();
	await expect(`<nav aria-labelledby=""></nav>`).toBeInvalid();
});
