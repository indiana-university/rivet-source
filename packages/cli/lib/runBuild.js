import { execSync } from "node:child_process";

// Run the tokens and core builds with the given environment variables
export function runWorkspaceBuild(env) {
	execSync("pnpm --filter @rivet-iu/tokens build", { stdio: "inherit", env });
	execSync("pnpm --filter @rivet-iu/core build", { stdio: "inherit", env });
}
