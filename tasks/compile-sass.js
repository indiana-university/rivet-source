const license = require('./license')
const jetpack = require('fs-jetpack')
const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

console.log('Compiling Sass...')

const expandedCss = sass.compile('./src/sass/rivet.scss')
const minifiedCss = sass.compile('./src/sass/rivet.scss', { style: 'compressed' })

postcss([autoprefixer]).process(expandedCss.css).then(result => {
  jetpack.write('./static/css/rivet.css', license + ' ' + result.css)
})

postcss([autoprefixer]).process(minifiedCss.css).then(result => {
  jetpack.write('./static/css/rivet.min.css', license + ' ' + result.css)
})