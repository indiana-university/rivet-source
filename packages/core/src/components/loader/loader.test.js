/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

const sizes = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"];

test("attributes", async () => {
	for (const size of sizes) {
		await expect(`<rvt-loader size="${size}"></rvt-loader>`).toBeValid();
	}
	await expect(`<rvt-loader size="large"></rvt-loader>`).toBeInvalid();
	await expect(`<rvt-loader size="sm lg"></rvt-loader>`).toBeInvalid();
});

test("deprecated classes", async () => {
	await expect(`<span class="rvt-loader"></span>`).toBeInvalid();
	await expect(`<span class="rvt-loader--reverse"></span>`).toBeInvalid();
	for (const size of sizes) {
		await expect(`<span class="rvt-loader--${size}"></span>`).toBeInvalid();
	}
});

test("flow", async () => {
	await expect(`<div><rvt-loader></rvt-loader></div>`).toBeValid();
});

test("permitted content", async () => {
	await expect(`<rvt-loader><span></span></rvt-loader>`).toBeInvalid();
});

test("phrasing", async () => {
	await expect(`<span><rvt-loader></rvt-loader></span>`).toBeValid();
	await expect(`<p><rvt-loader></rvt-loader></p>`).toBeValid();
});

test("text content", async () => {
	await expect(`<rvt-loader></rvt-loader>`).toBeValid();
	await expect(`<rvt-loader>Loading</rvt-loader>`).toBeInvalid();
});
