'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');


/**
 * Require the fractal config file so that it can be reference with gulp
 */

const fractal = require('./fractal.js');

/**
 * Fractal console utilities
 */

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

gulp.task('fractal:start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

gulp.task('fractal:build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});

/**
 * Sass tasks
 */

gulp.task('sass', function() {
 return gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('sass:watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

/**
 * Images
 * TODO: Maybe add optimization step in to this images task for svg? Also
 * need to add a step to delete images from "dist" when they are deleted
 * from "src".
 */

gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img/'));
});

/**
 * Watch images for changes and move to the "dist" folder
 */

gulp.task('images:watch', function() {
    gulp.watch('src/img/**/*', ['images']);
});

/**
 * Build the fractal UI with all components and CSS compiled.
 */

gulp.task('build', ['sass', 'images', 'fractal:build']);

/**
 * Default development task
 */

gulp.task('default', ['sass', 'fractal:start', 'sass:watch', 'images:watch']);
