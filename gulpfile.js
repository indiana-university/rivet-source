const { dest, series, src, watch } = require('gulp');
const { eslint } = require('rollup-plugin-eslint');
const autoprefixer = require('autoprefixer');
const babel = require('rollup-plugin-babel');
const cssnano = require('gulp-cssnano');
const header = require('gulp-header');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rollup = require('rollup');
const sass = require('gulp-sass');
const strip = require('gulp-strip-comments');
const StyleDictionary = require('style-dictionary').extend(
  './tokens-config.json'
);
const stylelint = require('gulp-stylelint');
const uglify = require('gulp-uglify');

const fractal = require('./fractal');
const pkg = require('./package.json');

// Keep a reference to the fractal CLI console utility
const logger = fractal.cli.console;

sass.compiler = require('sass');

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

// Set Node environment to 'production' for build and release exports
function setProdNodeEnv(callback) {
  process.env.NODE_ENV = 'production';
  callback();
}

function compileTokens(callback) {
  StyleDictionary.registerFormat({
    name: 'rvt/scss/map-simple',
    formatter: function(dictionary) {
      const allProperties = dictionary.allProperties;
      let output = '';
      output += `$${this.mapName || 'tokens'}: (\n`;
      output += allProperties
        .map(function(prop) {
          let line = '';
          if (prop.comment) {
            line += '  // ' + prop.comment + '\n';
          }
          line += "  '" + prop.attributes.type + "': " + prop.value;
          return line;
        })
        .join(',\n');
      output += '\n);\n';
      return output;
    }
  });
  StyleDictionary.registerFormat({
    name: 'rvt/scss/map-simple-desc',
    formatter: function(dictionary) {
      const allProperties = dictionary.allProperties;
      let output = '';
      output += `$${this.mapName || 'tokens'}: (\n`;
      output += allProperties
        .map(function(prop) {
          let line = '';
          if (prop.comment) {
            line += '  // ' + prop.comment + '\n';
          }
          line +=
            "  '" +
            prop.attributes.type +
            '-' +
            prop.attributes.item +
            "': " +
            prop.value;
          return line;
        })
        .join(',\n');
      output += '\n);\n';
      return output;
    }
  });
  StyleDictionary.registerFormat({
    name: 'rvt/scss/variables',
    formatter: function variablesWithPrefix(dictionary) {
      const properties = dictionary.allProperties;
      let output = '';
      output += properties
        .map(function(prop) {
          var to_ret_prop =
            '$' +
            prop.name +
            ': ' +
            (prop.attributes.category === 'asset'
              ? '"' + prop.value + '"'
              : prop.value) +
            ';';

          if (prop.comment) {
            to_ret_prop = to_ret_prop.concat(' // ' + prop.comment);
          }

          return to_ret_prop;
        })
        .filter(function(strVal) {
          return !!strVal;
        })
        .join('\n');
      output += '\n';
      return output;
    }
  });
  StyleDictionary.registerFilter({
    name: 'isBreakpoint',
    matcher: function(prop) {
      return prop.attributes.category === 'breakpoint';
    }
  });
  StyleDictionary.registerFilter({
    name: 'isColor',
    matcher: function(prop) {
      return prop.attributes.category === 'color';
    }
  });
  StyleDictionary.registerFilter({
    name: 'isTypeScale',
    matcher: function(prop) {
      return prop.attributes.category === 'ts';
    }
  });
  StyleDictionary.registerFilter({
    name: 'isWidth',
    matcher: function(prop) {
      return prop.attributes.category === 'width';
    }
  });
  StyleDictionary.registerFilter({
    name: 'isZIndex',
    matcher: function(prop) {
      return prop.attributes.category === 'z';
    }
  });
  StyleDictionary.buildAllPlatforms();
  callback();
}

function watchTokens(callback) {
  watch('src/tokens/**/*.json', series(compileTokens));
  callback();
}

function compileSass() {
  return src('src/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(dest('static/css/'));
}

// List .scss files. See .stylelintrc for config
function lintSassWatch() {
  return src(['src/sass/**/*.scss', '!src/sass/libs/**/*.scss']).pipe(
    stylelint({
      failAfterError: false,
      reporters: [{ formatter: 'string', console: true }]
    })
  );
}

function lintSassBuild() {
  return src(['src/sass/**/*.scss', '!src/sass/libs/**/*.scss']).pipe(
    stylelint({
      failAfterError: true,
      reporters: [{ formatter: 'string', console: true }]
    })
  );
}

function watchSass(callback) {
  watch('src/sass/**/*.scss', series(compileSass, lintSassWatch));
  callback();
}

// Copy all .scss files to dist folder.
function releaseCopySass() {
  return src('src/sass/**/*.scss').pipe(dest('./sass'));
}

// Add version number header to all .scss files.
function headerSass() {
  return src(['./sass/**/*.scss', '!./sass/libs/*'])
    .pipe(header(sassBannerText, { package: pkg }))
    .pipe(dest('./sass/'));
}

/**
 * CSS tasks
 */

function compileCSS() {
  return src('static/css/rivet.css').pipe(dest('./css'));
}

function headerCSS() {
  return src('./css/rivet.css')
    .pipe(header(bannerText, { package: pkg }))
    .pipe(dest('./css/'));
}

function minifyCSS(callback) {
  src('./css/rivet.css')
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(dest('./css/'));
  callback();
}

function prefixFractalCSS() {
  return src('_build/css/*.css')
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(dest('_build/css/'));
}

function prefixReleaseCSS() {
  return src('./css/rivet.css')
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(dest('./css/'));
}

/**
 * JS tasks
 */

// Set default eslint options for compiling IIFE/ESM
let eslintOptionsIIFE = { throwOnError: false },
  eslintOptionsESM = { throwOnError: false };

/**
 * Set new eslint options for compiling IIFE/ESM if env is set to 'production'
 */

function checkEnv() {
  if (process.env.NODE_ENV === 'production') {
    eslintOptionsIIFE = { throwOnError: true };
    eslintOptionsESM = { throwOnError: true };
  }
}

async function compileIIFE() {
  checkEnv();

  try {
    const bundle = await rollup.rollup({
      input: './src/js/index.js',
      plugins: [eslint(eslintOptionsIIFE), babel({ runtimeHelpers: true })]
    });

    await bundle.write({
      file: './static/js/rivet-iife.js',
      format: 'iife',
      name: 'Rivet'
    });
  } catch (error) {
    throw new Error('Error: this is probably a linting issue.');
  }
}

async function compileESM() {
  checkEnv();

  try {
    const bundle = await rollup.rollup({
      input: './src/js/index.js',
      plugins: [eslint(eslintOptionsESM)]
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
function stripJS(callback) {
  src('./js/rivet-iife.js')
    .pipe(strip())
    .pipe(dest('./js'));

  src('./js/rivet-esm.js')
    .pipe(strip())
    .pipe(dest('./js'));

  callback();
}

function minifyJS() {
  return src('./js/rivet-iife.js')
    .pipe(uglify())
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

function example(callback) {
  src('./src/components/_extras/_index-example.html')
    .pipe(rename('index.html'))
    .pipe(dest('.'));
  callback();
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
  stripJS,
  minifyJS,
  headerJS,
  releaseCopySass,
  headerSass,
  example
);

exports.build = series(
  setProdNodeEnv,
  compileTokens,
  lintSassBuild,
  compileSass,
  compileIIFE,
  compileESM,
  distJS,
  stripJS,
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
