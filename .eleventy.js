module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    open: 'local'
  })

  return {
    dir: {
      input: "src/sandbox",
      output: "dist"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
}