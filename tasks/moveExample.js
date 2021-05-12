const { src, dest } = require('gulp');
const rename = require('gulp-rename');

module.exports = function moveExample() {
  return src('src/components/_extras/_index-example.html')
    .pipe(rename('index.html'))
    .pipe(dest('.'));
};
