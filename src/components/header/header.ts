document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		escapeToClose(event.target);
	}
});

function getDepth(el, ancestor = null) {
	let depth = 0;
	while (el.parentElement !== ancestor) {
		el = el.parentElement;
		depth++;
	}
	return depth;
}

function escapeToClose(target) {
	const escapeTarget = target.closest("[data-trait-escape-close]");
	if (!escapeTarget) {
		return;
	}
	const closeTargets = escapeTarget.querySelectorAll(
		"[data-trait-toggle-expanded]",
	);
	const closeTarget = Array.from(closeTargets).reduce((prev, curr) =>
		getDepth(curr, escapeTarget) < getDepth(prev, escapeTarget) ? curr : prev,
	) as HTMLElement;
	if (!closeTarget) {
		return;
	}
	if (closeTarget.getAttribute("aria-expanded") === "true") {
		closeTarget.setAttribute("aria-expanded", "false");
		closeTarget.focus();
	} else {
		escapeToClose(escapeTarget.parentElement);
	}
}

document.addEventListener("click", (event) => {
	const eventTarget = event.target as HTMLElement;
	const target = eventTarget.closest("button[data-trait-toggle-expanded]");
	if (!target) {
		return;
	}
	const value = target.getAttribute("aria-expanded");
	const newValue = value === "true" ? "false" : "true";
	const autoFocusTrait = "--rvt-trait-auto-focus";
	const preexistingAutoFocusElements = queryTraitAll(autoFocusTrait);
	target.setAttribute("aria-expanded", newValue);
	const firstAutoFocusElement = queryTraitAll(autoFocusTrait)
		.filter((el) => !preexistingAutoFocusElements.includes(el))
		.at(0);
	autoFocus(firstAutoFocusElement);
});

type QueryTraitOptions = { root?: HTMLElement; value?: string };
function queryTraitAll(trait, options: QueryTraitOptions = {}) {
	const root = options.root || document;
	return Array.from(root.querySelectorAll("*")).filter((el: HTMLElement) => {
		const value = [el.style, getComputedStyle(el)]
			.map((style) => style.getPropertyValue(trait).trim())
			.filter((v) => v)
			.at(0);
		if (options.value) {
			return options.value === value;
		}
		return !!value;
	});
}

function queryTrait(...args: [string, QueryTraitOptions]) {
	return queryTraitAll(...args).at(0);
}

function isVisible(el) {
	const style = window.getComputedStyle(el);
	return (
		style.display !== "none" &&
		style.visibility !== "hidden" &&
		el.offsetWidth > 0 &&
		el.offsetHeight > 0
	);
}

function isHidden(el) {
	return !isVisible(el);
}

function getFirstFocusableDescendant(parent) {
	if (!parent || parent.closest("[inert]")) {
		return null;
	}

	const focusableSelectors = [
		"button:not([disabled])",
		"[href]",
		"input:not([disabled]):not([type='hidden'])",
		"select:not([disabled])",
		"textarea:not([disabled])",
		"[tabindex]:not([tabindex='-1'])",
		"details",
		"audio[controls]",
		"video[controls]",
		"[contenteditable]:not([contenteditable='false'])",
	].join(",");

	const candidates = parent.querySelectorAll(focusableSelectors);

	for (const candidate of candidates) {
		if (candidate.closest("[inert]")) {
			continue;
		}
		if (isVisible(candidate)) {
			return candidate;
		}
	}

	return null;
}

function autoFocus(el) {
	const target = getFirstFocusableDescendant(el);
	if (!target) {
		return;
	}
	window.requestAnimationFrame(() => {
		target?.focus();
	});
}
