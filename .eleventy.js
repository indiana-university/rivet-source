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
        match: ["css/rivet.css"],
        fn: function (event, file) {
          console.log(`[Browsersync] Rivet CSS file changed, updating and reloading browser`)
          jetpack.copy('./css/rivet.css', './dist/css/rivet.css', { overwrite: true })
        }
      },
      {
        match: ["js/rivet-iife.js"],
        fn: function (event, file) {
          console.log(`[Browsersync] Rivet JS file changed, updating and reloading browser`)
          jetpack.copy('./js/rivet-iife.js', './dist/js/rivet-iife.js', { overwrite: true })
        }
      }
    ]
  })

  eleventyConfig.addPassthroughCopy('src/sandbox/css/sandbox.css')
  eleventyConfig.addPassthroughCopy('src/sandbox/js/sandbox.js')
  eleventyConfig.addPassthroughCopy('css/rivet.css')
  eleventyConfig.addPassthroughCopy('js/rivet-iife.js')

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