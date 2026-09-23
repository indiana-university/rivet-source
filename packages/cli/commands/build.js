import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { styleText } from "util";
import YAML from "yaml";

import { configFileName } from "../lib/config.js";
import { runWorkspaceBuild } from "../lib/runBuild.js";

const buildCommand = new Command("build")
	.description("build the design system using the Rivet config file")
	.option(
		"-c, --config <file>",
		"name of the Rivet config file to use",
		configFileName,
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

		// Run the "tokens" and "core" pnpm workspace builds with the custom environment variables
		runWorkspaceBuild(buildEnv);

		// Report results
		console.log(`\n====================================\n`);

		console.log(`Build completed successfully\n`);

		console.log(`${styleText("blue", "Configuration")}:\n ${options.config}\n`);

		console.log(`${styleText("blue", "Stickers")}:`);

		if (stickersExist === false) {
			console.log(
				`- No stickers found in configuration\n- CSS will include all stickers\n`,
			);
		} else {
			console.log(
				`- Stickers found in configuration\n- Generated CSS using only these stickers\n`,
			);
		}

		console.log(`====================================\n`);
	});

export default buildCommand;
