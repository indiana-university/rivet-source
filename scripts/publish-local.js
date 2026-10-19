/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

/*
 * Publishes packages to a local Verdaccio registry with throwaway test versions, then restores the original package.json files
 */

import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const REGISTRY = "http://localhost:4873";
const PACKAGES = ["cli", "core", "tokens"];

// Optional label for the test version, e.g. "sticker-optimization"
// Defaults to "test" if not provided
const label = (process.argv[2] ?? "test")
	.toLowerCase()
	.replace(/[^0-9a-z-]+/g, "-")
	.replace(/^-+|-+$/g, "");

if (!label) {
	throw new Error("Label must contain at least one letter, number or hyphen");
}

// Unique test version per run so pnpm never reuses a cached copy
const suffix = `${label}.${Date.now()}`;

const originals = new Map();
let cliVersion;

// On Ctrl+C, let the pnpm child process exit first so "finally" still restores files
process.on("SIGINT", () => {});

try {
	for (const name of PACKAGES) {
		const file = `packages/${name}/package.json`;
		const raw = readFileSync(file, "utf8");

		const pkg = JSON.parse(raw);

		// Match any label (default "test" or custom via command argument) followed by a 13-digit timestamp, e.g. "sticker-optimization.1792437855778"
		if (/-[0-9a-z-]+\.\d{13}$/.test(pkg.version)) {
			throw new Error(
				`${file} already has a test version (${pkg.version}); restore it first`,
			);
		}

		originals.set(file, raw);

		pkg.version = `${pkg.version}-${suffix}`;
		if (name === "cli") cliVersion = pkg.version;

		writeFileSync(file, `${JSON.stringify(pkg, null, "\t")}\n`);
	}

	execFileSync(
		"pnpm",
		["publish", "-r", "--registry", REGISTRY, "--no-git-checks"],
		{ stdio: "inherit" },
	);

	console.log(`\nRun: pnpm dlx @rivet-iu/cli@${cliVersion} build`);
} finally {
	// Put back the exact original package.json file contents
	for (const [file, raw] of originals) {
		writeFileSync(file, raw);
	}
}
