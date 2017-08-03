/**
 * Autoprefixer
 */

const gulp = require('gulp');
const autoprefixer = require('autoprefixer');

gulp.task('prefix', function() {
    return gulp.src('_build/css/*.css')
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest('_build/css'));
});
