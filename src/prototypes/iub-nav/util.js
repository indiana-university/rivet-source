import { removeEnd } from "@src/utilities/removeEnd.js";

export function getMenus(menus, Astro) {
	const all = [];

	function getMenu(data, depth = 0, parent = null) {
		const [label, id, menuItems = []] = data;
		const main = depth === 0;
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
		if (hasChildren) {
			all.push(menu);
		}
		return menu;
	}

	getMenu(menus);

	const main = all.find((menu) => menu.main);
	const current = all.find((menu) => menu.hasCurrent) || main;
	const home = isCurrentPage("home", Astro);

	return {
		all,
		current,
		home,
		main,
	};
}

export function getUrl(path) {
	return [
		import.meta.env.BASE_URL,
		"prototypes",
		"iub-nav",
		path,
	].join("/");
}

export function isCurrentPage(path, Astro) {
	return getUrl(path) === removeEnd(Astro.url.pathname, "/");
}
