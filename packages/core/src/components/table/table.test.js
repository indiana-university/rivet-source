/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";
import { spacing, tones, traits } from "./table.metadata.js";

test("attributes", async () => {
	for (const value of spacing) {
		await expect(
			`<rvt-table spacing="${value}"><table></table></rvt-table>`,
		).toBeValid();
	}
	for (const value of tones) {
		await expect(
			`<rvt-table tone="${value}"><table></table></rvt-table>`,
		).toBeValid();
	}
	for (const value of traits) {
		await expect(
			`<rvt-table trait="${value}"><table></table></rvt-table>`,
		).toBeValid();
	}
	await expect(
		`<rvt-table trait="cells striped"><table></table></rvt-table>`,
	).toBeValid();
	await expect(
		`<rvt-table trait="grid"><table></table></rvt-table>`,
	).toBeInvalid();
	await expect(
		`<rvt-table trait="cells grid"><table></table></rvt-table>`,
	).toBeInvalid();
	await expect(
		`<rvt-table spacing="tight"><table></table></rvt-table>`,
	).toBeInvalid();
	await expect(
		`<rvt-table tone="normal subtle"><table></table></rvt-table>`,
	).toBeInvalid();
});

test("deprecated classes", async () => {
	await expect(`<table class="rvt-table"></table>`).toBeInvalid();
	await expect(`<table class="rvt-table-cells"></table>`).toBeInvalid();
	await expect(`<table class="rvt-table-compact"></table>`).toBeInvalid();
	await expect(`<table class="rvt-table-plain"></table>`).toBeInvalid();
	await expect(`<table class="rvt-table-stripes"></table>`).toBeInvalid();
	await expect(
		`<section class="rvt-table-responsive"><table></table></section>`,
	).toBeInvalid();
});

test("flow", async () => {
	await expect(`<div><rvt-table><table></table></rvt-table></div>`).toBeValid();
});

test("permitted content", async () => {
	await expect(`<rvt-table><table></table></rvt-table>`).toBeValid();
	await expect(`<rvt-table><div></div></rvt-table>`).toBeInvalid();
});

test("required descendants", async () => {
	await expect(`
		<rvt-table>
			<table></table>
			<table></table>
		</rvt-table>
	`).toBeInvalid();
});

test("responsive region", async () => {
	await expect(`
		<section rvt-table-responsive aria-label="Services" tabindex="0">
			<rvt-table><table></table></rvt-table>
		</section>
	`).toBeValid();
	await expect(`
		<section rvt-table-responsive aria-labelledby="caption" tabindex="0">
			<rvt-table>
				<table><caption id="caption">Services</caption></table>
			</rvt-table>
		</section>
	`).toBeValid();
	await expect(`
		<section rvt-table-responsive tabindex="0">
			<rvt-table><table></table></rvt-table>
		</section>
	`).toBeInvalid();
	await expect(`
		<section rvt-table-responsive aria-label="Services">
			<rvt-table><table></table></rvt-table>
		</section>
	`).toBeInvalid();
	await expect(`
		<div rvt-table-responsive aria-label="Services" tabindex="0">
			<rvt-table><table></table></rvt-table>
		</div>
	`).toBeInvalid();
});

test("striped conflicts with subtle tone", async () => {
	await expect(
		`<rvt-table tone="subtle"><table></table></rvt-table>`,
	).toBeValid();
	for (const value of ["striped", "cells striped", "striped cells"]) {
		await expect(
			`<rvt-table tone="subtle" trait="${value}"><table></table></rvt-table>`,
		).toBeInvalid();
	}
	await expect(
		`<rvt-table tone="subtle" trait="cells"><table></table></rvt-table>`,
	).toBeValid();
	await expect(
		`<rvt-table tone="strong" trait="striped"><table></table></rvt-table>`,
	).toBeValid();
});
