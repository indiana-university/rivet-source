import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { styleText } from "util";
import YAML from "yaml";

import { configFileName } from "../lib/config.js";
import { printBuildResults } from "../lib/build/results.js";
import { runWorkspaceBuild } from "../lib/build/runBuild.js";

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
	.action(async (options) => {
		// Get Rivet config file
		const configFilePath = path.resolve(process.cwd(), options.config);

		// Set output directory relative to where the command was run
		const outputDir = path.resolve(
			// Path where command was run
			process.cwd(),

			// Set to CLI-defined <dir>, else set to default directory path
			options.output ?? "@rivet-iu/core/dist",
		);

		// Initialize bool for sticker existence in config file
		let stickersExist = false;

		/************************************************
		 * Read Rivet configuration file
		 ************************************************/

		let file;

		try {
			file = fs.readFileSync(configFilePath, "utf8");

			console.log(
				`\n${styleText("blue", "Configuration found")}: ${options.config}`,
			);
		} catch (error) {
			if (error.code === "ENOENT") {
				// No Rivet configuration was found; report as a warning
				console.log(
					`\n${styleText("yellow", "Warning")}: The configuration file "${options.config}" does not exist.\n\nContinuing build with full Rivet assets.`,
				);

				// Run a full build with all Rivet assets
				await runWorkspaceBuild(options.verbose, { outputDir, stickers });

				// Report build results to terminal
				printBuildResults("None", outputDir, stickersExist);

				// Exit script
				process.exit(1);
			}
		}

		// Parse contents of config for stickers
		const config = YAML.parse(file) ?? {};
		let stickers = null;

		// Only add stickers if they exist, are uncommented, and have values in the config file
		if (Array.isArray(config.stickers) && config.stickers.length > 0) {
			stickers = config.stickers;
			stickersExist = true;
		}

		// Run the "tokens" and "core" builds
		await runWorkspaceBuild(options.verbose, { outputDir, stickers });

		// Report build results to terminal
		printBuildResults(config, outputDir, stickersExist);
	});

export default buildCommand;
