const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    open: 'local'
  })

  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  return {
    dir: {
      input: "src/sandbox",
      output: "dist"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
}