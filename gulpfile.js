const { dest, series, src, watch } = require('gulp');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const autoprefixer = require('autoprefixer');
const babel = require('rollup-plugin-babel');
const cssnano = require('gulp-cssnano');
const header = require('gulp-header');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rollup = require('rollup');
const strip = require('gulp-strip-comments');
const minify = require('gulp-terser');
const fractal = require('./fractal');
const pkg = require('./package.json');

const bannerText = require('./tasks/bannerText');
const moveExample = require('./tasks/moveExample');
const { compileTokens, watchTokens } = require('./tasks/tokensTasks');
const { compileSass, lintSassWatch, lintSassBuild, watchSass, releaseCopySass, headerSass } = require('./tasks/sassTasks');
const { compileCSS, headerCSS, minifyCSS, prefixFractalCSS, prefixReleaseCSS } = require('./tasks/cssTasks');

// Keep a reference to the fractal CLI console utility
const logger = fractal.cli.console;

// Set Node environment to 'production' for build and release exports
function setProdNodeEnv(callback) {
  process.env.NODE_ENV = 'production';
  callback();
}

async function compileIIFE() {
  try {
    const bundle = await rollup.rollup({
      input: './src/js/index.js',
      plugins: [nodeResolve(), babel({ runtimeHelpers: true })]
    });

    await bundle.write({
      file: './static/js/rivet-iife.js',
      format: 'iife',
      name: 'Rivet'
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error: this is probably a linting issue.');
  }
}

async function compileESM() {
  try {
    const bundle = await rollup.rollup({
      input: './src/js/index.js',
      plugins: [nodeResolve()]
    });

    await bundle.write({
      file: './static/js/rivet-esm.js',
      format: 'es',
      name: 'Rivet'
    });
  } catch (error) {
    throw new Error('Error: this is probably a linting issue.');
  }
}

function watchJS(callback) {
  watch(
    'src/js/**/*.js',
    { ignoreInitial: false },
    series(compileIIFE, compileESM, vendorJS)
  );
  callback();
}

// Copy JS files from 'static' to 'js'
function distJS() {
  return src(['./static/js/rivet-esm.js', './static/js/rivet-iife.js'], {
    base: './static/js'
  }).pipe(dest('./js'));
}

// Strip out comments from JS files
function stripIIFE() {
  return src('./js/rivet-iife.js')
    .pipe(strip())
    .pipe(dest('./js'));
}

function stripESM() {
  return src('./js/rivet-esm.js')
    .pipe(strip())
    .pipe(dest('./js'));
}

function minifyJS() {
  return src('./js/rivet-iife.js')
    .pipe(minify())
    .pipe(rename({ basename: 'rivet', suffix: '.min' }))
    .pipe(dest('./js'));
}

function headerJS(callback) {
  src('./js/rivet-iife.js')
    .pipe(header(bannerText, { package: pkg }))
    .pipe(dest('./js/'));

  src('./js/rivet-esm.js')
    .pipe(header(bannerText, { package: pkg }))
    .pipe(dest('./js/'));

  src('./js/rivet.min.js')
    .pipe(header(bannerText, { package: pkg }))
    .pipe(dest('./js/'));

  callback();
}

// Copy vendor.js from 'src/js' to 'static/js' for Fractal to use
function vendorJS() {
  return src('src/js/vendor.js').pipe(dest('./static/js'));
}

/**
 * Fractal tasks
 */

function fractalStart() {
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

function fractalHeadless() {
  const server = fractal.web.server({
    sync: true
  });
  fractal.web.set('server.syncOptions', {
    open: false
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

function fractalBuild() {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, 'info')
  );
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
}

exports.release = series(
  setProdNodeEnv,
  compileTokens,
  lintSassBuild,
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
  minifyJS,
  headerJS,
  releaseCopySass,
  headerSass,
  moveExample
);

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
