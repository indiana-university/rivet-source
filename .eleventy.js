const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventySyntaxHighlightPlugin);
  eleventyConfig.addFilter('sortCollectionByOrder', (collection) =>
    collection.sort((a, b) => a.data.order - b.data.order)
  );
  eleventyConfig.addFilter('sortCollectionByTitle', (collection) =>
    collection.sort((a, b) => a.data.title.localeCompare(b.data.title))
  );
  eleventyConfig.addShortcode('uniqueQueryString', () => `${ Date.now() }`);
  return {
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
