/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export function getMenus(menus, Astro) {
	const pages = [];

	function getMenu(data, depth = 0, parent = null) {
		const { id: _id, label = "", items: _items = [], ...other } = data;
		const main = depth === 0;
		const id = _id ?? toSlug(label);
		const url = `/${id}`;
		const current = url === removeEnd(Astro?.url?.pathname, "/");
		const page = {
			...other,
			current,
			depth,
			id,
			label,
			main,
			parent,
			url,
		};
		const items = _items.map((item) => getMenu(item, depth + 1, page));
		const hasCurrent = items.some((item) => item.current);
		const hasChildren = !!items.length;
		const menu = {
			...page,
			hasChildren,
			hasCurrent,
			items,
		};
		pages.push(menu);
		return menu;
	}

	getMenu(menus);

	const all = pages.filter((page) => page.hasChildren);
	const main = pages.find((menu) => menu.main);
	const current = pages.find((menu) => menu.hasCurrent) || main;
	const page = pages.find((menu) => menu.current) || main;

	return {
		all,
		current,
		main,
		page,
		pages,
	};
}

export function removeEnd(str, end) {
	if (!str) {
		return null;
	}
	const endsWith = new RegExp(`${end}$`);
	return str.replace(endsWith, "");
}

export function toSlug(string) {
	return string
		.toString()
		.toLowerCase()
		.trim()
		.normalize("NFD")
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}
