/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { expect, test } from "vitest";
import "html-validate/vitest";
import { deprecatedClasses } from "./button.metadata.js";

test("deprecated classes", async () => {
	const deprecatedButtonClasses = deprecatedClasses
		.map((dc) => dc.class)
		.filter((c) => !c.includes("__"));
	for (const _class of deprecatedButtonClasses) {
		await expect(`
			<button class="${_class}" type="button">Save</button>
		`).toBeInvalid();
	}
	await expect(`<span class="rvt-button__content"></span>`).toBeInvalid();
});

test("required descendants", async () => {
	await expect(`
		<rvt-button>
			<a></a>
		</rvt-button>
	`).toBeValid();
	await expect(`
		<rvt-button>
			<button type="button">Go</button>
		</rvt-button>
	`).toBeValid();
	await expect(`
		<rvt-button>
			<span></span>
		</rvt-button>
	`).toBeInvalid();
	await expect(`
		<rvt-button>
			<a></a>
			<a></a>
		</rvt-button>
	`).toBeInvalid();
	await expect(`
		<rvt-button>
			<button type="button">Save</button>
			<button type="button">Save</button>
		</rvt-button>
	`).toBeInvalid();
	await expect(`
		<rvt-button>
			<a></a>
			<button type="button">Save</button>
		</rvt-button>
	`).toBeInvalid();
	await expect(`
		<rvt-button>
			<button type="button">
				<svg></svg>
				Save
			</button>
		</rvt-button>
	`).toBeInvalid();
});
