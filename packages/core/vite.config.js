import { defineConfig } from "vite";
import bannerPlugin from "vite-plugin-banner";
import pkg from "./package.json";
import { license } from "./scripts/utils/license-header.js";

const licenseHeader = `/*!
 * ${pkg.name} - @version ${pkg.version}
 *
${license.body}
 */`;

const buildConfig = {
	plugins: [bannerPlugin(licenseHeader)],
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
