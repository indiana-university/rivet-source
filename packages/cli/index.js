#!/usr/bin/env node

import pkg from "./package.json" with { type: "json" };
import { Command } from "commander";
import searchCommand from "./commands/search.js";

const program = new Command();

program
	.name(`${pkg.name}`)
	.description(`${pkg.description}`)
	.version(`${pkg.version}`);

program.addCommand(searchCommand);

program.parse();
