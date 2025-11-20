import {
	formats,
	transformGroups,
	transformTypes,
	transforms,
} from "style-dictionary/enums";

export default {
	source: ["src/tokens/**/*.json"],
	hooks: {
		filters: {
			"icon-core": (token) => (token.$type === "icon" ? token.$core : true),
			"icon-extra": (token) => (token.$type === "icon" ? !token.$core : false),
		},
		transforms: {
			icon: {
				type: transformTypes.value,
				filter: (token) => token.$type === "icon",
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
					destination: "src/base/tokens-icons.scss",
					filter: "icon-extra",
					format: formats.scssMapDeep,
				},
			],
			transforms: ["icon"],
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
					destination: "src/base/tokens-icons.css",
					filter: "icon-extra",
					format: formats.cssVariables,
				},
			],
			transforms: ["icon"],
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
