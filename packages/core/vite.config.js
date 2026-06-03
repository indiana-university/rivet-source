import { defineConfig } from "vite";
import bannerPlugin from "vite-plugin-banner";
import pkg from "./package.json";

const [fileName] = pkg.name.split("-");
const license = `/*!
 * ${pkg.name} - @version ${pkg.version}
 *
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */`;

const buildConfig = {
	plugins: [bannerPlugin(license)],
	build: {
		cssCodeSplit: true,
		emptyOutDir: false,
		lib: {
			cssFileName: fileName,
			entry: {
				rivet: "src/rivet.js",
				"rivet-icons": "src/rivet-icons.js",
				"rivet-stickers": "src/rivet-stickers.js",
			},
			formats: ["es"],
		},
		sourcemap: true,
	},
};

const commandMap = {
	build: buildConfig,
};

export default defineConfig(({ command }) => commandMap[command]);
