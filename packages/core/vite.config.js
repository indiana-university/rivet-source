import { defineConfig } from "vite";
import bannerPlugin from "vite-plugin-banner";
import libAssetsPlugin from "@laynezh/vite-plugin-lib-assets";
import pkg from "./package.json";
import { license } from "../../scripts/utils/license-header.js";

const licenseHeader = `/*!
 * ${pkg.name} - @version ${pkg.version}
 *
${license.body}
 */`;

const buildConfig = {
	plugins: [
		bannerPlugin(licenseHeader),
		// Vite lib mode inlines all CSS url() assets as base64 regardless of
		// assetsInlineLimit. This plugin extracts woff2 fonts as real files in
		// dist/fonts/ and rewrites the CSS references to relative paths.
		libAssetsPlugin({
			include: /\.woff2?(\?.*)?$/,
			name: "[name].[ext]",
			outputPath: "fonts",
		}),
	],
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

export default defineConfig(({ command }) => commandMap[command] ?? {});
