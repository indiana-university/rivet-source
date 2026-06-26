// lib/searchFiles.js

import fs from "fs";
import path from "path";

import { excludedDirs } from "../lib/config.js";

export function searchFiles(dirPath, regex) {
	const filesWithMatches = [];

	const search = (searchedDir) => {
		// Get every file and directory in the searched directory
		const entries = fs.readdirSync(searchedDir, {
			recursive: true,

			// Include <fs.Dirent> information about directories
			withFileTypes: true,
		});

		// Filter out everything but desired files
		const files = entries.filter(
			(entry) =>
				entry.isFile() &&
				!entry.parentPath
					.split(path.sep)
					.some((seg) => excludedDirs.includes(seg)),
		);

		for (const file of files) {
			// Construct full file path from Dirent properties
			const fullPath = path.join(file.parentPath, file.name);

			// Get contents of file
			const contents = fs.readFileSync(fullPath, "utf8");

			const lines = contents
				// Split contents line by line
				.split(/\r?\n/)

				// Put line and its line number into an object
				.map((line, index) => ({
					line,
					lineNumber: index + 1,
				}))

				// Filter to only lines containing a pattern match
				.filter(({ line }) => {
					regex.lastIndex = 0;
					return regex.test(line);
				})

				// Attach every matched pattern to each result
				.map(({ line, lineNumber }) => ({
					line,
					lineNumber,
					matches: line.match(regex),
				}));

			if (lines.length > 0) {
				filesWithMatches.push({
					filePath: fullPath,
					lines,
				});
			}
		}
	};

	search(dirPath);

	return filesWithMatches;
}
