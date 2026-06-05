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
		lib: {
			entry: {
				rivet: "src/rivet.js",
				"rivet.css": "src/rivet.scss",
				"rivet-icons.css": "src/rivet-icons.css",
				"rivet-stickers.css": "src/rivet-stickers.css",
			},
			formats: ["es"],
		},
		sourcemap: true,
		rollupOptions: {
			output: {
				assetFileNames: ({ name }) =>
					name.endsWith(".css.css") ? name.replace(".css", "") : name,
			},
		},
	},
};

const commandMap = {
	build: buildConfig,
};

export default defineConfig(({ command }) => commandMap[command]);
