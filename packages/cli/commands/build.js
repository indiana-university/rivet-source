import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { styleText } from "util";
import YAML from "yaml";

import { configFileName } from "../lib/config.js";
import { printWrapper } from "../lib/output/console.js";
import { runWorkspaceBuild } from "../lib/build/runBuild.js";
import { printBuildResults } from "../lib/build/results.js";

const buildCommand = new Command("build")
	.description("build the design system using the Rivet config file")
	.option(
		"-c, --config <file>",
		"name of the Rivet config file to use",
		configFileName,
	)
	.option("-o, --output <dir>", "directory to output built assets into")
	.option(
		"-v, --verbose",
		"print detailed output from the build process",
		false,
	)
	.action((options) => {
		// Get Rivet config file
		const configFilePath = path.resolve(process.cwd(), options.config);

		// Store default environment variables
		const buildEnv = { ...process.env };

		// Set output directory
		const outputDir = path.resolve(
			// Path where command was run
			process.cwd(),

			// Set to defined <dir>, else set to default directory name
			options.output ?? "rivet-assets",
		);

		// Initialize bool for sticker existence in config file
		let stickersExist = false;

		// Check if config file exists
		// Read data if it does
		let file;

		try {
			file = fs.readFileSync(configFilePath, "utf8");

			console.log(
				`\n${styleText("blue", "Configuration found")}: ${options.config}`,
			);
		} catch (error) {
			if (error.code === "ENOENT") {
				console.log(
					`\n${styleText("yellow", "Warning")}: The configuration file "${options.config}" does not exist.\n\nContinuing build with full Rivet assets.`,
				);

				runWorkspaceBuild(buildEnv, options.verbose, { outputDir });
				printBuildResults("None", outputDir, stickersExist);

				// Bail out of remaining script
				process.exit(1);
			}
		}

		// Parse contents of config for only stickers
		const config = YAML.parse(file) ?? {};
		const stickers = config.stickers;

		// Only add stickers to build env if they are set in configuration file
		if (Array.isArray(stickers) && stickers.length > 0) {
			buildEnv.RIVET_STICKERS = JSON.stringify(stickers);
			stickersExist = true;
		}

		// Run the "tokens" and "core" pnpm workspace builds with the custom environment variables
		runWorkspaceBuild(buildEnv, options.verbose, { outputDir });

		// Print build results
		printBuildResults(config, outputDir, stickersExist);
	});

export default buildCommand;
