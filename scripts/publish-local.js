/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

/*
 * Publishes cli, core and tokens to a local Verdaccio registry for testing.
 *
 * Usage:
 *	pnpm publish:local [label]
 *	Example: pnpm publish:local sticker-optimization
 *
 * Requires:
 *	- Verdaccio running at http://localhost:4873
 *	  Start it in a separate terminal and leave it running: pnpm dlx verdaccio
 *
 *	- A one-time Verdaccio login from the command line (not the web UI):
 *	  pnpm login --registry http://localhost:4873 --scope @rivet-iu
 *	  Any username, password and email work; the account only exists locally.
 *
 *	  The login does two things:
 *	    1. Allows publishing to Verdaccio
 *	    2. Makes pnpm install @rivet-iu/* packages from Verdaccio instead of npm
 *	  Always include "--scope @rivet-iu". Without it, pnpm uses Verdaccio for every package on your machine, which breaks installs whenever Verdaccio isn't running.
 *
 *	  Check it worked: pnpm config get @rivet-iu:registry  (→ http://localhost:4873/)
 *	  When done testing: pnpm logout --registry http://localhost:4873

 * Steps:
 *	1. Adds "-<label>.<timestamp>" to each Rivet package's package.json version
 *	2. Publishes all packages to Verdaccio
 *	3. Restores the original package.json files, even if publishing fails
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { styleText } from "node:util";

const VERDACCIO_URL = "http://localhost:4873";
const PACKAGES = ["cli", "core", "tokens"];

// Regex to match versions created by this script which end in "-<label>.<13-digit timestamp>"
// Example: "3.0.0-alpha.11-sticker-optimization.1792437855778"
const TEST_VERSION = /-[0-9a-z-]+\.\d{13}$/;

// Optional label to distinguish test versions (examples: "sticker-optimization", "cli-updates", etc.)
// Must contain at least one letter, number or hyphen
// If a custom label isn't provided, value defaults to "test"
const label = (process.argv[2] ?? "test")
	.toLowerCase()
	// Replace anything that isn't a letter, number or hyphen with "-"
	.replace(/[^0-9a-z-]+/g, "-")
	// Remove leading hyphens
	.replace(/^-+/, "")
	// Remove trailing hyphens
	.replace(/-+$/, "");

if (!label) {
	throw new Error("Label must contain at least one letter, number or hyphen");
}

// Unique test version per run so pnpm never reuses a cached copy
const suffix = `${label}.${Date.now()}`;

const originals = [];
let cliVersion;

// On Ctrl+C, let the pnpm child process exit first so "finally" still restores files
process.on("SIGINT", () => {});

console.log(
	`\n${styleText("#990000", "=>")} Starting publish of local packages to Verdaccio\n`,
);

try {
	for (const name of PACKAGES) {
		const file = `packages/${name}/package.json`;
		const originalContents = readFileSync(file, "utf8");

		const pkg = JSON.parse(originalContents);

		// Stop if a previous interrupted run left a test version behind in a package.json file
		if (TEST_VERSION.test(pkg.version)) {
			throw new Error(
				`${file} has a leftover test version (${pkg.version}). Remove the "-<label>.<timestamp>" ending from "version" and run again.`,
			);
		}

		originals.push({ file, originalContents });

		pkg.version = `${pkg.version}-${suffix}`;
		if (name === "cli") cliVersion = pkg.version;

		console.log(`${styleText("#990000", "=>")} ${name}: ${pkg.version}`);

		writeFileSync(file, `${JSON.stringify(pkg, null, "\t")}\n`);
	}

	console.log(
		`\n${styleText("#990000", "=>")} Publishing to Verdaccio (${styleText("cyan", `${VERDACCIO_URL}`)})...\n`,
	);

	try {
		execFileSync(
			"pnpm",
			["publish", "-r", "--registry", VERDACCIO_URL, "--no-git-checks"],
			// Capture output instead of showing it
			{ stdio: "pipe", maxBuffer: 64 * 1024 * 1024 },
		);
	} catch (error) {
		// Publishing failed
		// Show the hidden output to help with troubleshooting
		process.stdout.write(error.stdout ?? "");
		process.stderr.write(error.stderr ?? "");
		throw error;
	}
} finally {
	// Put back the exact original package.json file contents
	for (const { file, originalContents } of originals) {
		writeFileSync(file, originalContents);
	}

	// Print confirmation of restored package.json files only if any were modified
	if (originals.length) {
		console.log(
			`${styleText("#990000", "=>")} Restored original package.json files`,
		);
	}
}

console.log(`\n${styleText("#990000", "=>")} Publish complete!`);

// Displays published test version command to run with the Rivet CLI
// Example: "pnpm dlx @rivet-iu/cli@1.0.0-alpha.1-sticker-optimization.<13-digit-timestamp> build"
console.log(
	`\n${styleText("blue", "Run the published package:")}\npnpm dlx @rivet-iu/cli@${cliVersion} <command>`,
);
