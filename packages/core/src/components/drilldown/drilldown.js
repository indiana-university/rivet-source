/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const ELEMENT_NAME = "rvt-drilldown";
const MAIN = "main";
const MENU = "menu";
const OPEN = "open";
const PARENT = "parent";

function attr(name) {
	return ["data", ELEMENT_NAME, name].join("-");
}

function attrSelector(name, value) {
	const equals = value ? `="${value}"` : "";
	return `[${attr(name)}${equals}]`;
}

function focusOnFirstMatch(target, selector) {
	window.requestAnimationFrame(() => {
		if (isNotHTML(target)) {
			return;
		}
		const el = target.querySelector(selector);
		if (isNotHTML(el)) {
			return;
		}
		el.focus();
	});
}

function getClosestAttributeValue(target, name) {
	if (isNotHTML(target)) {
		return;
	}
	const source = target.closest(attrSelector(name));
	if (isNotHTML(source)) {
		return;
	}
	return source.getAttribute(attr(name));
}

function isNotHTML(element) {
	return !(element instanceof HTMLElement);
}

class RivetDrilldown extends HTMLElement {
	#abortController;

	connectedCallback() {
		this.#abortController = new AbortController();
		const { signal } = this.#abortController;
		this.addEventListener("click", this.#handleClick, { signal });
		this.addEventListener("keydown", this.#handleKeydown, {
			capture: true,
			signal,
		});
		this.#openMenu(this.#currentMenu || this.#mainMenu);
	}

	disconnectedCallback() {
		this.#abortController.abort();
	}

	#handleClick(event) {
		const { target } = event;
		const type = getClosestAttributeValue(target, OPEN);
		const menu = this.#getMenu(target, type);
		this.#openMenu(menu);
		this.#focusMenu(menu);
	}

	#handleKeydown(event) {
		if (event.key !== "Escape") {
			return;
		}
		const menu = event.shiftKey
			? this.#mainMenu
			: this.#getMenu(event.target, PARENT) || this.#mainMenu;
		if (menu === this.#activeMenu) {
			return;
		}
		this.#openMenu(menu);
		this.#focusMenu(menu);
		event.stopPropagation();
	}

	#focusMenu(menu) {
		focusOnFirstMatch(menu, "ul a");
	}

	#getMenu(target, type) {
		if (type === MAIN) {
			return this.#mainMenu;
		}
		const id = getClosestAttributeValue(target, type);
		if (!id) {
			return;
		}
		return this.querySelector(attrSelector(MENU, id));
	}

	#openMenu(menu) {
		if (isNotHTML(menu)) {
			return;
		}
		this.querySelectorAll(attrSelector(MENU)).forEach((el) => {
			if (isNotHTML(el)) {
				return;
			}
			el.hidden = el !== menu;
		});
	}

	get #activeMenu() {
		return this.querySelector(`${attrSelector(MENU)}:not([hidden])`);
	}

	get #currentMenu() {
		return this.querySelector(`${attrSelector(MENU)}:has([aria-current=page])`);
	}

	get #mainMenu() {
		return this.querySelector(
			`${attrSelector(MENU)}:not(${attrSelector(PARENT)})`,
		);
	}
}

window.customElements.define(ELEMENT_NAME, RivetDrilldown);
