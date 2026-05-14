import { defineConfig } from "vite";
import bannerPlugin from "vite-plugin-banner";
import { createHash } from "node:crypto";
import pkg from "./package.json";

const [fileName] = pkg.name.split("-");
const license = `/*!
 * ${pkg.name} - @version ${pkg.version}
 *
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */`;

const buildConfig = {
	plugins: [
		bannerPlugin(license),
		// Vite lib mode inlines all CSS url() assets as base64 regardless of
		// assetsInlineLimit. This plugin de-inlines woff2 fonts after the fact:
		// it extracts each base64 data URI, emits the font as a real file in
		// dist/fonts/, and rewrites the CSS reference to a relative path.
		{
			name: "rivet-font-deinline",
			generateBundle(_, bundle) {
				const pluginContext = this;
				for (const [outFileName, chunk] of Object.entries(bundle)) {
					if (!outFileName.endsWith(".css") || chunk.type !== "asset") continue;

					const emittedFonts = new Map(); // contentHash → fontFileName
					const originalCss =
						typeof chunk.source === "string"
							? chunk.source
							: chunk.source.toString();

					const newCss = originalCss.replace(
						/url\(data:font\/woff2;base64,([A-Za-z0-9+/=]+)\)/g,
						(match, base64Data, offset) => {
							// Derive a readable name from the nearest @font-face block
							const preceding = originalCss.slice(0, offset);
							const blockStart = preceding.lastIndexOf("@font-face");
							const context =
								blockStart >= 0
									? originalCss.slice(blockStart, offset + match.length)
									: "";
							const familyMatch = context.match(
								/font-family:\s*["']?([^"';,}]+?)["']?\s*;/,
							);
							const fontFamily = familyMatch
								? familyMatch[1]
										.trim()
										.toLowerCase()
										.replace(/[^a-z0-9]+/g, "-")
								: "font";

							const hash = createHash("sha1")
								.update(base64Data)
								.digest("hex")
								.slice(0, 8);

							if (!emittedFonts.has(hash)) {
								const fontFileName = `${fontFamily}-${hash}.woff2`;
								emittedFonts.set(hash, fontFileName);
								pluginContext.emitFile({
									type: "asset",
									fileName: `fonts/${fontFileName}`,
									source: Buffer.from(base64Data, "base64"),
								});
							}

							return `url("./fonts/${emittedFonts.get(hash)}")`;
						},
					);

					chunk.source = newCss;
				}
			},
		},
	],
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
