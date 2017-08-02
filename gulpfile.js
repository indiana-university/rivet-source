'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const reporter = require('postcss-reporter');
const stylelint = require('stylelint');
const scss = require("postcss-scss");
const autoprefixer = require('autoprefixer');
const runSequence = require('run-sequence');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');

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
        .pipe(gulp.dest('static/css/'));
});

/**
 * List .scss files. See .stylelintrc for config
 */
gulp.task('sass:lint', function() {
    return gulp.src(['src/sass/**/*.scss', '!src/sass/libs/**/*.scss'])
        .pipe(postcss(
            [
                stylelint(),
                reporter({ clearMessages: true })
            ],
            {
                syntax: scss
            }
        ));
});

gulp.task('sass:watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass', 'sass:lint']);
});

/**
 * Autoprefixer
 */
gulp.task('prefix', function() {
    return gulp.src('_build/css/*.css')
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest('_build/css'));
});

/**
 * Images
 * TODO: Maybe add optimization step in to this images task for svg? Also
 * need to add a step to delete images from "static" when they are deleted
 * from "src".
 */

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


/**
 * JavaScript
 */

gulp.task('js:lint', function() {
    return gulp.src(['src/js/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('js:concat', function() {
    return gulp.src([
        'src/js/alert.js', 'src/js/drawer.js', 'src/js/dropdown.js', 'src/js/modal.js', 'src/js/start.js'])
        .pipe(concat('rivet.js'))
        .pipe(gulp.dest('./static/js'));
});

/**
 * Watch scripts for changes and move to the "static" folder
 */

gulp.task('js:watch', function() {
    gulp.watch('src/js/**/*.js', ['js:lint', 'js:concat']);
});

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
