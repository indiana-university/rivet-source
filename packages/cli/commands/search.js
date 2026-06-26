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

		// Matches for each file
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

		/*
		 * Total matches
		 * -------------
		 * Get integer value of total matches of all patterns across every file
		 */

		const totalMatches = filesWithMatches.reduce((acc, file) => {
			// Get total matches for each attached 'matches' array
			return (
				acc +
				file.lines.reduce((lineAcc, line) => {
					return lineAcc + line.matches.length;
				}, 0)
			);
		}, 0);

		/*
		 * Total matches per pattern
		 * -------------------------
		 * Get object with total match integer value per each pattern
		 */

		// Get matches for each pattern
		const matchesByPattern = filesWithMatches.reduce((acc, file) => {
			// Each matched line
			file.lines.forEach((line) => {
				// Each matched pattern per line
				line.matches.forEach((match) => {
					const normalizedMatch = match.toLowerCase();
					if (!acc[normalizedMatch]) {
						acc[normalizedMatch] = [];
					}

					acc[normalizedMatch].push({
						filePath: file.filePath,
						lineNumber: line.lineNumber,
						line: line.line,
					});
				});
			});
			return acc;
		}, {});

		/*
		 * Output results
		 */

		// Write results to user-named file
		if (options.output) {
			const fileIntro = () => {
				return [
					`# Rivet CLI`,

					``,

					`## Search results for: \"${patterns.join('\", \"')}\"`,

					``,

					`**Total matches: ${totalMatches}**`,
				];
			};

			const patternTable = () => {
				return [
					`| Pattern | Count |`,
					`|---------|-------|`,
					...Object.entries(matchesByPattern).map(
						([pattern, lines]) => `| ${pattern} | ${lines.length} |`,
					),
				];
			};

			const patternSections = Object.entries(matchesByPattern).flatMap(
				([pattern, lines]) => {
					const rows = lines.map(
						({ filePath, lineNumber, line }) =>
							`| ${filePath} | ${lineNumber} | ${line} |`,
					);

					return [
						`## ${pattern}`,
						`| File | Line | Match |`,
						`|------|------|-------|`,
						...rows,
						``,
					];
				},
			);

			const markdown = [
				...fileIntro(),

				``,

				...patternTable(),

				``,

				...patternSections,
			].join("\n");

			// Write Markdown syntax file
			fs.writeFileSync(options.output, markdown);

			console.log(`\n-----------------------------------`);
			console.log(`Rivet CLI`);
			console.log(`-----------------------------------`);

			console.log(`\nResults written to ${options.output}\n`);
		} else {
			const patternResults = Object.entries(matchesByPattern)
				.map(([pattern, count]) => `  * ${pattern}: ${count}`)
				.join("\n");

			console.log(`\n--------------------------------`);
			console.log(`Rivet CLI - Search results`);
			console.log(`--------------------------------`);

			console.log(`\nSEARCH QUERY`);

			console.log(`\nQueried patterns: `, `"${patterns.join('", "')}"`);

			console.log(`\n--------------------------------`);

			console.log(`\nMATCHES`);

			console.log(`\nTotal matches: ${totalMatches}\n`);

			const tableData = Object.entries(matchesByPattern).map(
				([pattern, count]) => ({
					Pattern: pattern,
					Count: count,
				}),
			);

			console.table(tableData);
		}
	});

export default searchCommand;
