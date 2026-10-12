#!/usr/bin/env node

import pkg from "./package.json" with { type: "json" };
import { Command } from "commander";
import searchCommand from "./commands/search.js";
import initCommand from "./commands/init.js";
import buildCommand from "./commands/build.js";

const program = new Command();

program
	.name(`${pkg.name}`)
	.description(`${pkg.description}`)
	.version(`${pkg.version}`);

program.addCommand(searchCommand);
program.addCommand(initCommand);
program.addCommand(buildCommand);

program.parse();
