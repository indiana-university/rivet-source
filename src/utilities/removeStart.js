export function removeStart(str, start) {
	const startsWith = new RegExp(`^${start}`);
	return str.replace(startsWith, "");
}
