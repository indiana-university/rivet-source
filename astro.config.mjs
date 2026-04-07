import { defineConfig } from "astro/config";

export default defineConfig({
	base: "/rivet-source",
	devToolbar: {
		enabled: false,
	},
	outDir: "./dist-astro",
	srcDir: "./src/sandbox",
});
