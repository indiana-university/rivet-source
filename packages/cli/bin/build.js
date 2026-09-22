#!/usr/bin/env node

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

// Get arguments from process
const args = process.argv.slice(2);

// Get directory where original command was invoked
// This command will always be run from the directory with the Rivet config file
const invocationPath = process.env.INIT_CWD ?? process.cwd();

// Get Rivet config file
const configFilePath = path.resolve(invocationPath, "rivet.yaml");
const file = fs.readFileSync(configFilePath, "utf8");

// Parse contents of config
const config = YAML.parse(file) ?? {};
const stickers = config.stickers;

// Construct environment variables for tokens/core builds
const buildEnv = {
	...process.env,
	RIVET_STICKERS: JSON.stringify(stickers ?? []),
};

// Run the tokens and core builds with the custom environment variables
// stdio ensures the expected output prints to the terminal
execSync("pnpm --filter @rivet-iu/tokens build", {
	stdio: "inherit",
	env: buildEnv,
});
execSync("pnpm --filter @rivet-iu/core build", {
	stdio: "inherit",
	env: buildEnv,
});
