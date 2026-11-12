/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

test("deprecated classes", async () => {
	await expect(`<ul class="rvt-pagination"></ul>`).toBeInvalid();
	await expect(`<li class="rvt-pagination__item"></li>`).toBeInvalid();
});

test("element", async () => {
	await expect(`
		<nav aria-label="Pagination">
			<rvt-pagination>
				<ul></ul>
			</rvt-pagination>
		</nav>
	`).toBeValid();
});

test("flow", async () => {
	await expect(`
		<nav aria-label="Pagination">
			<div>
				<rvt-pagination></rvt-pagination>
			</div>
		</nav>
	`).toBeValid();
	await expect(`
		<nav aria-label="Pagination">
			<span>
				<rvt-pagination></rvt-pagination>
			</span>
		</nav>
	`).toBeInvalid();
});

test("permitted content", async () => {
	await expect(`
		<nav aria-label="Pagination">
			<rvt-pagination>
				<div></div>
			</rvt-pagination>
		</nav>
	`).toBeInvalid();
	await expect(`
		<nav aria-label="Pagination">
			<rvt-pagination>
				<ul></ul>
				<ul></ul>
			</rvt-pagination>
		</nav>
	`).toBeInvalid();
});

test("required ancestors", async () => {
	await expect(`<rvt-pagination></rvt-pagination>`).toBeInvalid();
});

test("required descendants", async () => {
	await expect(`
		<nav aria-label="Pagination">
			<rvt-pagination>
				<ul>
					<li>
						<svg></svg>
					</li>
				</ul>
			</rvt-pagination>
		</nav>
	`).toBeInvalid();
	await expect(`
		<nav aria-label="Pagination">
			<rvt-pagination>
				<ul>
					<li aria-current></li>
				</ul>
			</rvt-pagination>
		</nav>
	`).toBeInvalid();
	await expect(`
		<nav aria-label="Pagination">
			<rvt-pagination>
				<ul>
					<li>
						<a aria-current="page"></a>
					</li>
					<li>
						<a aria-current="page"></a>
					</li>
				</ul>
			</rvt-pagination>
		</nav>
	`).toBeInvalid();
	await expect(`
		<nav aria-label="Pagination">
			<rvt-pagination>
				<ul>
					<li>
						<a aria-current="page"></a>
					</li>
				</ul>
			</rvt-pagination>
		</nav>
	`).toBeValid();
});
