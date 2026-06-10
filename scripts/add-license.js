/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

/*
 * Adds license banner to top of staged files
 */

import { readFileSync, writeFileSync } from "fs";
import { ANSI } from "./utils/ansi-colors.js";
import { license } from "./utils/license-header.js";

// Get array of files via standalone command or lint-staged
const files = process.argv.slice(2);

for (const file of files) {
	const contents = readFileSync(file, "utf8");

	if (!contents.startsWith(license.header)) {
		writeFileSync(file, license.header + contents);
		console.log(`${ANSI.green}+${ANSI.reset} Added license: ${file}`);
	}
}
