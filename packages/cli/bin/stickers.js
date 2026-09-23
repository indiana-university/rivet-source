#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

import { runWorkspaceBuild } from "../lib/runBuild.js";

// Get arguments from process
const args = process.argv.slice(2);

// Get directory where original command was invoked
// This command will always be run from the directory with the Rivet config file
const invocationPath = process.env.INIT_CWD ?? process.cwd();

// Get Rivet config file
const configFilePath = path.resolve(invocationPath, "rivet.yaml");
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
