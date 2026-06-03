import { defineConfig } from "vite";
import bannerPlugin from "vite-plugin-banner";
import pkg from "./package.json";
import { blockCommentBody } from "./scripts/utils/license-header.js";

const [fileName] = pkg.name.split("-");
const license = `/*!
 * ${pkg.name} - @version ${pkg.version}
 *
${blockCommentBody}
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
