import { defineConfig } from "astro/config";

export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	outDir: "./dist-astro",
	srcDir: "./src/sandbox",
});
