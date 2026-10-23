import { Rule } from "html-validate";

export default class DescendantCountRule extends Rule {
	documentation() {
		return {
			description:
				"Enforces minimum and/or maximum counts for multiple descendant selectors within a container.",
		};
	}

	setup() {
		const configs = Array.isArray(this.options) ? this.options : [this.options];

		this.on("element:ready", (event) => {
			const node = event.target;

			for (const config of configs) {
				const { container, constraints } = config;

				if (!container || !constraints || !Array.isArray(constraints)) {
					continue;
				}

				if (!node.matches || !node.matches(container)) {
					continue;
				}

				for (const constraint of constraints) {
					const { selector, min, max, message } = constraint;

					if (!selector) {
						continue;
					}

					const found = node.querySelectorAll(selector);
					const count = found.length;

					if (max !== undefined && count > max) {
						this.report({
							node,
							message: `<${node.tagName}> can contain at most ${max} element(s) matching "${selector}", but found ${count}${message ? `: ${message}` : ""}`,
						});
					}

					if (min !== undefined && count < min) {
						this.report({
							node,
							message: `<${node.tagName}> must contain at least ${min} element(s) matching "${selector}", but found ${count}${message ? `: ${message}` : ""}`,
						});
					}
				}
			}
		});
	}
}
