import { Command } from "commander";
import fs from "fs";
import path from "path";

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
		const regex = new RegExp(patterns.join("|"), "gi");

		// Results for each file
		const filesWithMatches = [];

		const search = (searchedDir) => {
			// Get every file and directory in the searched directory
			const entries = fs.readdirSync(searchedDir, {
				recursive: true,

				// Include <fs.Dirent> information about directories
				withFileTypes: true,
			});

			// Filter out everything except files
			const files = entries.filter((entry) => entry.isFile());

			for (const file of files) {
				// Construct full file path from Dirent properties
				const fullPath = path.join(file.parentPath, file.name);

				// Get contents of file
				const contents = fs.readFileSync(fullPath, "utf8");

				const lines = contents
					// Split contents line by line
					.split(/\r?\n/)

					// Put line and its line number into an object
					.map((line, i) => ({
						line,
						lineNumber: i + 1,
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
	});

export default searchCommand;
