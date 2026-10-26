import { Rule } from "html-validate";

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
				const { element, query, pattern } = config;

				if (!element || !query || !node.matches || !node.matches(element)) {
					continue;
				}

				const matchedElements = node.querySelectorAll(query);
				const matchedSet = new Set(matchedElements);

				if (matchedSet.size === 0) {
					continue;
				}

				if (pattern) {
					const requiredElements = querySelectorAllWithLastChild(node, pattern);
					const requiredSet = new Set(requiredElements);
					const invalidNodes =
						typeof matchedSet.difference === "function"
							? matchedSet.difference(requiredSet)
							: new Set([...matchedSet].filter((el) => !requiredSet.has(el)));

					for (const invalidNode of invalidNodes) {
						this.report({
							node: invalidNode,
							message: `Element matching "${query}" must match "${pattern}".`,
						});
					}
				}
			}
		});
	}
}
