/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

const el = "rvt-loader";
const sizes = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"];
const Loader = (attributes = "") =>
	`<${el}${attributes && ` ${attributes}`}></${el}>`;

test("attributes", async () => {
	for (const size of sizes) {
		await expect(Loader(`size="${size}"`)).toBeValid();
	}
	await expect(Loader(`size="large"`)).toBeInvalid();
	await expect(Loader(`size="sm lg"`)).toBeInvalid();
	await expect(Loader(`type="normal"`)).toBeValid();
	await expect(Loader(`type="reverse"`)).toBeValid();
	await expect(Loader(`type="strong"`)).toBeInvalid();
	await expect(Loader(`type="normal reverse"`)).toBeInvalid();
});

test("deprecated classes", async () => {
	await expect(`<span class="rvt-loader"></span>`).toBeInvalid();
	await expect(`<span class="rvt-loader--reverse"></span>`).toBeInvalid();
	for (const size of sizes) {
		await expect(`<span class="rvt-loader--${size}"></span>`).toBeInvalid();
	}
});

test("flow", async () => {
	await expect(`<div>${Loader()}</div>`).toBeValid();
});

test("permitted content", async () => {
	await expect(`<${el}><span></span></${el}>`).toBeInvalid();
});

test("phrasing", async () => {
	await expect(`<span>${Loader()}</span>`).toBeValid();
	await expect(`<p>${Loader()}</p>`).toBeValid();
});

test("text content", async () => {
	await expect(Loader()).toBeValid();
	await expect(`<${el}>Loading</${el}>`).toBeInvalid();
});
