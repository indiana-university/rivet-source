// lib/config.js

/************************************************
 * Shared by "init" and "build"
 * - commands/init.js
 * - commands/build.js
 ************************************************/

export const configFileName = "rivet.yaml";
export const defaultOutputDir = "@rivet-iu/core/dist";

/************************************************
 * "build" command
 * - lib/build/outputDir.js
 ************************************************/

// Files every Rivet build outputs
// A directory containing these Rivet assets is safe to empty and rebuild.
export const requiredBuildFiles = ["rivet.css", "rivet.js"];

/************************************************
 * "search" command
 * - commands/search.js
 * - lib/searchFiles.js
 ************************************************/

export const excludedDirs = ["dist", "node_modules"];
export const searchRegexFlags = "gi";
