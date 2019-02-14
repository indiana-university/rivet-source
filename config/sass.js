/**
 * Sass tasks
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const reporter = require('postcss-reporter');
const stylelint = require('stylelint');
const scss = require('postcss-scss');
const header = require('gulp-header');
const package = require('../package.json');
const bannerPackage = require('./sass-banner');

gulp.task('sass', function() {
  return gulp
    .src('src/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' })
    .on('error', sass.logError))
    .pipe(gulp.dest('static/css/'));
});

/**
 * List .scss files. See .stylelintrc for config
 */
gulp.task('sass:lint', function() {
  return gulp
  .src(['src/sass/**/*.scss', '!src/sass/libs/**/*.scss'])
  .pipe(
    postcss([stylelint(), reporter({ clearMessages: true })], {
      syntax: scss
    })
  );
});

// Watch files

gulp.task('sass:watch', async function() {
  gulp.watch('src/sass/**/*.scss', gulp.series('sass', 'sass:lint'))
});

// Copy all .scss files to dist folder.
gulp.task('sass:release-copy', function() {
  return gulp.src('src/sass/**/*.scss').pipe(gulp.dest('./sass'));
});

// Add version number header to all .scss files.
gulp.task('sass:header', function() {
  return gulp
    .src(['./sass/**/*.scss', '!./sass/libs/*'])
    .pipe(header(bannerPackage, { package: package }))
    .pipe(gulp.dest('./sass/'));
});

// Move sass source files to "dist" folder for release.
gulp.task('sass:release', gulp.series('sass:release-copy', 'sass:header'));
