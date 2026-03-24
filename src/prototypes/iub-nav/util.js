export function url(path) {
	return [
		import.meta.env.BASE_URL,
		"prototypes",
		"iub-nav",
		path,
	].join("/");
}
