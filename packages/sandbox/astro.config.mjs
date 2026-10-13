import yaml from "@rollup/plugin-yaml";
import { defineConfig } from "astro/config";

export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [yaml()],
	},
});
