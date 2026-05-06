/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const prefix = "data-drilldown";
const attr = {
	child: `${prefix}-child`,
	main: `${prefix}-main`,
	menu: `${prefix}-menu`,
	open: `${prefix}-open`,
	parent: `${prefix}-parent`,
};

function isNotHTML(element) {
	return !(element instanceof HTMLElement);
}

function focusMenu(menuElement) {
	if (isNotHTML(menuElement)) {
		return;
	}
	window.requestAnimationFrame(() => {
		const firstLink = menuElement.querySelector("ul a");
		if (isNotHTML(firstLink)) {
			return;
		}
		firstLink.focus();
	});
}

function openMenu(menuElement) {
	if (isNotHTML(menuElement)) {
		return;
	}
	document.querySelectorAll(`[${attr.menu}]`).forEach((el) => {
		if (isNotHTML(el)) {
			return;
		}
		el.hidden = el !== menuElement;
	});
}

function openCurrentMenu() {
	const currentMenu = document.querySelector(
		`[${attr.menu}]:has([aria-current=page])`,
	);
	const mainMenuAttr = document.querySelector(`[${attr.main}]`);
	if (isNotHTML(mainMenuAttr)) {
		return;
	}
	const mainMenuId = mainMenuAttr.getAttribute(attr.main);
	const mainMenu = document.querySelector(`[${attr.menu}="${mainMenuId}"]`);
	openMenu(currentMenu || mainMenu);
}

function handleClick(event) {
	if (isNotHTML(event.target)) {
		return;
	}
	const button = event.target.closest(`[${attr.open}]`);
	if (isNotHTML(button)) {
		return;
	}
	const type = button.getAttribute(attr.open);
	const source = button.closest(`[${attr[type]}]`);
	const id = source.getAttribute(attr[type]);
	const menu = document.querySelector(`[${attr.menu}="${id}"]`);
	openMenu(menu);
	focusMenu(menu);
}

function handleKeydown(event) {
	if (event.key !== "Escape") {
		return;
	}
	if (isNotHTML(event.target)) {
		return;
	}
	const type = event.shiftKey ? "main" : "parent";
	const source = event.target.closest(`[${attr[type]}]`);
	if (isNotHTML(source)) {
		return;
	}
	const id = source.getAttribute(attr[type]);
	const menu = document.querySelector(`[${attr.menu}="${id}"]`);
	openMenu(menu);
	focusMenu(menu);
	event.stopPropagation();
}

document.addEventListener("click", handleClick);
document.addEventListener("keydown", handleKeydown, { capture: true });
openCurrentMenu();
