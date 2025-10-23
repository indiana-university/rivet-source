import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	integrations: [mdx()],
	srcDir: "./src/sandbox-astro",
});
