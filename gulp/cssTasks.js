const { dest, src } = require('gulp')
const autoprefixer = require('autoprefixer')
const cssnano = require('gulp-cssnano')
const header = require('gulp-header')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const pkg = require('../package.json')
const bannerText = require('./bannerText')

function compileCSS() {
  return src('static/css/rivet.css').pipe(dest('./css'))
}

function headerCSS() {
  return src('./css/rivet.css')
    .pipe(header(bannerText, { package: pkg }))
    .pipe(dest('./css/'))
}

function minifyCSS(callback) {
  src('./css/rivet.css')
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(dest('./css/'));
  callback()
}

function prefixFractalCSS() {
  return src('_build/css/*.css')
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(dest('_build/css/'))
}

function prefixReleaseCSS() {
  return src('./css/rivet.css')
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(dest('./css/'))
}

module.exports = {
  compileCSS, headerCSS, minifyCSS, prefixFractalCSS, prefixReleaseCSS
}