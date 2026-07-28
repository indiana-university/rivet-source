import { describe, it, expect } from "vitest";
import { HtmlValidate } from "html-validate";
import rivetMigrationPlugin from "./no-legacy-accordion-icon.js";

const htmlvalidate = new HtmlValidate({
	extends: ["html-validate:recommended"],
	plugins: [rivetMigrationPlugin],
	rules: {
		"rivet-migration/no-legacy-accordion-icon": "error",
	},
});

describe("no-legacy-accordion-icon", () => {
	it("flags v2 accordion markup with the inline icon", async () => {
		const html = `
			<button class="rvt-accordion__toggle" data-rvt-accordion-trigger type="button">
				<span class="rvt-accordion__toggle-text">Become the best version of yourself at IU</span>
				<div class="rvt-accordion__toggle-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
						<g fill="currentColor">
							<path d="M8,15a1,1,0,0,1-1-1V2A1,1,0,0,1,9,2V14A1,1,0,0,1,8,15Z" />
							<path d="M14,9H2A1,1,0,0,1,2,7H14a1,1,0,0,1,0,2Z" />
						</g>
					</svg>
				</div>
			</button>
        `;

		const report = await htmlvalidate.validateString(html);

		expect(report.valid).toBe(false);
		// expect(report.results[0].messages[0].ruleId).toBe(
		//     "rivet-migration/no-legacy-accordion-icon",
		// );

		const ruleIds = report.results[0].messages.map((message) => message.ruleId);

		expect(ruleIds).toContain("rivet-migration/no-legacy-accordion-icon");
	});

	it("passes current v3 markup with no inline icon", async () => {
		const html = `
			<button class="rvt-accordion__toggle" data-rvt-accordion-trigger type="button">
				<span class="rvt-accordion__toggle-text">Become the best version of yourself at IU</span>
			</button>
        `;

		const report = await htmlvalidate.validateString(html);

		expect(report.valid).toBe(true);
	});
});
