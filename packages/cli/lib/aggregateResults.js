// lib/aggregateResults.js

import path from "path";

export function getTotalMatches(filesWithMatches) {
	return filesWithMatches.reduce((acc, file) => {
		// Get total matches for each attached 'matches' array
		return (
			acc +
			file.lines.reduce((lineAcc, line) => {
				return lineAcc + line.matches.length;
			}, 0)
		);
	}, 0);
}

export function getMatchesByPattern(filesWithMatches) {
	return filesWithMatches.reduce((acc, file) => {
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
					fileName: path.basename(file.filePath),
					lineNumber: line.lineNumber,
					line: line.line,
				});
			});
		});
		return acc;
	}, {});
}
