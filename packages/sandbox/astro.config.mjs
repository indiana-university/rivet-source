import { defineConfig } from "astro/config";
import pkg from "../../package.json";

export default defineConfig({
	base: pkg.name,
	devToolbar: {
		enabled: false,
	},
});
