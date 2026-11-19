// lib/build/outputDir.js

/************************************************
 * The build empties its output directory before
 * writing. A directory that already holds Rivet's
 * main build files is treated as a previous Rivet
 * build, so the CLI never empties a directory
 * holding other files.
 ************************************************/

import fs from "node:fs";

import { requiredBuildFiles } from "../config.js";

/**
 * Checks whether the build may empty the output directory.
 *
 * Safe when the directory doesn't exist yet, is empty, or holds
 * all of Rivet's main build files from a previous build.
 *
 * @param {string} dir - Absolute path to the output directory.
 * @returns {boolean} True if the directory can be emptied.
 */
export function isSafeToEmpty(dir) {
	// Nothing to delete yet
	if (!fs.existsSync(dir)) {
		return true;
	}

	// A file (not a directory) at this path can't be used as output
	if (!fs.statSync(dir).isDirectory()) {
		return false;
	}

	const entries = fs.readdirSync(dir);

	// Empty directories, or ones Rivet built before
	return (
		entries.length === 0 ||
		requiredBuildFiles.every((file) => entries.includes(file))
	);
}
