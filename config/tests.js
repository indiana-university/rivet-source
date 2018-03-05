const gulp = require('gulp');
const mocha = require('gulp-mocha');
const nightwatch = require('gulp-nightwatch');

gulp.task('test:unit', function() {
    return gulp.src(['tests/unit/*.js'], { read: false })
        .pipe(mocha({ require: 'jsdom-global/register' }));
});

gulp.task('test:integration', function() {
    return gulp.src('')
        .pipe(nightwatch({
            configFile: 'tests/integration/nightwatch.json'
        }));
});