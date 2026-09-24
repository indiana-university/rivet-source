import { execSync } from "node:child_process";
import { styleText } from "util";

// Run the tokens and core builds with the given environment variables
export function runWorkspaceBuild(env, verbose, { outputDir }) {
	let debug;
	if (verbose === true) {
		debug = "inherit";
		console.log(
			`\n${styleText("#990000", "=>")} Starting build (verbose output)...`,
		);
	} else if (verbose === false) {
		debug = "ignore";
		console.log(`\n${styleText("#990000", "=>")} Starting build...`);
	}

	console.log(`${styleText("#990000", "=>")} Reading tokens...`);

	if (verbose === true) {
		console.log(``);
	}

	execSync("pnpm --filter @rivet-iu/tokens build", { stdio: `${debug}`, env });

	if (verbose === true) {
		console.log(``);
	}

	console.log(`${styleText("#990000", "=>")} Building core assets...`);

	if (verbose === true) {
		console.log(``);
	}

	let coreBuildCommand;
	if (outputDir) {
		coreBuildCommand = `pnpm --filter @rivet-iu/core build --outDir ${JSON.stringify(outputDir)} --emptyOutDir`;
	} else {
		coreBuildCommand = `pnpm --filter @rivet-iu/core build`;
	}

	execSync(coreBuildCommand, { stdio: `${debug}`, env });
}
