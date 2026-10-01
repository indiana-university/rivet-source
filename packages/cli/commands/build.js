import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { styleText } from "util";
import YAML from "yaml";

import { configFileName } from "../lib/config.js";
import { printWrapper } from "../lib/output/console.js";
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
	.action((options) => {
		// Get Rivet config file
		const configFilePath = path.resolve(process.cwd(), options.config);

		// Check if config file exists
		// Read data if it does
		let file;

		try {
			file = fs.readFileSync(configFilePath, "utf8");
		} catch (error) {
			if (error.code === "ENOENT") {
				console.error(
					`\n${styleText("red", "Error")}: The configuration file "${options.config}" does not exist.\n\n1. Check the command for a misspelled config file name.\n2. See "init --help" for help with generating a configuration file.\n`,
				);
				process.exit(1);
			}
		}

		// Parse contents of config for only stickers
		let stickersExist = false;
		const config = YAML.parse(file) ?? {};
		const stickers = config.stickers;

		// Combine default and new sticker environment variable
		const buildEnv = { ...process.env };

		// Only add stickers to build env if they are set in configuration file
		if (Array.isArray(stickers) && stickers.length > 0) {
			buildEnv.RIVET_STICKERS = JSON.stringify(stickers);
			stickersExist = true;
		}

		const outputDir = path.resolve(
			// Path where command was run
			process.cwd(),

			// Set to defined <dir>, else set to default directory name
			options.output ?? "rivet-assets",
		);

		// Run the "tokens" and "core" pnpm workspace builds with the custom environment variables
		runWorkspaceBuild(buildEnv, options.verbose, { outputDir });

		// Print build results
		printWrapper(() => {
			console.log(`Build completed successfully\n`);

			console.log(
				`${styleText("blue", "Configuration")}:\n ${options.config}\n`,
			);

			console.log(`${styleText("blue", "Directory")}:\n ${outputDir}\n`);

			console.log(`${styleText("blue", "Stickers")}:`);

			if (stickersExist === false) {
				console.log(
					`- Stickers defined in config: No\n- ${styleText("yellow", "rivet-stickers.css")} will include all stickers\n`,
				);
			} else {
				console.log(
					`- Stickers defined in config: Yes\n- ${styleText("yellow", "rivet-stickers.css")} contains only these stickers\n`,
				);
			}
		});
	});

export default buildCommand;
