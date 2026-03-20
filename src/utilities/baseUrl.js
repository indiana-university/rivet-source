import { removeStart } from "./removeStart.js";

export function baseUrl(path) {
	const p = removeStart(path, "/");
	return [import.meta.env.BASE_URL, p].join("/");
}
