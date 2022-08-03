const { series, watch } = require('gulp');
const StyleDictionary = require('style-dictionary').extend(
  './.tokens.config.js'
);

function compileTokens(callback) {
  process.env.NODE_ENV === 'production'
    ? StyleDictionary.buildAllPlatforms()
    : StyleDictionary.buildPlatform('src/sass/core');
  callback();
}

function watchTokens(callback) {
  watch('src/tokens/**/*.json', series(compileTokens));
  callback();
}

module.exports = { compileTokens, watchTokens };
