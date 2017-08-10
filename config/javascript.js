const gulp = require('gulp');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pump = require('pump');
const runSequence = require('run-sequence');
const header = require('gulp-header');
const package = require('../package.json');

gulp.task('js:lint', function() {
    return gulp.src(['src/js/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('js:concat', function() {
    return gulp.src([
        'src/js/components/alert.js',
        'src/js/components/drawer.js',
        'src/js/components/dropdown.js',
        'src/js/components/modal.js',
        'src/js/index.js'
    ])
        .pipe(concat('rivet.js'))
        .pipe(gulp.dest('./static/js'));
});

/**
 * Watch scripts for changes and move to the "static" folder
 */

gulp.task('js:watch', function() {
    gulp.watch('src/js/**/*.js', ['js:lint', 'js:concat']);
});

gulp.task('js:dist', function() {
    return gulp.src('static/js/rivet.js')
        .pipe(gulp.dest('dist/js'));
});

// Create the string for the verion number banner.
var banner = '/*! <%= package.name %> - @version v<%= package.version %> */' + '\n' + '\n';

gulp.task('js:header', function() {
    gulp.src('dist/js/rivet.js')
        .pipe(header(banner, { package : package }))
        .pipe(gulp.dest('dist/js/'));

    gulp.src('dist/js/rivet.min.js')
        .pipe(header(banner, { package : package }))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('js:minify', function (done) {
  pump([
        gulp.src('dist/js/rivet.js'),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest('dist/js')
    ],
    done
  );
});

gulp.task('js:release', function(done) {
    runSequence('js:dist', 'js:minify', 'js:header', done);
});
