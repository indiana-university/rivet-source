import { formats, transformGroups, transforms } from "style-dictionary/enums";

const prefix = "rvt";

function isIcon(token) {
	return token.path[0] === "icon";
}

function formatIconComponent(name) {
	return `${prefix}-icon[name="${name}"] {
	--name: var(--${prefix}-icon-${name});
}
`;
}

export default {
	source: ["src/tokens/**/*.json"],
	expand: {
		include: ["graphic"],
		typesMap: {
			graphic: {
				"container-height": "dimension",
				"container-width": "dimension",
				height: "dimension",
				path: "content",
				width: "dimension",
			},
		},
	},
	hooks: {
		filters: {
			core: (token) => (isIcon(token) ? token.$core : true),
			"core-icon": (token) => isIcon(token) && token.$core,
			"extra-icon": (token) => isIcon(token) && !token.$core,
		},
		formats: {
			"css/icons": ({ dictionary }) =>
				dictionary.allTokens
					.map((token) => token.path[1])
					.map(formatIconComponent)
					.join("\n"),
		},
	},
	platforms: {
		scss: {
			transformGroup: transformGroups.scss,
			files: [
				{
					destination: "src/base/tokens.tmp.scss",
					format: formats.scssMapDeep,
				},
			],
			transforms: [transforms.contentQuote, transforms.sizePxToRem],
		},
		css: {
			transformGroup: transformGroups.css,
			prefix,
			files: [
				{
					destination: "src/base/tokens.tmp.css",
					filter: "core",
					format: formats.cssVariables,
				},
				{
					destination: "src/components/icon/icon-core.tmp.css",
					filter: "core-icon",
					format: "css/icons",
				},
				{
					destination: "src/base/tokens-icon-extra.tmp.css",
					filter: "extra-icon",
					format: formats.cssVariables,
				},
				{
					destination: "src/components/icon/icon-extra.tmp.css",
					filter: "extra-icon",
					format: "css/icons",
				},
			],
			transforms: [transforms.contentQuote, transforms.sizePxToRem],
		},
		json: {
			transformGroup: transformGroups.json,
			prefix,
			files: [
				{
					destination: "dist/tokens.json",
					format: formats.jsonFlat,
				},
			],
			transforms: [transforms.nameKebab],
		},
	},
};
