/**
 * Sass tasks
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const reporter = require('postcss-reporter');
const stylelint = require('stylelint');
const scss = require("postcss-scss");

gulp.task('sass', function() {
 return gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('static/css/'));
});

/**
 * List .scss files. See .stylelintrc for config
 */
gulp.task('sass:lint', function() {
    return gulp.src(['src/sass/**/*.scss', '!src/sass/libs/**/*.scss'])
        .pipe(postcss(
            [
                stylelint(),
                reporter({ clearMessages: true })
            ],
            {
                syntax: scss
            }
        ));
});

gulp.task('sass:watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass', 'sass:lint']);
});
