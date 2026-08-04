import yaml from "@rollup/plugin-yaml";
import { defineConfig } from "astro/config";
import pkg from "../../package.json";

export default defineConfig({
	base: pkg.name,
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [yaml()],
	},
});
