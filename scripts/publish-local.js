/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

/*
 * Publishes cli, core and tokens to a local Verdaccio registry for testing before release
 *
 * Usage:
 *	pnpm publish:local
 *	  Publishes the current package.json versions as they are
 *	  Use this afterbumping versions (e.g. with "pnpm changeset version") to test a real release
 *	  Versions already published in Verdaccio are skipped
 *	  If every outgoing package is already published, the script stops
 *
 *	pnpm publish:local [label] --random
 *	  Publishes throwaway test versions ("<version>-<label>.<version>-<label>-<yyyymmdd>-<hhmmss>") without bumping anything
 *	  The label is optional and defaults to the current branch name, or "test" if one isn't provided
 *	  Examples:
 *	    pnpm publish:local --random
 *	    pnpm publish:local sticker-optimization --random
 *
 * Steps:
 *	1. Reads every package.json and stops if one includes a leftover test version
 *	2. Publishes to Verdaccio:
 *	   - Default: skips versions already in Verdaccio, then publishes the rest
 *	   - --random: adds "-<label>.-<label>-<yyyymmdd>-<hhmmss>" to each version, publishes, then
 *	     restores the original package.json files, even if publishing fails
 *	3. Prints the "pnpm dlx" command for the published CLI
 */

import { execFileSync, execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { parseArgs, styleText } from "node:util";

/************************************************************
 * Settings
 ************************************************************/

const VERDACCIO_URL = "http://localhost:4873";

// Verdaccio serves plain http by default
if (new URL(VERDACCIO_URL).protocol !== "http:") {
	throw new Error(
		`VERDACCIO_URL must use http (got "${VERDACCIO_URL}"). Verdaccio doesn't serve https by default.`,
	);
}

const PACKAGES = ["cli", "core", "tokens"];

// Regex to match versions created by this script which end in "-<label>-<label>-<yyyymmdd>-<hhmmss>"
// Example: "3.0.0-alpha.11-sticker-optimization.1792437855778"
const TEST_VERSION = /-[0-9a-z-]+-\d{8}-\d{6}$/;

/************************************************************
 * Steps
 ************************************************************/

// Read the command-line arguments
// Example: pnpm publish:local sticker-optimization --random
function readOptions() {
	const { values, positionals } = parseArgs({
		allowPositionals: true,
		options: {
			random: { type: "boolean", default: false },
		},
	});

	// --random publishes throwaway test versions instead of the current package.json versions
	const isRandom = values.random;

	// A label only makes sense for random test versions
	if (positionals[0] && !isRandom) {
		throw new Error(
			`A label only applies with --random (e.g. pnpm publish:local ${positionals[0]} --random)`,
		);
	}

	// (Only used with --random flag) Label to distinguish test versions (examples: "sticker-optimization", "cli-updates", etc.)
	// Must contain at least one letter, number or hyphen
	// If no label is given, defaults to the current branch name (without a "v#-" prefix), or "test" if there isn't one
	const label = (positionals[0] || getCurrentBranch() || "test")
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

	return { isRandom, label };
}

// Current git branch without a leading version prefix
// Example: "v3-sticker-optimization" → "sticker-optimization"
// Returns "" if there's no branch (e.g. detached HEAD) or git isn't available
function getCurrentBranch() {
	try {
		return execSync("git branch --show-current", {
			encoding: "utf-8",
			stdio: ["ignore", "pipe", "ignore"],
		})
			.trim()
			.replace(/^v\d+-/, "");
	} catch {
		return "";
	}
}

// Read and check every package.json first, so nothing is changed if a check fails
function readPackages() {
	const packages = [];

	for (const name of PACKAGES) {
		const file = `packages/${name}/package.json`;
		const originalContents = readFileSync(file, "utf8");

		const pkg = JSON.parse(originalContents);

		// Stop if a previous interrupted run left a test version behind in a package.json file
		if (TEST_VERSION.test(pkg.version)) {
			throw new Error(
				`${file} has a leftover test version (${pkg.version}). Remove the "-<label>-<yyyymmdd>-<hhmmss>" ending from "version" and run again.`,
			);
		}

		packages.push({ name, file, originalContents, pkg });
	}

	return packages;
}

// Publish every workspace package to Verdaccio, hiding pnpm's output unless it fails
function publish() {
	console.log(
		`\n${styleText("#990000", "=>")} Publishing to Verdaccio (${styleText("cyan", VERDACCIO_URL)})\n`,
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
}

// Find package versions that are already in Verdaccio, since "pnpm publish -r" skips them silently
async function findPublished(packages) {
	const published = [];

	for (const { name, pkg } of packages) {
		let response;

		try {
			response = await fetch(`${VERDACCIO_URL}/@rivet-iu%2f${name}`);
		} catch {
			throw new Error(
				`Couldn't reach Verdaccio at ${VERDACCIO_URL}. Is it running? (pnpm dlx verdaccio)`,
			);
		}

		// 404 means this package has never been published to Verdaccio
		if (response.status === 404) continue;

		if (!response.ok) {
			throw new Error(
				`Verdaccio returned ${response.status} for @rivet-iu/${name}`,
			);
		}

		const { versions = {} } = await response.json();

		if (Object.hasOwn(versions, pkg.version)) {
			published.push(`@rivet-iu/${name}@${pkg.version}`);
		}
	}

	return published;
}

// Publish throwaway test versions:
// - Change each package.json
// - Publish
// - Restore original package version
function publishTestVersions(packages, label) {
	const date = new Date();

	const dateFragments = {
		year: date.getFullYear(),
		month: String(date.getMonth() + 1).padStart(2, "0"),
		day: String(date.getDate()).padStart(2, "0"),
		hours: String(date.getHours()).padStart(2, "0"),
		minutes: String(date.getMinutes()).padStart(2, "0"),
		seconds: String(date.getSeconds()).padStart(2, "0"),
	};

	// Unique test version per run so pnpm never reuses a cached copy
	const suffix = `${label}-${dateFragments.year}${dateFragments.month}${dateFragments.day}-${dateFragments.hours}${dateFragments.minutes}${dateFragments.seconds}`;

	// Files changed so far, so "finally" restores only what was changed
	const originals = [];

	try {
		console.log(
			`\n${styleText("#990000", "=>")} Updating package versions to random version:`,
		);

		for (const { name, file, originalContents, pkg } of packages) {
			// Record each file just before changing it, so "finally" restores only what was changed
			originals.push({
				name,
				file,
				originalContents,
				originalVersion: pkg.version,
			});

			pkg.version = `${pkg.version}-${suffix}`;

			console.log(`   - ${name}: ${pkg.version}`);

			writeFileSync(file, `${JSON.stringify(pkg, null, "\t")}\n`);
		}

		publish();
	} finally {
		// Put back the exact original package.json file contents
		for (const { file, originalContents } of originals) {
			writeFileSync(file, originalContents);
		}

		// Print confirmation of restored package.json files only if any were modified
		if (originals.length) {
			console.log(
				`${styleText("#990000", "=>")} Restored original package versions:`,
			);

			for (const { name, originalVersion } of originals) {
				console.log(`   - ${name}: ${originalVersion}`);
			}

			console.log("");
		}
	}
}

// Publish the current package.json versions as they are, skipping any already in Verdaccio
async function publishCurrentVersions(packages) {
	const published = await findPublished(packages);

	// Nothing new to publish: stop instead of reporting a publish that didn't happen
	if (published.length === packages.length) {
		throw new Error(
			`Every version is already in Verdaccio:\n  ${published.join("\n  ")}\nBump a version, or use --random for throwaway test versions.`,
		);
	}

	if (published.length) {
		console.log(
			`\n${styleText("yellow", "Skipping (already in Verdaccio):")}\n  ${published.join("\n  ")}`,
		);
	}

	publish();
}

// Print a heading and the version from each package.json
function logPackageVersions(packages, heading) {
	console.log(`${styleText("#990000", "=>")} ${heading}`);

	for (const { name, pkg } of packages) {
		console.log(`   - ${name}: ${pkg.version}`);
	}
}

// Print the command to run the published CLI
// Examples:
//   pnpm dlx @rivet-iu/cli@1.0.0-alpha.2 build
//   pnpm dlx @rivet-iu/cli@1.0.0-alpha.1-sticker-optimization-<yyyymmdd>-<hhmmss> build (--random)
function logRunCommand(packages) {
	const cliVersion = packages.find(({ name }) => name === "cli").pkg.version;

	console.log(
		`\n${styleText("blue", "Run the published package:")}\npnpm dlx @rivet-iu/cli@${cliVersion} <command>`,
	);
}

/************************************************************
 * Main
 ************************************************************/

const { isRandom, label } = readOptions();

// On Ctrl+C, let the pnpm child process exit first so "finally" still restores files
process.on("SIGINT", () => {});

console.log(
	`\n${styleText("#990000", "=>")} Starting publish of local packages to Verdaccio\n`,
);

const packages = readPackages();

logPackageVersions(
	packages,
	isRandom ? "Original package versions:" : "Package versions to publish:",
);

if (isRandom) {
	publishTestVersions(packages, label);
} else {
	await publishCurrentVersions(packages);
}

console.log(`${styleText("#990000", "=>")} Publish complete!`);

logRunCommand(packages);
