export function removeEnd(str, end) {
	const endsWith = new RegExp(`${end}$`);
	return str.replace(endsWith, "");
}
