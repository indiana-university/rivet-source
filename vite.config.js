import { defineConfig } from "vite";
import bannerPlugin from "vite-plugin-banner";
import pkg from "./package.json";
import { license } from "./scripts/utils/license-header.js";

const [fileName] = pkg.name.split("-");
const licenseHeader = `/*!
 * ${pkg.name} - @version ${pkg.version}
 *
${license.body}
 */`;

const buildConfig = {
	plugins: [bannerPlugin(licenseHeader)],
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
