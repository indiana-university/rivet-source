import { Command } from "commander";
import fs from "fs";
import path from "path";

import { searchRegexFlags } from "../lib/config.js";
import { searchFiles } from "../lib/searchFiles.js";
import { printConsoleResults } from "../lib/output/console.js";
import { printMarkdownResults } from "../lib/output/markdown.js";
import {
	getMatchesByPattern,
	getTotalMatches,
} from "../lib/aggregateResults.js";

const searchCommand = new Command("search")
	.description("find strings matching a pattern")
	.argument("<dir>", "directory to search in")
	.argument(
		"<pattern...>",
		"specify string (for multiples, separate each with a space)",
	)
	.option("-o, --output <file>", "write results to a Markdown file")
	.action((dir, patterns, options) => {
		const dirPath = path.resolve(dir);
		if (!fs.existsSync(dirPath)) {
			console.error(`\nError: the "${dir}" directory does not exist\n`);
			process.exit(1);
		}

		// Build regex from pattern(s)
		// Global search, ignores case
		const regex = new RegExp(patterns.join("|"), searchRegexFlags);

		// Search files for matches
		const filesWithMatches = searchFiles(dirPath, regex);

		/*
		 * Total matches
		 * -------------
		 * Get integer value of total matches of all patterns across every file
		 */

		const totalMatches = getTotalMatches(filesWithMatches);

		/*
		 * Total matches per pattern
		 * -------------------------
		 * Get object with total match integer value per each pattern
		 */

		const matchesByPattern = getMatchesByPattern(filesWithMatches);

		/*
		 * Output results
		 */

		if (options.output) {
			// Write results to user-named file
			printMarkdownResults(
				patterns,
				matchesByPattern,
				totalMatches,
				options.output,
			);
		} else {
			// Print results to command line
			printConsoleResults(patterns, matchesByPattern, totalMatches);
		}
	});

export default searchCommand;
