
const gulp = require('gulp');
const runSequence = require('run-sequence');
const requireDir = require('require-dir');
const rename = require('gulp-rename');

// Include everything in the "tasks" folder
requireDir('./config');

/**
 * Build the fractal UI with all components and CSS compiled.
 */

gulp.task('build', function(cb) {
    runSequence('sass', 'js:concat', 'js:vendor', 'fractal:build', 'css:prefix-fractal', cb);
});

/**
 * Default development task
 */

gulp.task('dev:serve', [
    'sass:lint',
    'js:lint',
    'sass',
    'js:concat',
    'fractal:start',
    'sass:watch',
    'js:watch'
]);

gulp.task('default', ['dev:serve']);

/**
 * Build dist directory
 */

gulp.task('build:example', function() {
    gulp.src('./src/components/_extras/_index-example.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
    gulp.src('./src/components/_extras/_README-PACKAGE.md')
        .pipe(rename('README.md'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:dist', function(done) {
    runSequence(
        'sass',
        'js:concat',
        'css:release',
        'js:release',
        'sass:release',
        'build:example',
        'test:unit',
        done
    );
});

/**
 * Testing tasks
 */
gulp.task('test:all', function(done) {
    runSequence(
        'test:unit',
        'test:integration',
        done
    );
});

gulp.task('test', ['test:all']);