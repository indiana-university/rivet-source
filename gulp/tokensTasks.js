const { series, watch } = require('gulp');
const StyleDictionary = require('style-dictionary').extend(
  './.tokens.config.js'
);
const { jsonVariables } = require('../src/tokens/formats/json-formats');
const {
  mapSimple,
  mapSimpleDesc,
  variables
} = require('../src/tokens/formats/sass-formats');

// Pull in Style Dictionary custom filters
const {
  isBreakpoint,
  isColor,
  isTypeScale,
  isWidth,
  isZIndex
} = require('../src/tokens/filters/format-filters');

function compileTokens(callback) {
  // StyleDictionary.registerFilter(isBreakpoint);
  // StyleDictionary.registerFilter(isColor);
  // StyleDictionary.registerFilter(isTypeScale);
  // StyleDictionary.registerFilter(isWidth);
  // StyleDictionary.registerFilter(isZIndex);
  // StyleDictionary.registerFormat(jsonVariables);
  // StyleDictionary.registerFormat(mapSimple);
  // StyleDictionary.registerFormat(mapSimpleDesc);
  // StyleDictionary.registerFormat(variables);
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
