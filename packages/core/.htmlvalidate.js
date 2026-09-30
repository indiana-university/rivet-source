import { defineConfig } from "html-validate";
import { globSync } from "node:fs";

const metadataFiles = globSync("./src/**/*.metadata.js");

export default defineConfig({
	extends: ["html-validate:recommended"],
	elements: ["html5", ...metadataFiles],
});
