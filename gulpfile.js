
const gulp = require('gulp');
const requireDir = require('require-dir');
const rename = require('gulp-rename');

// Include everything in the "tasks" folder
requireDir('./config');

/**
 * Build the fractal UI with all components and CSS compiled.
 */

gulp.task('build', gulp.series('sass', 'js:concat', 'js:vendor', 'fractal:build', 'css:prefix-fractal'));

/**
 * Default development task
 */

gulp.task('dev:serve', gulp.series('sass',
  'sass:lint',
  'js:concat',
  'fractal:start',
  'sass:watch', 'js:watch'
  )
);



/**
 * Build dist directory
 */

gulp.task('build:example', function(callback) {
  gulp.src('./src/components/_extras/_index-example.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('.'));
    callback();
});

gulp.task('build:dist', gulp.series(
    'sass',
    'js:concat',
    'css:release',
    'js:release',
    'sass:release',
    'build:example'
  )
);