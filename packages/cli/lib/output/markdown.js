// lib/output/markdown.js

import fs from "fs";
import path from "path";

export function printMarkdownResults(
	patterns,
	matchesByPattern,
	totalMatches,
	outputPath,
) {
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
			const fileData = lines.reduce(
				(acc, { filePath, fileName, lineNumber, line }) => {
					if (!acc[filePath]) {
						acc[filePath] = { fileName, filePath, occurrences: [] };
					}

					acc[filePath].occurrences.push({ lineNumber, line });
					return acc;
				},
				{},
			);

			const fileSections = Object.values(fileData).flatMap(
				({ filePath, fileName, occurrences }) => {
					// Construct relative path for CTRL/CMD + clicking and opening files
					const relativePath = path.relative(
						path.dirname(path.resolve(outputPath)),
						filePath,
					);

					const rows = occurrences.map(
						({ lineNumber, line }) => `| ${lineNumber} | ${line} |`,
					);
					return [
						`### [${fileName}](${relativePath})`,
						`\`${filePath}\``,
						`| Line | Match |`,
						`|------|-------|`,
						...rows,
						``,
					];
				},
			);

			return [`## ${pattern}`, ``, ...fileSections];
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
	fs.writeFileSync(outputPath, markdown);

	console.log(`\n-----------------------------------`);
	console.log(`Rivet CLI`);
	console.log(`-----------------------------------`);

	console.log(`\nResults written to ${outputPath}\n`);
}
