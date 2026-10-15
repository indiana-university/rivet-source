// packages/core/lib/build.js
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { build } from "vite";

// Construct absolute core package "root" path based on this script
const pkgRoot = fileURLToPath(new URL("..", import.meta.url));

export async function buildCore({ outputDir, isVerbose } = {}) {
	await build({
		root: pkgRoot,
		configFile: resolve(pkgRoot, "vite.config.js"),
		logLevel: isVerbose ? "info" : "warn",
		build: outputDir
			? { outDir: resolve(process.cwd(), outputDir), emptyOutDir: true }
			: {},
	});
}
