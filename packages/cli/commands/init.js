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
	.option("-f, --force", "overwrite an existing rivet.yaml file")
	.action((options) => {
		const configFilePath = path.resolve(configFileName);

		if (fs.existsSync(configFilePath) && !options.force) {
			console.error(
				`\n${styleText("red", "Error")}: ${configFileName} already exists.\n\nUse the --force option to overwrite it.\n`,
			);
			process.exit(1);
		}

		fs.writeFileSync(configFilePath, configTemplate);

		console.log(
			`\n${styleText("green", "Success")}: Created ${configFileName}.\n`,
		);
	});

export default initCommand;
