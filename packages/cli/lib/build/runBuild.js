import { execSync } from "node:child_process";
import { styleText } from "util";

// Add a space if the command is run with the --verbose flag
function addSpace(isVerbose) {
	if (isVerbose) {
		console.log(``);
	}
}

// Run the tokens and core builds with the given environment variables
export function runWorkspaceBuild(env, isVerbose, { outputDir }) {
	let debug;
	if (isVerbose) {
		debug = "inherit";
		console.log(
			`\n${styleText("#990000", "=>")} Starting build (verbose output)...`,
		);
	} else {
		debug = "ignore";
		console.log(`\n${styleText("#990000", "=>")} Starting build...`);
	}

	// Report tokens status
	console.log(`${styleText("#990000", "=>")} Reading tokens...`);

	addSpace(isVerbose);

	// Run the build command within "tokens" package
	execSync("pnpm --filter @rivet-iu/tokens build", { stdio: `${debug}`, env });

	addSpace(isVerbose);

	// Report core asset status
	console.log(`${styleText("#990000", "=>")} Building core assets...`);

	addSpace(isVerbose);

	let coreBuildCommand;

	// Output assets to custom directory if flagged in command
	if (outputDir) {
		coreBuildCommand = `pnpm --filter @rivet-iu/core build --outDir ${JSON.stringify(outputDir)} --emptyOutDir`;
	} else {
		coreBuildCommand = `pnpm --filter @rivet-iu/core build`;
	}

	// Run the build command within "core" package
	execSync(coreBuildCommand, { stdio: `${debug}`, env });
}
