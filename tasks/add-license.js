/*
 * Adds license banner to top of staged files
 */

import { readFileSync, writeFileSync } from "fs";

const header = `/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */`;

const files = process.argv.slice(2);

for (const file of files) {
	const contents = readFileSync(file, "utf8");
	const firstFewLines = contents.split("\n").slice(0, 6).join("\n");

	if (!firstFewLines.includes("SPDX-License-Identifier")) {
		writeFileSync(file, `${header}\n\n${contents}`);
		/*
		 * Add ANSI green `+` symbol before each changelog
		 * ===============================================
		 * \x1b[32m - sets color to green
		 * prints the `+` symbol
		 * \x1b[0m - resets back to default color
		 */
		console.log(`\x1b[32m+\x1b[0m Added license: ${file}`);
	}
}
