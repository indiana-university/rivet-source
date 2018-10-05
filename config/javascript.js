const gulp = require('gulp');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pump = require('pump');
const runSequence = require('run-sequence');
const header = require('gulp-header');
const package = require('../package.json');
const bannerPackage = require('./banner')

gulp.task('js:lint', function() {
    return gulp.src(['src/js/**/*.js', '!node_modules/**', '!src/js/vendor.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('js:concat', function() {
    return gulp.src([
        'src/js/polyfills/closest.js',
        'src/js/polyfills/CustomEvent.js',
        'src/js/utilities/fireCustomEvent.js',
        'src/js/components/alert.js',
        'src/js/components/drawer.js',
        'src/js/components/dropdown.js',
        'src/js/components/modal.js',
        'src/js/components/tabs.js',
        'src/js/components/fileInput.js',
        'src/js/index.js'
    ])
        .pipe(concat('rivet.js'))
        .pipe(gulp.dest('./static/js'));
});

gulp.task('js:vendor', function() {
    return gulp.src('src/js/vendor.js')
        .pipe(gulp.dest('./static/js'));
})

/**
 * Watch scripts for changes and move to the "static" folder
 */

gulp.task('js:watch', function() {
    gulp.watch('src/js/**/*.js', ['js:concat', 'js:vendor']);
});

gulp.task('js:dist', function() {
    return gulp.src('static/js/rivet.js')
        .pipe(gulp.dest('./js'));
});

gulp.task('js:header', function() {
    gulp.src('./js/rivet.js')
        .pipe(header(bannerPackage, { package : package }))
        .pipe(gulp.dest('./js/'));

    gulp.src('./js/rivet.min.js')
        .pipe(header(bannerPackage, { package : package }))
        .pipe(gulp.dest('./js/'));
});

gulp.task('js:minify', function (done) {
  pump([
        gulp.src('./js/rivet.js'),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest('./js')
    ],
    done
  );
});

gulp.task('js:release', function(done) {
    runSequence('js:dist', 'js:minify', 'js:header', done);
});
