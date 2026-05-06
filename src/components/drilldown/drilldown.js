/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const ELEMENT_NAME = "rvt-drilldown";
const DATA_ATTR_PREFIX = "data-drilldown";
const MAIN = "main";
const MENU = "menu";
const OPEN = "open";
const PARENT = "parent";

function attr(key) {
	return [DATA_ATTR_PREFIX, key].join("-");
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
		if (isNotHTML(event.target)) {
			return;
		}
		const button = event.target.closest(`[${attr(OPEN)}]`);
		if (isNotHTML(button)) {
			return;
		}
		// data-drilldown-open="child|main|parent"
		const type = button.getAttribute(attr(OPEN));
		const source = button.closest(`[${attr(type)}]`);
		const id = source.getAttribute(attr(type));
		const menu = this.querySelector(`[${attr(MENU)}="${id}"]`);
		this.#openMenu(menu);
		this.#focusMenu(menu);
	}

	#handleKeydown(event) {
		if (event.key !== "Escape") {
			return;
		}
		if (isNotHTML(event.target)) {
			return;
		}
		const type = event.shiftKey ? MAIN : PARENT;
		const source = event.target.closest(`[${attr(type)}]`);
		if (isNotHTML(source)) {
			return;
		}
		const id = source.getAttribute(attr(type));
		const menu = this.querySelector(`[${attr(MENU)}="${id}"]`);
		this.#openMenu(menu);
		this.#focusMenu(menu);
		event.stopPropagation();
	}

	#focusMenu(menu) {
		if (isNotHTML(menu)) {
			return;
		}
		window.requestAnimationFrame(() => {
			const firstLink = menu.querySelector("ul a");
			if (isNotHTML(firstLink)) {
				return;
			}
			firstLink.focus();
		});
	}

	#openMenu(menu) {
		if (isNotHTML(menu)) {
			return;
		}
		this.querySelectorAll(`[${attr(MENU)}]`).forEach((el) => {
			if (isNotHTML(el)) {
				return;
			}
			el.hidden = el !== menu;
		});
	}

	get #currentMenu() {
		return this.querySelector(`[${attr(MENU)}]:has([aria-current=page])`);
	}

	get #mainMenu() {
		const selector = `[${attr(MAIN)}]`;
		const config = this.matches(selector) ? this : this.querySelector(selector);
		if (isNotHTML(config)) {
			return;
		}
		const id = config.getAttribute(attr(MAIN));
		return this.querySelector(`[${attr(MENU)}="${id}"]`);
	}
}

window.customElements.define(ELEMENT_NAME, RivetDrilldown);
