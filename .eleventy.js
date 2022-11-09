const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    open: 'local'
  })

  eleventyConfig.addPassthroughCopy('src/sandbox/css/sandbox.css')
  eleventyConfig.addPassthroughCopy('src/sandbox/js/sandbox.js')
  eleventyConfig.addPassthroughCopy('css/rivet.min.css')
  eleventyConfig.addPassthroughCopy('js/rivet.min.js')

  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(eleventySyntaxHighlightPlugin)

  return {
    dir: {
      input: "src/sandbox",
      output: "dist"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
}