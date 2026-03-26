import { removeEnd } from "@src/utilities/removeEnd.js";

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
