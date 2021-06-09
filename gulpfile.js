const { series } = require('gulp')

// Utilities
const { moveExample, setProdNodeEnv } = require('./gulp/utilityTasks')

// Design tokens tasks
const { compileTokens, watchTokens } = require('./gulp/tokensTasks')

// Sass tasks
const {
  compileSass,
  lintSassWatch,
  lintSassBuild,
  watchSass,
  releaseCopySass,
  headerSass
} = require('./gulp/sassTasks')

// CSS tasks
const {
  compileCSS,
  headerCSS,
  minifyCSS,
  prefixFractalCSS,
  prefixReleaseCSS
} = require('./gulp/cssTasks')

// JavaScript tasks
const {
  compileIIFE,
  compileESM,
  distJS,
  stripIIFE,
  stripESM,
  minifyJS,
  headerJS,
  vendorJS,
  transpileIIFE,
  watchJS
} = require('./gulp/javaScriptTasks')

// Fractal tasks
const { fractalStart, fractalHeadless, fractalBuild } = require('./gulp/fractalTasks');

exports.release = series(
  setProdNodeEnv,
  compileTokens,
  compileSass,
  compileCSS,
  prefixReleaseCSS,
  headerCSS,
  minifyCSS,
  compileIIFE,
  compileESM,
  distJS,
  stripIIFE,
  stripESM,
  transpileIIFE,
  minifyJS,
  headerJS,
  releaseCopySass,
  headerSass,
  moveExample
);

/**
 * TODO: Investigate whether or not we still need this. I don't think it is
 * being used any more (in CI or otherwise?).
 */
exports.build = series(
  setProdNodeEnv,
  compileTokens,
  lintSassBuild,
  compileSass,
  compileIIFE,
  compileESM,
  distJS,
  stripIIFE,
  stripESM,
  minifyJS,
  headerJS,
  vendorJS,
  fractalBuild,
  prefixFractalCSS
);

exports.fractalBuild = fractalBuild;

exports.headless = series(
  compileTokens,
  compileSass,
  lintSassWatch,
  compileIIFE,
  compileESM,
  fractalHeadless,
  watchTokens,
  watchSass,
  watchJS
);

exports.default = series(
  compileTokens,
  compileSass,
  lintSassWatch,
  compileIIFE,
  compileESM,
  fractalStart,
  watchTokens,
  watchSass,
  watchJS
);
