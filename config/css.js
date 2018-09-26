const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const header = require('gulp-header');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const package = require('../package.json');
const bannerPackage = require('./banner')

gulp.task('css:dist', function() {
    return gulp.src('static/css/rivet.css')
        .pipe(gulp.dest('./css'));
});

gulp.task('css:header', function() {
    return gulp.src('./css/rivet.css')
        .pipe(header(banner, { package : package }))
        .pipe(gulp.dest('./css/'))
});


gulp.task('css:minify', function() {
    return gulp.src('./css/rivet.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('css:prefix-fractal', function() {
    return gulp.src('_build/css/*.css')
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest('_build/css/'));
});

gulp.task('css:prefix-release', function() {
    return gulp.src('./css/rivet.css')
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest('./css/'));
});

gulp.task('css:release', function(done) {
    runSequence('css:dist', 'css:prefix-release', 'css:header', 'css:minify', done);
});
