import { formats, transformGroups, transforms } from "style-dictionary/enums";

const PREFIX = "rvt";

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
