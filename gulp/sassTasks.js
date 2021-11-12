const { dest, src, series, watch } = require('gulp');
const header = require('gulp-header');
const sass = require('gulp-sass')(require('sass'));
const stylelint = require('gulp-stylelint');
const pkg = require('../package.json');

// Create the string for the version number banner.
const sassBannerText = `// ${pkg.name} - @version ${pkg.version}

`

function compileSass() {
  return src('src/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(dest('static/css/'))
}

// List .scss files. See .stylelintrc for config
async function lintSassWatch() {
  return await src(['src/sass/**/*.scss', '!src/sass/libs/**/*.scss']).pipe(
    stylelint({
      failAfterError: false,
      reporters: [{ formatter: 'string', console: true }]
    })
  )
}

function lintSassBuild() {
  return src(['src/sass/**/*.scss', '!src/sass/libs/**/*.scss']).pipe(
    stylelint({
      failAfterError: true,
      reporters: [{ formatter: 'string', console: true }]
    })
  )
}

function watchSass(callback) {
  watch('src/sass/**/*.scss', series(compileSass, lintSassWatch))
  callback()
}

// Copy all .scss files to dist folder.
function releaseCopySass() {
  return src('src/sass/**/*.scss').pipe(dest('./sass'))
}

// Add version number header to all .scss files.
function headerSass() {
  return src(['./sass/**/*.scss', '!./sass/libs/*'])
    .pipe(header(sassBannerText, { package: pkg }))
    .pipe(dest('./sass/'))
}

module.exports = {
  compileSass, lintSassWatch, lintSassBuild, watchSass, releaseCopySass, headerSass
}
