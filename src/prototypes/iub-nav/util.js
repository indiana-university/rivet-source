import { removeEnd } from "@src/utilities/removeEnd.js";

export function getMenus(menus, Astro) {
	const pages = [];

	function getMenu(data, depth = 0, parent = null) {
		const [label, _id, menuItems = []] = data;
		const main = depth === 0;
		const id = _id ? _id : toSlug(label);
		const items = menuItems.map((item) => getMenu(item, depth + 1, id));
		const hasCurrent = items.some((item) => item.current);
		const hasChildren = !!items.length;
		const current = isCurrentPage(id, Astro);
		const url = id ? getUrl(id) : "#";
		const menu = {
			current,
			depth,
			hasChildren,
			hasCurrent,
			id,
			items,
			label,
			main,
			parent,
			url,
		};
		pages.push(menu);
		return menu;
	}

	getMenu(menus);

	const all = pages.filter((page) => page.hasChildren);
	const main = all.find((menu) => menu.main);
	const current = all.find((menu) => menu.hasCurrent) || main;

	return {
		all,
		current,
		main,
		pages,
	};
}

export function getUrl(path, options = {}) {
	const { excludeBase = false } = options;
	return [
		excludeBase ? null : import.meta.env.BASE_URL,
		"prototypes",
		"iub-nav",
		path,
	].filter((p) => p).join("/");
}

export function isCurrentPage(path, Astro) {
	if (!Astro.url) {
		return false;
	}
	return getUrl(path) === removeEnd(Astro.url.pathname, "/");
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
