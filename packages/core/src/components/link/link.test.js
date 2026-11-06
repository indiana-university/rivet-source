/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";
import { deprecatedClasses, elements } from "./link.metadata.js";

test("attributes", async () => {
	const { attributes } = elements["rvt-link"];
	for (const attr of Object.keys(attributes)) {
		for (const value of attributes[attr].enum) {
			await expect(`<rvt-link ${attr}="${value}"></rvt-link>`).toBeValid();
		}
	}
	await expect(`<rvt-link size="sm"></rvt-link>`).toBeInvalid();
	await expect(`<rvt-link size="small medium"></rvt-link>`).toBeInvalid();
});

test("deprecated classes", async () => {
	const deprecatedButtonClasses = deprecatedClasses.map((dc) => dc.class);
	for (const _class of deprecatedButtonClasses) {
		await expect(`
			<a class="${_class}" href="?">Call to action</a>
		`).toBeInvalid();
	}
});

test("flow", async () => {
	await expect(`<div><rvt-link></rvt-link></div>`).toBeValid();
});

test("phrasing", async () => {
	await expect(`<span><rvt-link></rvt-link></span>`).toBeValid();
});

test("required descendants", async () => {
	await expect(`
		<rvt-link>
			<a></a>
		</rvt-link>
	`).toBeValid();
	await expect(`
		<rvt-link>
			<button type="button">Go</button>
		</rvt-link>
	`).toBeInvalid();
	await expect(`
		<rvt-link>
			<span></span>
		</rvt-link>
	`).toBeInvalid();
	await expect(`
		<rvt-link>
			<a></a>
			<a></a>
		</rvt-link>
	`).toBeInvalid();
});
