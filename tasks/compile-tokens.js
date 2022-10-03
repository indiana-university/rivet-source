const StyleDictionary = require('style-dictionary').extend(
  './.tokens.config.js'
)

console.log('Compiling design tokens...')

process.env.NODE_ENV === 'production'
  ? StyleDictionary.buildAllPlatforms()
  : StyleDictionary.buildPlatform('src/sass/core')