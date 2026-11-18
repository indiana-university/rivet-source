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
		// Get Rivet config file relative to where the command was run
		const configFilePath = path.resolve(process.cwd(), options.config);

		/**
		 * Resolves the output directory
		 *
		 * Precedence: CLI flag > config `outputDir` > default
		 *
		 * All paths resolve from the current working directory, not the config file's location.
		 * Warns (even when the CLI flag is used) if `outputDir` is set but isn't a non-empty string.
		 *
		 * @param {unknown} [configOutputDir] - `outputDir` value from the parsed config, if any.
		 * @returns {string} Absolute path to the output directory.
		 */

		function resolveOutputDir(configOutputDir) {
			// Assume the config value is invalid until proven otherwise
			let isValidConfigDir = false;

			// The config value is only usable if it's a non-empty string
			if (typeof configOutputDir === "string") {
				// Strings that are empty or only spaces are not usable
				if (configOutputDir.trim() !== "") {
					isValidConfigDir = true;
				}
			}

			// Warn if outputDir is set to something other than a path string
			if (!isValidConfigDir && configOutputDir != null) {
				console.log(
					`\n${styleText("yellow", "Warning")}: "outputDir" in "${options.config}" must be a path string. Using the default output directory.`,
				);
			}

			// Start with the default, then override in order of precedence
			let dir = "@rivet-iu/core/dist";

			if (options.output) {
				// CLI output option/flag override
				dir = options.output;
			} else if (isValidConfigDir) {
				// Config outputDir override
				dir = configOutputDir;
			}

			// All paths are relative to where the command was run
			return path.resolve(process.cwd(), dir);
		}

		// Whether the config file lists any stickers
		let stickersExist = false;

		// Sticker list from the config file; null builds all stickers.
		// Declared before reading the config so the missing-config branch can use it.
		let stickers = null;

		/************************************************
		 * Read Rivet configuration file
		 ************************************************/

		// Initialize var for config file
		let file;

		// Attempt to find and read the config file
		try {
			file = fs.readFileSync(configFilePath, "utf8");

			console.log(
				`\n${styleText("blue", "Configuration found")}: ${options.config}`,
			);
		} catch (error) {
			if (error.code === "ENOENT") {
				// No config to read from, so use the CLI flag or default
				const outputDir = resolveOutputDir();

				// No Rivet configuration was found; report as a warning
				console.log(
					`\n${styleText("yellow", "Warning")}: The configuration file "${options.config}" does not exist.\n\nContinuing build with full Rivet assets.`,
				);

				// Run a full build with all Rivet assets
				await runWorkspaceBuild(options.verbose, { outputDir, stickers });

				// Report build results to terminal
				printBuildResults("None", outputDir, stickersExist);

				// Full build complete; skip config parsing below
				return;
			}
		}

		// Parse contents of config for stickers
		const config = YAML.parse(file) ?? {};

		// Use the config's outputDir unless the CLI flag overrides it
		const outputDir = resolveOutputDir(config.outputDir);

		// Only add stickers if they exist, are uncommented, and have values in the config file
		if (Array.isArray(config.stickers) && config.stickers.length > 0) {
			stickers = config.stickers;
			stickersExist = true;
		} else {
			// Config is empty or has no usable sticker list; report as a warning
			console.log(
				`\n${styleText("yellow", "Warning")}: No stickers are listed in "${options.config}".\n\nContinuing build with full Rivet assets.`,
			);
		}

		// Run the "tokens" and "core" builds
		await runWorkspaceBuild(options.verbose, { outputDir, stickers });

		// Report build results to terminal
		printBuildResults(config, outputDir, stickersExist);
	});

export default buildCommand;
