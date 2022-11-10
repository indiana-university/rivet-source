const jetpack = require('fs-jetpack')
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")
const sortCollectionByOrder = require("./src/sandbox/filters/sort-collection-by-order")
const sortCollectionByTitle = require("./src/sandbox/filters/sort-collection-by-title")

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    open: 'local',
    files: [
      {
        match: ["css/rivet.min.css"],
        fn: function (event, file) {
          console.log(`[Browsersync] Rivet CSS file changed, updating and reloading browser`)
          jetpack.copy('./css/rivet.min.css', './dist/css/rivet.min.css', { overwrite: true })
        }
      },
      {
        match: ["js/rivet.min.js"],
        fn: function (event, file) {
          console.log(`[Browsersync] Rivet JS file changed, updating and reloading browser`)
          jetpack.copy('./js/rivet.min.js', './dist/js/rivet.min.js', { overwrite: true })
        }
      }
    ]
  })

  eleventyConfig.addPassthroughCopy('src/sandbox/css/sandbox.css')
  eleventyConfig.addPassthroughCopy('src/sandbox/js/sandbox.js')
  eleventyConfig.addPassthroughCopy('css/rivet.min.css')
  eleventyConfig.addPassthroughCopy('js/rivet.min.js')

  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(eleventySyntaxHighlightPlugin)

  eleventyConfig.addFilter('sortCollectionByOrder', sortCollectionByOrder)
  eleventyConfig.addFilter('sortCollectionByTitle', sortCollectionByTitle)

  return {
    dir: {
      input: "src/sandbox",
      output: "dist"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
}