/**
 * Images
 * TODO: Maybe add optimization step in to this images task for svg? Also
 * need to add a step to delete images from "static" when they are deleted
 * from "src".
 */

const gulp = require('gulp');

gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('static/img/'));
});

/**
 * Watch images for changes and move to the "static" folder
 */

gulp.task('images:watch', function() {
    gulp.watch('src/img/**/*', ['images']);
});

gulp.task('images:release', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));
});
