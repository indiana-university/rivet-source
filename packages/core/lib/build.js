// packages/core/lib/build.js
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { build } from "vite";

// Construct absolute core package "root" path based on this script
const pkgRoot = fileURLToPath(new URL("..", import.meta.url));

// Run the core test suite via the Vitest Node API (equivalent to `vitest run`).
// Throws if any test fails or an unhandled error occurs.
async function test({ isVerbose } = {}) {
	// Dynamic import: `vitest` is a devDependency, so only require it when tests actually run
	let createVitest;
	try {
		({ createVitest } = await import("vitest/node"));
	} catch (error) {
		// Skip tests (with a warning) only when Vitest itself can't be found;
		// rethrow anything else, e.g. a broken Vitest install
		const isVitestMissing =
			error?.code === "ERR_MODULE_NOT_FOUND" &&
			/['"]vitest(\/node)?['"]/.test(error.message);

		if (!isVitestMissing) throw error;

		console.warn(
			"[Rivet] Vitest is not installed; skipping core tests. Install `vitest` to run tests before building.",
		);
		return;
	}

	const vitest = await createVitest({
		root: pkgRoot,
		config: resolve(pkgRoot, "vite.config.js"),
		run: true,
		watch: false,
		// Full per-test output when verbose; compact summary otherwise
		reporters: [isVerbose ? "verbose" : "dot"],
	});

	try {
		const { testModules, unhandledErrors } = await vitest.start();
		const failed = testModules.filter((testModule) => !testModule.ok());

		if (failed.length || unhandledErrors.length) {
			throw new Error(
				`Core tests failed (${failed.length} failing file(s), ${unhandledErrors.length} unhandled error(s))`,
			);
		}
	} finally {
		await vitest.close();
	}
}

export async function buildCore({ outputDir, isVerbose } = {}) {
	await test({ isVerbose });

	await build({
		root: pkgRoot,
		configFile: resolve(pkgRoot, "vite.config.js"),
		logLevel: isVerbose ? "info" : "warn",
		build: outputDir
			? { outDir: resolve(process.cwd(), outputDir), emptyOutDir: true }
			: {},
	});
}
