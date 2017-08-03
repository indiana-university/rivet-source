
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

gulp.task('default', ['sass:lint', 'js:lint', 'sass', 'images', 'js:concat', 'fractal:start', 'sass:watch', 'images:watch', 'js:watch']);
