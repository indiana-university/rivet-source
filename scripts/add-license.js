/*
 * Adds license banner to top of staged files
 */

import { readFileSync, writeFileSync } from "fs";
import { ANSI } from "./utils/ansi-colors.js";
import { licenseText } from "./utils/license-header.js";

// Build header comment from license text
const rawLines = licenseText.split("\n");
const commentLines = rawLines.map(line => ` * ${line}`);
const header = `/*\n${commentLines.join("\n")}\n */`;

// Get array of files via standalone command or lint-staged
const files = process.argv.slice(2);

for (const file of files) {
	const contents = readFileSync(file, "utf8");
	const firstFewLines = contents.split("\n").slice(0, 6).join("\n");

	if (!firstFewLines.includes(header)) {
		writeFileSync(file, `${header}\n\n${contents}`);
		console.log(`${ANSI.green}+${ANSI.reset} Added license: ${file}`);
	}
}
