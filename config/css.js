const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const header = require('gulp-header');
const package = require('../package.json');

gulp.task('css:dist', function() {
    return gulp.src('static/css/rivet.css')
        .pipe(gulp.dest('dist/css'));
});

// Create the string for the verion number banner.
var banner = '/*! <%= package.name %> - @version v<%= package.version %> */' + '\n' + '\n';

gulp.task('css:header', function() {
    return gulp.src('dist/css/rivet.css')
        .pipe(header(banner, { package : package }))
        .pipe(gulp.dest('dist/css/'))
});


gulp.task('css:minify', function() {
    return gulp.src('dist/css/rivet.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('css:release', function(done) {
    runSequence('css:dist', 'css:header', 'css:minify', done);
});
