/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const license = require('./license')
const jetpack = require('fs-jetpack')
const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

console.log('Compiling Sass...')

/******************************************************************************
 * Compile non-minified Sass.
 *****************************************************************************/

const expandedCss = sass.compile('./src/sass/rivet.scss')

/******************************************************************************
 * Compile minified Sass.
 *****************************************************************************/

const minifiedCss = sass.compile('./src/sass/rivet.scss', { style: 'compressed' })

/******************************************************************************
 * Add prefixes and license to non-minified CSS.
 *****************************************************************************/

postcss([autoprefixer]).process(expandedCss.css).then(result => {
  jetpack.write('./static/css/rivet.css', license + ' ' + result.css)
})

/******************************************************************************
 * Add prefixes and license to minified CSS.
 *****************************************************************************/

postcss([autoprefixer]).process(minifiedCss.css).then(result => {
  jetpack.write('./static/css/rivet.min.css', license + ' ' + result.css)
})