import { Rule } from "html-validate";

function pluralize(count, singular, plural = `${singular}s`) {
	return count === 1 ? singular : plural;
}

function querySelectorAllWithLastChild(node, selector) {
	const isLastChildRequired = selector.endsWith(":last-child");
	const baseSelector = isLastChildRequired
		? selector.replace(/:last-child$/, "").trim()
		: selector;

	const elements = Array.from(node.querySelectorAll(baseSelector));

	if (!isLastChildRequired) {
		return elements;
	}

	return elements.filter((el) => {
		const parent = el.parent;
		if (!parent) return false;
		const children = parent.childElements || parent.children || [];
		return children.length > 0 && children[children.length - 1] === el;
	});
}

export default class ElementRequiredDescendantsRule extends Rule {
	documentation() {
		return {
			description: "Ensure required descendants are present",
		};
	}

	setup() {
		const configs = Array.isArray(this.options) ? this.options : [this.options];

		this.on("element:ready", (event) => {
			const node = event.target;

			for (const config of configs) {
				const { element, required } = config;

				if (!element || !node.matches || !node.matches(element)) {
					continue;
				}

				if (!required || !Array.isArray(required)) {
					continue;
				}

				for (const req of required) {
					const { query, not, max, message } = req;
					if (!query) continue;

					const extraMessage = message ? `: ${message}` : "";

					let matchedElements = querySelectorAllWithLastChild(node, query);

					if (not && Array.isArray(not)) {
						const excludedNodes = new Set();
						for (const notQuery of not) {
							querySelectorAllWithLastChild(node, notQuery).forEach((el) =>
								excludedNodes.add(el),
							);
						}
						matchedElements = matchedElements.filter(
							(el) => !excludedNodes.has(el),
						);
					}

					const matchedSet = new Set(matchedElements);

					if (max !== undefined && matchedSet.size > max) {
						this.report({
							node,
							message: `<${node.tagName}> can contain at most ${max} ${pluralize(max, "element")} matching "${query}" but found ${matchedSet.size}${extraMessage}`,
						});
					}
				}
			}
		});
	}
}
