const { dest, series, src, watch } = require("gulp");
const autoprefixer = require("autoprefixer");
const cssnano = require("gulp-cssnano");
const eslint = require("gulp-eslint");
const concat = require("gulp-concat");
const header = require("gulp-header");
const postcss = require("gulp-postcss");
const pump = require("pump");
const rename = require("gulp-rename");
const reporter = require("postcss-reporter");
const requireDir = require("require-dir");
const sass = require("gulp-sass")(require('node-sass'));
const scss = require("postcss-scss");
const stylelint = require("gulp-stylelint");
const uglify = require("gulp-uglify");

const bannerPackage = require("./config/banner");
const fractal = require("./fractal");
const package = require("./package.json");
const sassBannerPackage = require("./config/sass-banner");

// Keep a reference to the fractal CLI console utility
const logger = fractal.cli.console;

// Include everything in the "tasks" folder
requireDir("./config");

/**
 * Sass tasks
 */

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
    .pipe(header(sassBannerPackage, { package: package }))
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
    .pipe(header(bannerPackage, { package: package }))
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

function lintJSWatch() {
  return src(["src/js/**/*.js", "!node_modules/**", "!src/js/vendor.js"])
    .pipe(eslint())
    .pipe(eslint.format());
}

function lintJSBuild() {
  return src(["src/js/**/*.js", "!node_modules/**", "!src/js/vendor.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function concatJS() {
  return src([
    "src/js/polyfills/closest.js",
    "src/js/polyfills/CustomEvent.js",
    "src/js/utilities/fireCustomEvent.js",
    "src/js/components/alert.js",
    "src/js/components/drawer.js",
    "src/js/components/dropdown.js",
    "src/js/components/modal.js",
    "src/js/components/tabs.js",
    "src/js/components/fileInput.js",
    "src/js/index.js"
  ])
    .pipe(concat("rivet.js"))
    .pipe(dest("./static/js"));
}

function vendorJS() {
  return src("src/js/vendor.js").pipe(dest("./static/js"));
}

function watchJS(callback) {
  watch("src/js/**/*.js", { ignoreInitial: false }, series(lintJSWatch, concatJS, vendorJS));
  callback();
}

function distJS() {
  return src("static/js/rivet.js").pipe(dest("./js"));
}

function headerJS(callback) {
  src("./js/rivet.js")
    .pipe(header(bannerPackage, { package: package }))
    .pipe(dest("./js/"));

  src("./js/rivet.min.js")
    .pipe(header(bannerPackage, { package: package }))
    .pipe(dest("./js/"));

  callback();
}

function minifyJS(callback) {
  pump(
    [src("./js/rivet.js"), uglify(), rename({ suffix: ".min" }), dest("./js")],
    callback
  );
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

/**
 * Default development task
 */

/**
 * Build dist directory
 */

function example(callback) {
  src("./src/components/_extras/_index-example.html")
    .pipe(rename("index.html"))
    .pipe(dest("."));
  callback();
}

exports.release = series(
  lintSassBuild,
  compileSass,
  lintJSBuild,
  concatJS,
  compileCSS,
  prefixReleaseCSS,
  headerCSS,
  minifyCSS,
  distJS,
  minifyJS,
  headerJS,
  releaseCopySass,
  headerSass,
  example
);

exports.build = series(
  lintSassBuild,
  compileSass,
  lintJSBuild,
  concatJS,
  vendorJS,
  fractalBuild,
  prefixFractalCSS
);

exports.fractalBuild = fractalBuild;

exports.headless = series(compileSass,
  lintSassWatch,
  lintJSWatch,
  concatJS,
  fractalHeadless,
  watchSass,
  watchJS
);

exports.default = series(
  compileSass,
  lintSassWatch,
  lintJSWatch,
  concatJS,
  fractalStart,
  watchSass,
  watchJS
);
