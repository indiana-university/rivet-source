const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")
const sortCollectionByOrder = require("./src/sandbox/filters/sort-collection-by-order")
const sortCollectionByTitle = require("./src/sandbox/filters/sort-collection-by-title")

module.exports = function(eleventyConfig) {

  /*
  eleventyConfig.setServerOptions({
    watch: [
      'dist/css/*.css',
      'dist/js/*.js'
    ]
  })

  eleventyConfig.addPassthroughCopy('src/sandbox/css/sandbox.css')
  eleventyConfig.addPassthroughCopy('src/sandbox/js/sandbox.js')
  eleventyConfig.addPassthroughCopy('css/rivet.css')
  eleventyConfig.addPassthroughCopy('js/rivet-iife.js')
*/

  // Ignore all under src except for sandbox.
  //eleventyConfig.ignores.add('src/**');
  //eleventyConfig.ignores.delete('src/sandbox');

  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(eleventySyntaxHighlightPlugin)

  eleventyConfig.addFilter('sortCollectionByOrder', sortCollectionByOrder)
  eleventyConfig.addFilter('sortCollectionByTitle', sortCollectionByTitle)

  eleventyConfig.addShortcode('uniqueQueryString', () => `${ Date.now() }`);

  return {
    dir: {
      input: "src",
      includes: "sandbox/_includes",
      output: "dist"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
}
