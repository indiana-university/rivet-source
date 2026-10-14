import { defineConfig, defineMetadata } from "html-validate";
import { globSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const metadataFiles = globSync("./src/**/*.metadata.js");
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
	elements: [
		"html5",
		...getOrCreateArray(config, "elements").map(defineMetadata),
	],
	rules: {
		// https://html-validate.org/rules/deprecated-class.html
		"deprecated-class": [
			"error",
			{
				classes: getOrCreateArray(config, "deprecatedClasses").flat(),
			},
		],
	},
});
