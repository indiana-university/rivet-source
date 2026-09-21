import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import pngToIco from "png-to-ico";
import sharp from "sharp";
import { formats, transformGroups, transforms } from "style-dictionary/enums";

const PREFIX = "rvt";

// Generated graphics are build intermediates, not published output. Consumers
// copy the ones they need out of here; see packages/core/scripts.
const GRAPHIC_PATH = "tmp";

// Rendered raster scales. 1x is the container size the token declares; 3x
// covers hi-dpi displays (apple-touch-icon at 60 becomes 180).
const GRAPHIC_SCALES = [1, 3];

// The 1x PNGs bundled into favicon.ico.
const ICO_SIZES = [16, 32, 48];

// Rasterizing an SVG is DPI-based, so scale the density rather than upscaling
// a 1x bitmap, which would blur the result.
const BASE_DENSITY = 72;

function isIcon(token) {
	return token.attributes.category === "icon";
}

function isSticker(token) {
	return token.attributes.category === "sticker";
}

function formatIconComponent(name) {
	return `${PREFIX}-icon[name="${name}"] {
	--name: var(--${PREFIX}-icon-${name});
}
`;
}

function formatStickerComponent(name) {
	return `${PREFIX}-sticker[name="${name}"] {
	--path-fill: var(--${PREFIX}-sticker-${name}-path-fill);
	--path-stroke: var(--${PREFIX}-sticker-${name}-path-stroke);
}
`;
}

function findTokenValue(dictionary, path) {
	const token = dictionary.allTokens.find(
		(candidate) => candidate.path.join(".") === path,
	);

	if (!token) {
		throw new Error(`Expected token "${path}" to exist.`);
	}

	return token.$value;
}

// `expand` splits each graphic into one token per key, so collect them back
// into { "favicon-16": { "container-width": 16, path: "M4 0...", ... } }.
function groupGraphics(dictionary) {
	const graphics = {};

	for (const token of dictionary.allTokens) {
		const [category, name, item] = token.path;

		if (category !== "graphic") continue;

		graphics[name] ??= {};
		graphics[name][item] = token.$value;
	}

	return graphics;
}

// A graphic can only be centered on a canvas if it declares one. Graphics
// without container dimensions (quote-open) exist for CSS clip-path only and
// are not renderable as standalone images.
function isRenderable(graphic) {
	return (
		graphic["container-height"] !== undefined &&
		graphic["container-width"] !== undefined
	);
}

function renderableGraphics(dictionary) {
	return Object.entries(groupGraphics(dictionary)).filter(([, graphic]) =>
		isRenderable(graphic),
	);
}

// Graphics that reuse the logo-iu path inline their own width/height, because
// Style Dictionary cannot resolve a reference inside a `dimension` value. That
// duplication can drift, so fail the build the moment it does.
function assertLogoDimensions(dictionary) {
	const graphics = groupGraphics(dictionary);
	const logo = graphics["logo-iu"];

	for (const [name, graphic] of Object.entries(graphics)) {
		if (name === "logo-iu" || graphic.path !== logo.path) continue;
		if (graphic.width === logo.width && graphic.height === logo.height) {
			continue;
		}

		throw new Error(
			`graphic.${name} reuses the graphic.logo-iu path, but its dimensions ` +
				`(${graphic.width}x${graphic.height}) no longer match logo-iu ` +
				`(${logo.width}x${logo.height}). Update tokens/graphic.json so the ` +
				`generated image stays centered.`,
		);
	}
}

function formatGraphicSvg(graphic, { background, fill }) {
	const height = graphic["container-height"];
	const width = graphic["container-width"];
	// Center the path on its canvas, matching the hand-authored reference art.
	const x = (width - graphic.width) / 2;
	const y = (height - graphic.height) / 2;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${background}"/><path d="${graphic.path}" fill="${fill}" transform="translate(${x} ${y})"/></svg>\n`;
}

function rasterizeGraphic({ graphic, svg }, scale) {
	return sharp(Buffer.from(svg), { density: BASE_DENSITY * scale })
		.resize(
			graphic["container-width"] * scale,
			graphic["container-height"] * scale,
		)
		.png();
}

// Style Dictionary runs a platform's actions concurrently, so no action may
// read another's output. Each one derives every SVG it needs from the
// dictionary instead, which is pure string templating and effectively free.
function buildGraphicSources(dictionary) {
	assertLogoDimensions(dictionary);

	const background = findTokenValue(dictionary, "color.crimson.base");
	const fill = findTokenValue(dictionary, "color.white.base");

	return renderableGraphics(dictionary).map(([name, graphic]) => ({
		graphic,
		name,
		svg: formatGraphicSvg(graphic, { background, fill }),
	}));
}

function logGenerated(file) {
	console.log(`✔︎ ${file}`);
}

async function removeGenerated(files) {
	await Promise.all(files.map((file) => rm(file, { force: true })));
}

export default {
	source: ["tokens/**/*.json"],
	expand: {
		include: ["graphic", "sticker"],
		typesMap: {
			graphic: {
				"container-height": "dimension",
				"container-width": "dimension",
				height: "dimension",
				path: "content",
				width: "dimension",
			},
			sticker: {
				"path-fill": "content",
				"path-stroke": "content",
			},
		},
	},
	hooks: {
		actions: {
			"graphic/svg": {
				do: async (dictionary) => {
					await mkdir(GRAPHIC_PATH, { recursive: true });

					for (const source of buildGraphicSources(dictionary)) {
						const file = join(GRAPHIC_PATH, `${source.name}.svg`);

						await writeFile(file, source.svg);
						logGenerated(file);
					}
				},
				undo: async (dictionary) =>
					removeGenerated(
						renderableGraphics(dictionary).map(([name]) =>
							join(GRAPHIC_PATH, `${name}.svg`),
						),
					),
			},
			"graphic/png": {
				do: async (dictionary) => {
					await mkdir(GRAPHIC_PATH, { recursive: true });

					for (const source of buildGraphicSources(dictionary)) {
						for (const scale of GRAPHIC_SCALES) {
							const suffix = scale === 1 ? "" : `-${scale}x`;
							const file = join(GRAPHIC_PATH, `${source.name}${suffix}.png`);

							await rasterizeGraphic(source, scale).toFile(file);
							logGenerated(file);
						}
					}
				},
				undo: async (dictionary) =>
					removeGenerated(
						renderableGraphics(dictionary).flatMap(([name]) =>
							GRAPHIC_SCALES.map((scale) =>
								join(
									GRAPHIC_PATH,
									`${name}${scale === 1 ? "" : `-${scale}x`}.png`,
								),
							),
						),
					),
			},
			"graphic/ico": {
				do: async (dictionary) => {
					const sources = buildGraphicSources(dictionary);
					const file = join(GRAPHIC_PATH, "favicon.ico");

					const pngs = await Promise.all(
						ICO_SIZES.map((size) => {
							const source = sources.find(
								(candidate) => candidate.name === `favicon-${size}`,
							);

							if (!source) {
								throw new Error(
									`Expected graphic.favicon-${size} to exist for favicon.ico.`,
								);
							}

							return rasterizeGraphic(source, 1).toBuffer();
						}),
					);

					await mkdir(GRAPHIC_PATH, { recursive: true });
					await writeFile(file, await pngToIco(pngs));
					logGenerated(file);
				},
				undo: async () => removeGenerated([join(GRAPHIC_PATH, "favicon.ico")]),
			},
		},
		filters: {
			core: (token) => {
				if (isIcon(token)) {
					return token.$core;
				}
				if (isSticker(token)) {
					return false;
				}
				return true;
			},
			"core-icon": (token) => isIcon(token) && token.$core,
			"extra-icon": (token) => isIcon(token) && !token.$core,
			sticker: (token) => isSticker(token),
		},
		formats: {
			"css/icons": ({ dictionary }) =>
				dictionary.allTokens
					.map((token) => token.attributes.type)
					.map(formatIconComponent)
					.join("\n"),
			"css/stickers": ({ dictionary }) =>
				dictionary.allTokens
					.filter((token) => token.attributes.item === "path-stroke")
					.map((token) => token.attributes.type)
					.map(formatStickerComponent)
					.join("\n"),
		},
	},
	platforms: {
		scss: {
			transformGroup: transformGroups.scss,
			files: [
				{
					destination: "tmp/core-vars.scss",
					format: formats.scssMapDeep,
				},
			],
			transforms: [transforms.contentQuote, transforms.sizePxToRem],
		},
		css: {
			transformGroup: transformGroups.css,
			prefix: PREFIX,
			files: [
				{
					destination: "tmp/core-vars.css",
					filter: "core",
					format: formats.cssVariables,
				},
				{
					destination: "tmp/core-icon.css",
					filter: "core-icon",
					format: "css/icons",
				},
				{
					destination: "tmp/icon-vars.css",
					filter: "extra-icon",
					format: formats.cssVariables,
				},
				{
					destination: "tmp/icon.css",
					filter: "extra-icon",
					format: "css/icons",
				},
				{
					destination: "tmp/sticker-vars.css",
					filter: "sticker",
					format: formats.cssVariables,
				},
				{
					destination: "tmp/sticker.css",
					filter: "sticker",
					format: "css/stickers",
				},
			],
			transforms: [transforms.contentQuote, transforms.sizePxToRem],
		},
		// Raw values only: the css/scss transforms quote `path` and convert
		// dimensions to rem, both of which corrupt SVG geometry.
		graphic: {
			actions: ["graphic/svg", "graphic/png", "graphic/ico"],
			files: [],
			transforms: [],
		},
		json: {
			transformGroup: transformGroups.json,
			prefix: PREFIX,
			files: [
				{
					destination: "dist/tokens.json",
					format: formats.jsonNested,
				},
			],
			transforms: [transforms.nameKebab],
		},
	},
};
