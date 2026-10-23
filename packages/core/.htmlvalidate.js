import { defineConfig, defineMetadata } from "html-validate";
import { globSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import DescendantCountRule from "./rules/descendant-count.js";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const metadataFiles = globSync(path.join(configDir, "src/**/*.metadata.js"));
const config = new Map();
const noop = () => {};

export function getOrCreate(map, key, createCallback = noop) {
	if (!map.has(key)) {
		map.set(key, createCallback());
	}
	return map.get(key);
}

export function getOrCreateArray(map, key) {
	return getOrCreate(map, key, () => []);
}

for (const file of metadataFiles) {
	const filePath = path.resolve(file);
	const mod = await import(pathToFileURL(filePath).href);

	Object.entries(mod).forEach(([key, value]) => {
		const arr = getOrCreateArray(config, key);
		config.set(key, [...arr, value]);
	});
}

export default defineConfig({
	extends: ["html-validate:recommended"],
	plugins: [
		{
			rules: {
				"rvt/descendant-count": DescendantCountRule,
			},
		},
	],
	elements: [
		"html5",
		...getOrCreateArray(config, "elements").map(defineMetadata),
	],
	rules: {
		// https://html-validate.org/rules/attribute-boolean-style.html
		// Disable rule to permit any valid boolean style.
		"attribute-boolean-style": "off",
		// https://html-validate.org/rules/deprecated-class.html
		"deprecated-class": [
			"error",
			{
				classes: getOrCreateArray(config, "deprecatedClasses").flat(),
			},
		],
		"rvt/descendant-count": [
			"error",
			getOrCreateArray(config, "descendantCount").flat(),
		],
	},
});
