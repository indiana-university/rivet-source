const { dest, src, series, watch } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('sass');

function compileSass() {
  return src('src/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(dest('static/css/'));
}

module.exports = { compileSass };
