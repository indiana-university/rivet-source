import { Rule, definePlugin } from "html-validate";

class NoLegacyAccordionIcon extends Rule {
	documentation() {
		return {
			description:
				"v3 renders the accordion toggle icon via CSS (::after). Remove the .rvt-accordion__toggle-icon element — see the v2-to-v3 migration guide.",
		};
	}

	setup() {
		this.on("dom:ready", (event) => {
			const { document } = event;
			const icons = document.querySelectorAll(".rvt-accordion__toggle-icon");

			for (const icon of icons) {
				this.report(
					icon,
					"Found v2 accordion icon markup (.rvt-accordion__toggle-icon). In v3 this is rendered by CSS — remove this element.",
				);
			}
		});
	}
}

export default definePlugin({
	name: "rivet-migration",
	rules: {
		"rivet-migration/no-legacy-accordion-icon": NoLegacyAccordionIcon,
	},
	configs: {
		recommended: {
			rules: {
				"rivet-migration/no-legacy-accordion-icon": "error",
			},
		},
	},
});
