const { dest, series, src, watch } = require("gulp");
const { eslint } = require("rollup-plugin-eslint");
const autoprefixer = require("autoprefixer");
const babel = require("rollup-plugin-babel");
const cssnano = require("gulp-cssnano");
const header = require("gulp-header");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const rollup = require("rollup");
const sass = require("gulp-sass");
const strip = require('gulp-strip-comments');
const stylelint = require("gulp-stylelint");
const uglify = require("gulp-uglify");

const fractal = require("./fractal");
const pkg = require("./package.json");

// Keep a reference to the fractal CLI console utility
const logger = fractal.cli.console;

/**
 * Sass tasks
 */

// Create the string for the version number banner.
var sassBannerText = `// ${pkg.name} - @version ${pkg.version}

`;

// Create the string for the version number banner.
var bannerText = `/*!
 * ${pkg.name} - @version ${pkg.version}

 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

`;

function compileSass() {
  return src("src/sass/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(dest("static/css/"));
}

// List .scss files. See .stylelintrc for config
function lintSassWatch() {
  return src(["src/sass/**/*.scss", "!src/sass/libs/**/*.scss"])
  .pipe(stylelint({
    failAfterError: false,
    reporters: [
      {formatter: 'string', console: true}
    ]
  }));
}

function lintSassBuild() {
  return src(["src/sass/**/*.scss", "!src/sass/libs/**/*.scss"])
  .pipe(stylelint({
    failAfterError: true,
    reporters: [
      {formatter: 'string', console: true}
    ]
  }));
}

function watchSass(callback) {
  watch("src/sass/**/*.scss", series(compileSass, lintSassWatch));
  callback();
}

// Copy all .scss files to dist folder.
function releaseCopySass() {
  return src("src/sass/**/*.scss").pipe(dest("./sass"));
}

// Add version number header to all .scss files.
function headerSass() {
  return src(["./sass/**/*.scss", "!./sass/libs/*"])
    .pipe(header(sassBannerText, { package: pkg }))
    .pipe(dest("./sass/"));
}

/**
 * CSS tasks
 */

function compileCSS() {
  return src("static/css/rivet.css").pipe(dest("./css"));
}

function headerCSS() {
  return src("./css/rivet.css")
    .pipe(header(bannerText, { package: pkg }))
    .pipe(dest("./css/"));
}

function minifyCSS(callback) {
  src("./css/rivet.css")
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(dest("./css/"));
  callback();
}

function prefixFractalCSS() {
  return src("_build/css/*.css")
    .pipe(postcss([autoprefixer({ browsers: ["last 2 versions"] })]))
    .pipe(dest("_build/css/"));
}

function prefixReleaseCSS() {
  return src("./css/rivet.css")
    .pipe(postcss([autoprefixer({ browsers: ["last 2 versions"] })]))
    .pipe(dest("./css/"));
}

/**
 * JS tasks
 */

async function compileJS() {
  const bundle = await rollup.rollup({
    input: './src/js/index.js',
    plugins: [ eslint({ throwOnError: false }), babel({ runtimeHelpers: true })]
  });

  await bundle.write({
    file: './static/js/rivet-iife.js',
    format: 'iife',
    name: 'Rivet'
  });

  await bundle.write({
    file: './static/js/rivet-esm.js',
    format: 'es',
    name: 'Rivet'
  });
}

function vendorJS() {
  return src("src/js/vendor.js").pipe(dest("./static/js"));
}

function watchJS(callback) {
  watch("src/js/**/*.js", { ignoreInitial: false }, series(compileJS, vendorJS));
  callback();
}

function stripJS(callback) {
  src('./js/rivet-iife.js')
    .pipe(strip())
    .pipe(dest('./js'));

  src('./js/rivet-esm.js')
  .pipe(strip())
  .pipe(dest('./js'));

  callback();
}

function distJS() {
  return src("static/js/rivet*.js").pipe(dest("./js"));
}

function headerJS(callback) {
  src("./js/rivet-iife.js")
    .pipe(header(bannerText, { package: pkg }))
    .pipe(dest("./js/"));

  src("./js/rivet-esm.js")
    .pipe(header(bannerText, { package: pkg }))
    .pipe(dest("./js/"));

  src("./js/rivet.min.js")
    .pipe(header(bannerText, { package: pkg }))
    .pipe(dest("./js/"));

  callback();
}

function minifyJS() {
  return src('./js/rivet-iife.js')
    .pipe(uglify())
    .pipe(rename({ basename: 'rivet', suffix: '.min' }))
    .pipe(dest('./js'));
}

/**
 * Fractal tasks
 */

function fractalStart() {
  const server = fractal.web.server({
    sync: true
  });
  server.on("error", err => logger.error(err.message));
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
  server.on("error", err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

function fractalBuild() {
  const builder = fractal.web.builder();
  builder.on("progress", (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, "info")
  );
  builder.on("error", err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success("Fractal build completed!");
  });
}

function example(callback) {
  src("./src/components/_extras/_index-example.html")
    .pipe(rename("index.html"))
    .pipe(dest("."));
  callback();
}

exports.release = series(
  lintSassBuild,
  compileSass,
  compileCSS,
  prefixReleaseCSS,
  headerCSS,
  minifyCSS,
  compileJS,
  distJS,
  stripJS,
  minifyJS,
  headerJS,
  releaseCopySass,
  headerSass,
  example
);

exports.build = series(
  lintSassBuild,
  compileSass,
  compileJS,
  distJS,
  stripJS,
  minifyJS,
  headerJS,
  vendorJS,
  fractalBuild,
  prefixFractalCSS
);

exports.fractalBuild = fractalBuild;

exports.headless = series(compileSass,
  lintSassWatch,
  compileJS,
  fractalHeadless,
  watchSass,
  watchJS
);

exports.default = series(
  compileSass,
  lintSassWatch,
  compileJS,
  fractalStart,
  watchSass,
  watchJS
);
