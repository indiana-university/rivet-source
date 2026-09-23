import { Command } from "commander";
import fs from "fs";
import path from "path";
import { styleText } from "util";

import { configFileName } from "../lib/config.js";

const configTemplate = `# Rivet CLI configuration
# https://rivet.iu.edu

# Include any stickers you'd like to use in your project here.
# You can find a list of available stickers at:
# https://rivet.iu.edu/icons-stickers/sticker-library/

# stickers:
#   - accessibility
#   - airplane
`;

const initCommand = new Command("init")
	.description(`generate a starter ${configFileName} file`)
	.option("-f, --force", `overwrite an existing ${configFileName} file`)
	.option(
		"-c, --config <file>",
		"name of the Rivet config file to generate",
		configFileName,
	)
	.action((options) => {
		// Set up config file path based on current working directory
		const configFilePath = path.resolve(options.config);

		// Check if the file exists and that --force wasn't invoked, otherwise exit
		if (fs.existsSync(configFilePath) && !options.force) {
			console.error(
				`\n${styleText("red", "Error")}: ${configFileName} already exists.\n\nUse the --force option to overwrite it.\n`,
			);
			process.exit(1);
		}

		// Write the config template contents to the file
		fs.writeFileSync(configFilePath, configTemplate);

		console.log(
			`\n${styleText("green", "Success")}: Created ${options.config}.\n`,
		);
	});

export default initCommand;
