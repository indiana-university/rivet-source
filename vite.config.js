import { defineConfig } from "vite";
import bannerPlugin from "vite-plugin-banner";
import { eleventyPlugin } from "vite-plugin-eleventy";
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
		emptyOutDir: false,
		lib: {
			cssFileName: fileName,
			entry: "src/js/index.js",
			fileName: () => `${fileName}.js`,
			formats: ["es"],
		},
		sourcemap: true,
	},
};

const serveConfig = {
	root: "src/sandbox",
	plugins: [eleventyPlugin()],
	server: {
		open: true,
	},
};

const commandMap = {
	build: buildConfig,
	serve: serveConfig,
};

export default defineConfig(({ command }) => commandMap[command]);
