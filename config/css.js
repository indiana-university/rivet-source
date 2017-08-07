const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');

gulp.task('css:dist', function() {
    return gulp.src('static/css/rivet.css')
        .pipe(gulp.dest('dist/css'));
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
    runSequence('css:dist', 'css:minify', done);
});
