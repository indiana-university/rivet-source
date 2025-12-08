import { formats, transformGroups, transforms } from "style-dictionary/enums";

const prefix = "rvt";

function isIcon(token) {
	return token.path[0] === "icon";
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
			"icon-core": (token) => (isIcon(token) ? token.$core : true),
			"icon-extra": (token) => (isIcon(token) ? !token.$core : false),
		},
	},
	platforms: {
		scss: {
			transformGroup: transformGroups.scss,
			files: [
				{
					destination: "src/base/tokens.scss",
					filter: "icon-core",
					format: formats.scssMapDeep,
				},
				{
					destination: "src/base/tokens-icon-extra.scss",
					filter: "icon-extra",
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
					destination: "src/base/tokens.css",
					filter: "icon-core",
					format: formats.cssVariables,
				},
				{
					destination: "src/base/tokens-icon-extra.css",
					filter: "icon-extra",
					format: formats.cssVariables,
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
