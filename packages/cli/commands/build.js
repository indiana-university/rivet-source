import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

import { runWorkspaceBuild } from "../lib/runBuild.js";

const buildCommand = new Command("build")
	.description("build the design system using the Rivet config file")
	.action(() => {
		// Get Rivet config file
		const configFilePath = path.resolve(process.cwd(), "rivet.yaml");
		const file = fs.readFileSync(configFilePath, "utf8");

		// Parse contents of config for only stickers
		const config = YAML.parse(file) ?? {};
		const stickers = config.stickers;

		// Combine default and new sticker environment variable
		const buildEnv = {
			...process.env,
			RIVET_STICKERS: JSON.stringify(stickers ?? []),
		};

		// Run the "tokens" and "core" pnpm workspace builds with the custom environment variables
		runWorkspaceBuild(buildEnv);
	});

export default buildCommand;
