const { src, dest } = require('gulp')
const rename = require('gulp-rename')

function moveExample() {
  return src('src/components/_extras/_index-example.html')
    .pipe(rename('index.html'))
    .pipe(dest('.'))
};

// Set Node environment to 'production' for build and release exports
function setProdNodeEnv(callback) {
  process.env.NODE_ENV = 'production'
  callback()
}

module.exports = { moveExample, setProdNodeEnv }