const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

function slugToTitle(slug) {
	if (!slug) {
		return slug;
	}
	return slug
		.split(/[-_]/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

module.exports = function (config) {
	config.addCollection("sections", (collectionApi) => {
		const all = collectionApi
			.getAll()
			.map((value) => {
				const parts = value.url.split("/").filter((p) => p);
				const section = slugToTitle(parts[0]);
				const group = slugToTitle(parts[1]);
				const item = parts[2];
				const { data, url } = value;
				const { title } = data;
				return { section, group, item, title, url };
			})
			.filter(({ section }) => section)
			.filter(({ group }) => group)
			.filter(({ item }) => item)
			.sort((a, b) => a.title.localeCompare(b.title));
		const sections = Object.groupBy(all, (item) => item.section);
		Object.entries(sections).forEach(([key, items]) => {
			const out = Object.groupBy(items, (item) => item.group);
			sections[key] = Object.entries(out).sort((a, b) =>
				a[0].localeCompare(b[0]),
			);
		});
		return Object.entries(sections).sort((a, b) => a[0].localeCompare(b[0]));
	});

	config.addPlugin(eleventySyntaxHighlightPlugin);

	return {
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
	};
};
