const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    open: 'local'
  })

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