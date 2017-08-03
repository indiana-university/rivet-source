/**
 * JavaScript
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');

gulp.task('js:lint', function() {
    return gulp.src(['src/js/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('js:concat', function() {
    return gulp.src([
        'src/js/alert.js', 'src/js/drawer.js', 'src/js/dropdown.js', 'src/js/modal.js', 'src/js/start.js'])
        .pipe(concat('rivet.js'))
        .pipe(gulp.dest('./static/js'));
});

/**
 * Watch scripts for changes and move to the "static" folder
 */

gulp.task('js:watch', function() {
    gulp.watch('src/js/**/*.js', ['js:lint', 'js:concat']);
});
