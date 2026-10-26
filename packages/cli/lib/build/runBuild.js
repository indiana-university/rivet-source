// packages/cli/lib/build/runBuild.js

/************************************************
 * This file handles the exported build functions
 * from the "core" and "tokens" packages
 ************************************************/

import { styleText } from "util";

// Import build commands from "core" and "tokens" packages
import { buildCore } from "@rivet-iu/core/lib/build.js";
import { buildTokens } from "@rivet-iu/tokens/lib/build.js";

// Add a space if the command is run with the --verbose flag
function addSpace(isVerbose) {
	if (isVerbose) {
		console.log(``);
	}
}

// Run the tokens and core builds
export async function runWorkspaceBuild(isVerbose, { outputDir, stickers }) {
	if (isVerbose) {
		console.log(
			`\n${styleText("#990000", "=>")} Starting build (verbose output)...`,
		);
	} else {
		console.log(`\n${styleText("#990000", "=>")} Starting build...`);
	}

	// Report tokens status
	console.log(`${styleText("#990000", "=>")} Reading tokens...`);

	addSpace(isVerbose);

	/************************************************
	 * Run the build command within "tokens" package
	 ************************************************/

	await buildTokens({ isVerbose, stickers });

	addSpace(isVerbose);

	// Report core asset status
	console.log(`${styleText("#990000", "=>")} Building core assets...`);

	addSpace(isVerbose);

	/************************************************
	 * Run the "core" package build
	 ************************************************/

	await buildCore({ outputDir, isVerbose });
}
