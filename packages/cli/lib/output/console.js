// lib/output/console.js

export function printConsoleResults(patterns, matchesByPattern, totalMatches) {
	console.log(`\n--------------------------------`);
	console.log(`Rivet CLI - Search results`);
	console.log(`--------------------------------`);

	console.log(`\nSEARCH QUERY`);

	console.log(`\nQueried patterns: `, `"${patterns.join('", "')}"`);

	console.log(`\n--------------------------------`);

	console.log(`\nMATCHES`);

	console.log(`\nTotal matches: ${totalMatches}\n`);

	const tableData = Object.entries(matchesByPattern).map(
		([pattern, lines]) => ({
			Pattern: pattern,
			Count: lines.length,
		}),
	);

	console.table(tableData);
}
