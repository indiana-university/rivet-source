import {
	formats,
	transformGroups,
	transformTypes,
	transforms,
} from "style-dictionary/enums";

export default {
	source: ["src/tokens/**/*.json"],
	expand: {
		include: ["graphic", "icon"],
		typesMap: {
			graphic: {
				"container-height": "dimension",
				"container-width": "dimension",
				height: "dimension",
				path: "content",
				width: "dimension",
			},
			icon: {
				height: "dimension",
				path: "content",
				width: "dimension",
			},
		},
	},
	hooks: {
		filters: {
			"icon-core": (token) => (token.$type === "icon" ? token.$core : true),
			"icon-extra": (token) => (token.$type === "icon" ? !token.$core : false),
		},
		transforms: {
			icon: {
				type: transformTypes.value,
				filter: (token) => token.$type === "icon",
				transform: (token) => {
					if (token.name.includes("logo")) {
						console.log("T2", token);
					}
					return `"${token.$value}"`;
				},
			},
			string: {
				type: transformTypes.value,
				filter: (token) => token.$type === "string",
				transform: (token) => `"${token.$value}"`,
			},
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
			transforms: ["icon", transforms.contentQuote, transforms.sizePxToRem],
		},
		css: {
			transformGroup: "css",
			prefix: "rvt",
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
			transforms: ["icon", transforms.contentQuote, transforms.sizePxToRem],
		},
		json: {
			transformGroup: "js",
			prefix: "rvt",
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
