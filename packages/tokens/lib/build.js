// packages/tokens/lib/build.js
import { fileURLToPath } from "node:url";
import StyleDictionary from "style-dictionary";

import { createConfig } from "../config.js";

// Construct absolute tokens package "root" path based on this script
const pkgRoot = fileURLToPath(new URL("..", import.meta.url));

export async function buildTokens({ isVerbose, stickers } = {}) {
	const cwd = process.cwd();
	process.chdir(pkgRoot);
	try {
		const sd = new StyleDictionary(createConfig({ stickers }), {
			verbosity: isVerbose ? "inherit" : "silent",
		});
		await sd.buildAllPlatforms();
	} finally {
		process.chdir(cwd);
	}
}
