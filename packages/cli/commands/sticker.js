import { Command } from "commander";
import { fileURLToPath } from "url";
import fs from "fs";
import { optimize } from "svgo";
import path from "path";
import postcss from "postcss";
import atImport from "postcss-import";
import { styleText } from "util";
import YAML from "yaml";

import { configFileName } from "../lib/config.js";

const stickerCommand = new Command("sticker")
	.description(`create a CSS file with specific stickers`)
	.action((options) => {
		// Allow pathing relative to this file
		const __dirname = path.dirname(fileURLToPath(import.meta.url));

		// Get configuration file
		const configFilePath = path.resolve(configFileName);
		const file = fs.readFileSync(configFilePath, "utf8");

		// Parse contents of config
		const config = YAML.parse(file) ?? {};
		const stickers = config.stickers;

		// Check for list of stickers in configuration
		if (!stickers) {
			console.error(
				`\n${styleText("red", "Error")}: No stickers defined in the ${configFileName} configuration.\n`,
			);
			process.exit(1);
		}

		/*********************************
		 * Create tmp folder and CSS files
		 *********************************/

		// Create CLI "tmp" folder to store temp CSS vars
		const tmpFolderPath = path.resolve(__dirname, "../tmp");

		let tmpCssVarsFile = "";
		let tmpCssStickerFile = "";
		let tmpCssImportFile = "";

		try {
			fs.mkdirSync(tmpFolderPath, { recursive: true });

			tmpCssVarsFile = path.join(tmpFolderPath, "tmp-sticker-vars.css");

			tmpCssStickerFile = path.join(tmpFolderPath, "tmp-stickers.css");

			tmpCssImportFile = path.join(tmpFolderPath, "tmp-sticker-import.css");

			// Create temp CSS vars file
			fs.writeFileSync(tmpCssVarsFile, "", "utf8");

			// Create temp CSS sticker file
			fs.writeFileSync(tmpCssStickerFile, "", "utf8");

			// Create temp CSS import file
			fs.writeFileSync(tmpCssImportFile, "", "utf8");
		} catch (err) {
			console.error("Error creating directory:", err);
		}

		/*********************************
		 * Handle sticker tokens
		 *********************************/

		// Resolve sticker tokens path relative to this file
		const stickerTokensPath = path.resolve(
			__dirname,
			"../../tokens/tokens/sticker.json",
		);

		// Read, parse, and store the tokens JSON
		const stickerTokens = JSON.parse(
			fs.readFileSync(stickerTokensPath, "utf8"),
		);

		// Get only the stickers defined in YAML config
		const selectedStickers = stickers.map((name) => {
			const sticker = stickerTokens.sticker[name];

			if (!sticker) {
				console.error(
					`\n${styleText("red", "Error")}: No sticker named ${name} found.\n`,
				);
				process.exit(1);
			}

			return [name, sticker];
		});

		// Optimize sticker SVG data with SVGO
		function optimizePath(d) {
			const wrapped = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`;
			const result = optimize(wrapped, { multipass: true });
			const match = result.data.match(/\sd="([^"]+)"/);
			return match ? match[1] : d;
		}

		fs.appendFileSync(tmpCssVarsFile, ":root {", function (err) {
			if (err) throw err;
		});

		selectedStickers.forEach(([name, sticker]) => {
			const { "path-fill": pathFill, "path-stroke": pathStroke } =
				sticker.$value;

			const optimizedFill = optimizePath(pathFill);
			const optimizedStroke = optimizePath(pathStroke);

			/*
			 * Handle vars file
			 */

			const fillCss = `\n  --rvt-sticker-${name}-path-fill: '${optimizedFill}';`;
			const strokeCss = `\n  --rvt-sticker-${name}-path-stroke: '${optimizedStroke}';`;

			// Push the CSS variables into the vars file
			fs.appendFileSync(tmpCssVarsFile, fillCss, function (err) {
				if (err) throw err;
			});

			fs.appendFileSync(tmpCssVarsFile, strokeCss, function (err) {
				if (err) throw err;
			});

			/*
			 * Handle CSS file
			 */

			const property = `rvt-sticker[name="${name}"] {
  --path-fill: var(--rvt-sticker-${name}-path-fill);
  --path-stroke: var(--rvt-sticker-${name}-path-stroke);
}\n`;

			fs.appendFileSync(tmpCssStickerFile, property, function (err) {
				if (err) throw err;
			});
		});

		fs.appendFileSync(tmpCssVarsFile, "\n}", function (err) {
			if (err) throw err;
		});

		// Build the CSS file in the tmp folder
		const coreLayersPath = path.resolve(__dirname, "../../core/src/layers.css");
		const coreStickerPath = path.resolve(
			__dirname,
			"../../core/src/components/sticker/sticker.css",
		);

		const contents = `@import "${coreLayersPath}";
@import "${tmpCssVarsFile}" layer(rivet.base);
@import "${coreStickerPath}" layer(rivet.components);
@import "${tmpCssStickerFile}" layer(rivet.components);`;

		fs.appendFileSync(tmpCssImportFile, contents, function (err) {
			if (err) throw err;
		});

		// Run the generated CSS file through PostCSS to resolve all of the CSS variables
		const css = fs.readFileSync(tmpCssImportFile, "utf8");

		postcss()
			.use(atImport())
			.process(css, {
				// `from` option is needed here
				from: `${tmpCssImportFile}`,
			})
			.then((result) => {
				fs.writeFileSync(
					path.join(process.cwd(), "custom-rivet-stickers.css"),
					result.css,
					"utf8",
				);
			});

		// Output final file to current working directory of user
	});

export default stickerCommand;
