/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";
import { deprecatedClasses, elements } from "./button-link.metadata.js";

test("attributes", async () => {
	const { attributes } = elements["rvt-button-link"];
	for (const attr of Object.keys(attributes)) {
		for (const value of attributes[attr].enum) {
			await expect(
				`<rvt-button-link ${attr}="${value}"></rvt-button-link>`,
			).toBeValid();
		}
	}
	await expect(`<rvt-button-link size="sm"></rvt-button-link>`).toBeInvalid();
	await expect(
		`<rvt-button-link size="small medium"></rvt-button-link>`,
	).toBeInvalid();
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
	await expect(`<div><rvt-button-link></rvt-button-link></div>`).toBeValid();
});

test("phrasing", async () => {
	await expect(`<span><rvt-button-link></rvt-button-link></span>`).toBeValid();
});

test("required descendants", async () => {
	await expect(`
		<rvt-button-link>
			<a></a>
		</rvt-button-link>
	`).toBeValid();
	await expect(`
		<rvt-button-link>
			<button type="button">Go</button>
		</rvt-button-link>
	`).toBeInvalid();
	await expect(`
		<rvt-button-link>
			<span></span>
		</rvt-button-link>
	`).toBeInvalid();
	await expect(`
		<rvt-button-link>
			<a></a>
			<a></a>
		</rvt-button-link>
	`).toBeInvalid();
});
