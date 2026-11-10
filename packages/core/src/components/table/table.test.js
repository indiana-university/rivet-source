/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";
import { borders, densities, tones } from "./table.metadata.js";

test("attributes", async () => {
	for (const value of borders) {
		await expect(
			`<rvt-table borders="${value}"><table></table></rvt-table>`,
		).toBeValid();
	}
	for (const value of densities) {
		await expect(
			`<rvt-table density="${value}"><table></table></rvt-table>`,
		).toBeValid();
	}
	for (const value of tones) {
		await expect(
			`<rvt-table tone="${value}"><table></table></rvt-table>`,
		).toBeValid();
	}
	await expect(`<rvt-table striped><table></table></rvt-table>`).toBeValid();
	await expect(
		`<rvt-table borders="grid"><table></table></rvt-table>`,
	).toBeInvalid();
	await expect(
		`<rvt-table density="tight"><table></table></rvt-table>`,
	).toBeInvalid();
	await expect(
		`<rvt-table tone="normal plain"><table></table></rvt-table>`,
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
		<!DOCTYPE html>
		<html lang="en">
			<head><title>Responsive table</title></head>
			<body>
				<section rvt-table-responsive aria-label="Services" tabindex="0">
					<rvt-table><table></table></rvt-table>
				</section>
			</body>
		</html>
	`).toBeValid();
	await expect(`
		<!DOCTYPE html>
		<html lang="en">
			<head><title>Responsive table</title></head>
			<body>
				<section rvt-table-responsive aria-labelledby="caption" tabindex="0">
					<rvt-table>
						<table><caption id="caption">Services</caption></table>
					</rvt-table>
				</section>
			</body>
		</html>
	`).toBeValid();
	await expect(`
		<!DOCTYPE html>
		<html lang="en">
			<head><title>Responsive table</title></head>
			<body>
				<section rvt-table-responsive tabindex="0">
					<rvt-table><table></table></rvt-table>
				</section>
			</body>
		</html>
	`).toBeInvalid();
	await expect(`
		<!DOCTYPE html>
		<html lang="en">
			<head><title>Responsive table</title></head>
			<body>
				<section rvt-table-responsive aria-label="Services">
					<rvt-table><table></table></rvt-table>
				</section>
			</body>
		</html>
	`).toBeInvalid();
	await expect(`
		<!DOCTYPE html>
		<html lang="en">
			<head><title>Responsive table</title></head>
			<body>
				<div rvt-table-responsive aria-label="Services" tabindex="0">
					<rvt-table><table></table></rvt-table>
				</div>
			</body>
		</html>
	`).toBeInvalid();
});

test("striped conflicts with plain tone", async () => {
	await expect(`
		<!DOCTYPE html>
		<html lang="en">
			<head><title>Plain table</title></head>
			<body>
				<rvt-table tone="plain" borders="none"><table></table></rvt-table>
			</body>
		</html>
	`).toBeValid();
	await expect(`
		<!DOCTYPE html>
		<html lang="en">
			<head><title>Plain table</title></head>
			<body>
				<rvt-table tone="plain" striped><table></table></rvt-table>
			</body>
		</html>
	`).toBeInvalid();
});
