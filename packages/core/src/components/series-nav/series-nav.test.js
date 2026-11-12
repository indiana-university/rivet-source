/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

test("deprecated classes", async () => {
	await expect(`<nav class="rvt-seriesnav"></nav>`).toBeInvalid();
	await expect(`<a class="rvt-seriesnav__previous"></a>`).toBeInvalid();
	await expect(`<a class="rvt-seriesnav__next"></a>`).toBeInvalid();
	await expect(`<div class="rvt-seriesnav__text"></div>`).toBeInvalid();
	await expect(`<span class="rvt-seriesnav__label"></span>`).toBeInvalid();
	await expect(`<span class="rvt-seriesnav__item"></span>`).toBeInvalid();
	await expect(`<span class="rvt-seriesnav__icon"></span>`).toBeInvalid();
});

test("element", async () => {
	await expect(`
		<nav aria-label="Series">
			<rvt-series-nav>
				<a href="?banana" rel="prev">
					<rvt-eyebrow>Previous</rvt-eyebrow>
					<span>Banana</span>
				</a>
				<a href="?cranberry" rel="next">
					<rvt-eyebrow>Next</rvt-eyebrow>
					<span>Cranberry</span>
				</a>
			</rvt-series-nav>
		</nav>
	`).toBeValid();
});

test("flow", async () => {
	await expect(`
		<nav aria-label="Series">
			<div>
				<rvt-series-nav></rvt-series-nav>
			</div>
		</nav>
	`).toBeValid();
	await expect(`
		<nav aria-label="Series">
			<span>
				<rvt-series-nav></rvt-series-nav>
			</span>
		</nav>
	`).toBeInvalid();
});

test("permitted content", async () => {
	await expect(`
		<nav aria-label="Series">
			<rvt-series-nav>
				<div></div>
			</rvt-series-nav>
		</nav>
	`).toBeInvalid();
});

test("required ancestors", async () => {
	await expect(`<rvt-series-nav></rvt-series-nav>`).toBeInvalid();
});

test("required descendants", async () => {
	await expect(`
		<nav aria-label="Series">
			<rvt-series-nav>
				<a href="?banana">Banana</a>
			</rvt-series-nav>
		</nav>
	`).toBeInvalid();
	await expect(`
		<nav aria-label="Series">
			<rvt-series-nav>
				<a href="?banana" rel="prev">Banana</a>
				<a href="?banana" rel="prev">Banana</a>
			</rvt-series-nav>
		</nav>
	`).toBeInvalid();
	await expect(`
		<nav aria-label="Series">
			<rvt-series-nav>
				<a href="?cranberry" rel="next">Cranberry</a>
				<a href="?cranberry" rel="next">Cranberry</a>
			</rvt-series-nav>
		</nav>
	`).toBeInvalid();
});
