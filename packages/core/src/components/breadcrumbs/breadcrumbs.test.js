/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";

test("element", async () => {
	await expect(`
		<nav aria-label="Breadcrumbs">
			<rvt-breadcrumbs>
				<ol></ol>
			</rvt-breadcrumbs>
		</nav>
	`).toBeValid();
});

test("flow", async () => {
	await expect(`
		<nav aria-label="Breadcrumbs">
			<div>
				<rvt-breadcrumbs></rvt-breadcrumbs>
			</div>
		</nav>
	`).toBeValid();
	await expect(`
		<nav aria-label="Breadcrumbs">
			<span>
				<rvt-breadcrumbs></rvt-breadcrumbs>
			</span>
		</nav>
	`).toBeInvalid();
});

test("permitted content", async () => {
	await expect(`
		<nav aria-label="Breadcrumbs">
			<rvt-breadcrumbs>
				<div></div>
			</rvt-breadcrumbs>
		</nav>
	`).toBeInvalid();
	await expect(`
		<nav aria-label="Breadcrumbs">
			<rvt-breadcrumbs>
				<ol></ol>
				<ol></ol>
			</rvt-breadcrumbs>
		</nav>
	`).toBeInvalid();
});

test("required ancestors", async () => {
	await expect(`<rvt-breadcrumbs></rvt-breadcrumbs>`).toBeInvalid();
});

test("required descendants", async () => {
	await expect(`
		<nav aria-label="Breadcrumbs">
			<rvt-breadcrumbs>
				<ol aria-current></ol>
			</rvt-breadcrumbs>
		</nav>
	`).toBeInvalid();
	await expect(`
		<nav aria-label="Breadcrumbs">
			<rvt-breadcrumbs>
				<ol>
					<li aria-current></li>
				</ol>
			</rvt-breadcrumbs>
		</nav>
	`).toBeInvalid();
	await expect(`
		<nav aria-label="Breadcrumbs">
			<rvt-breadcrumbs>
				<ol>
					<li aria-current="page"></li>
				</ol>
			</rvt-breadcrumbs>
		</nav>
	`).toBeValid();
});
