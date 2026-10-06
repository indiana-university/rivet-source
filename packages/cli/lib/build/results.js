// lib/build/results.js
import { styleText } from "util";

export function printBuildResults(config, directory, stickersExist) {
	console.log(`\n--------------------------------\n`);
	console.log(`Build completed successfully\n`);

	console.log(`${styleText("blue", "Output directory")}:\n ${directory}\n`);

	console.log(`${styleText("blue", "Stickers")}:`);

	if (stickersExist === false) {
		console.log(
			`- Stickers defined in config: No\n- ${styleText("yellow", "rivet-stickers.css")} will include all stickers\n`,
		);
	} else {
		console.log(
			`- Stickers defined in config: Yes\n- ${styleText("yellow", "rivet-stickers.css")} contains only these stickers\n`,
		);
	}
}
