// lib/build/results.js
import fs from "node:fs";
import { styleText } from "util";

import stickerTokens from "@rivet-iu/tokens/tokens/sticker.json" with { type: "json" };

// Get count for every available sticker
// Filter out keys starting with $ (ex: $type) and get total length of remaining keys
const stickersTotal = Object.keys(stickerTokens.sticker).filter(
	(key) => !key.startsWith("$"),
).length;

export function printBuildResults(config, directory, stickersExist) {
	console.log(`\n--------------------------------\n`);
	console.log(`Build completed successfully\n`);

	// Output directory info
	console.log(`${styleText("blue", "Output directory")}:\n ${directory}\n`);

	// Output sticker info
	const stickersCount = stickersExist ? config.stickers.length : stickersTotal;
	console.log(
		`${styleText("blue", "Stickers")}:\n ${stickersCount} / ${stickersTotal}\n`,
	);
}
