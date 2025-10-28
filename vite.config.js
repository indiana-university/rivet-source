import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
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
const targetConfig = "baseline widely available";
const targets = browserslistToTargets(browserslist(targetConfig));

const buildConfig = {
	plugins: [bannerPlugin(license)],
	build: {
		cssMinify: "lightningcss",
		emptyOutDir: false,
		lib: {
			cssFileName: fileName,
			entry: "src/rivet.js",
			fileName: () => `${fileName}.js`,
			formats: ["es"],
		},
		sourcemap: true,
	},
	css: {
		transformer: "lightningcss",
		lightningcss: {
			drafts: {
				customMedia: true,
			},
			targets,
		},
	},
};

const commandMap = {
	build: buildConfig,
};

export default defineConfig(({ command }) => commandMap[command]);
