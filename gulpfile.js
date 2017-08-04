
const gulp = require('gulp');
const runSequence = require('run-sequence');
const requireDir = require('require-dir');

// Include everything in the "tasks" folder
requireDir('./config');

/**
 * Build the fractal UI with all components and CSS compiled.
 */

gulp.task('build', function(cb) {
    runSequence('sass', 'images', 'js:concat', 'fractal:build', 'prefix', cb);
});

/**
 * Default development task
 */

gulp.task('dev:serve', [
    'sass:lint',
    'js:lint',
    'sass',
    'images',
    'js:concat',
    'fractal:start',
    'sass:watch',
    'images:watch',
    'js:watch'
]);

gulp.task('default', ['dev:serve']);

/**
 * Build dist directory
 */

gulp.task('build:dist', function(done) {
    runSequence(
        'sass',
        'js:concat',
        'images',
        'css:release',
        'js:release',
        'sass:release',
        'images:release',
        done
    );
});
