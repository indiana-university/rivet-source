// lib/build/results.js
import { styleText } from "util";

import stickerTokens from "@rivet-iu/tokens/tokens/sticker.json" with { type: "json" };

// Get count for every available sticker
// Filter out keys starting with $ (ex: $type) and get total length of remaining keys
const stickersTotal = Object.keys(stickerTokens.sticker).filter(
	(key) => !key.startsWith("$"),
).length;

export function printBuildResults(
	config,
	directory,
	stickersExist,
	outputSource,
) {
	console.log(`\n${"-".repeat(32)}`);
	console.log(`Build completed successfully\n`);

	// Output directory info, including where the directory setting came from
	// Start with the default label, then override if the setting came from somewhere else
	let sourceLabel = "default";

	if (outputSource !== "default") {
		// Ex: "from rivet.yaml" or "from --output flag"
		sourceLabel = `from ${outputSource}`;
	}

	console.log(
		`${styleText("blue", "Output directory")} (${sourceLabel}):\n ${directory}\n`,
	);

	// Output sticker info
	const stickersCount = stickersExist ? config.stickers.length : stickersTotal;
	console.log(
		`${styleText("blue", "Stickers")}:\n ${stickersCount} / ${stickersTotal}\n`,
	);
}
