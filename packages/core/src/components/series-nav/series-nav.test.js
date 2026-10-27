/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

test("deprecated classes", async () => {
	await expect(`<nav class="rvt-series-nav"></nav>`).toBeInvalid();
	await expect(`<a class="rvt-series-nav__previous"></a>`).toBeInvalid();
	await expect(`<a class="rvt-series-nav__next"></a>`).toBeInvalid();
	await expect(`<div class="rvt-series-nav__text"></div>`).toBeInvalid();
	await expect(`<span class="rvt-series-nav__label"></span>`).toBeInvalid();
	await expect(`<span class="rvt-series-nav__item"></span>`).toBeInvalid();
	await expect(`<span class="rvt-series-nav__icon"></span>`).toBeInvalid();
});

test("element", async () => {
	/*
	await expect(`
		<nav aria-label="Series">
			<rvt-series-nav>
				<a rel="first" href="?first">First</a>
			</rvt-series-nav>
		</nav>
	`).toBeInvalid();
	*/
	await expect(`
		<nav aria-label="Series">
			<rvt-series-nav>
				<a href="?prev" rel="prev">
					<rvt-eyebrow>Previous</rvt-eyebrow>
					<span>Apple</span>
				</a>
				<a href="?next" rel="next">
					<rvt-eyebrow>Next</rvt-eyebrow>
					<span>Banana</span>
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
	await expect(`
		<nav aria-label="Series">
			<rvt-series-nav>
				<a href="?next" rel="next">Next</a>
				<a href="?next" rel="next">Next</a>
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
				<a href="?apple">Apple</a>
				<a href="?banana">Banana</a>
				<a href="?cranberry">Cranberry</a>
			</rvt-series-nav>
		</nav>
	`).toBeInvalid();
	await expect(`
		<nav aria-label="Series">
			<rvt-series-nav>
				<a href="?next" rel="next">Next</a>
				<a href="?next" rel="next">Next</a>
			</rvt-series-nav>
		</nav>
	`).toBeInvalid();
});
