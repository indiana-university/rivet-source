// lib/output/console.js

// Generic output wrapper
export function printWrapper(renderContent) {
	console.log(`\n${"-".repeat(32)}\n`);
	renderContent();
}

export function printSearchResults(patterns, matchesByPattern, totalMatches) {
	console.log(`\n${"-".repeat(32)}`);
	console.log(`Rivet CLI - Search results`);
	console.log(`\n${"-".repeat(32)}`);

	console.log(`\nSEARCH QUERY`);

	console.log(`\nQueried patterns: `, `"${patterns.join('", "')}"`);

	console.log(`\n${"-".repeat(32)}\n`);

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
