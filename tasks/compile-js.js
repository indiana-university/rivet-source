/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const license = require('./license')
const jetpack = require('fs-jetpack')
const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')

/******************************************************************************
 * Define function to compile JS. The function must be async since Rollup
 * bundling methods return a Promise to be awaited.
 *****************************************************************************/

async function compile() {

  /**************************************************************************
   * Define output file paths.
   *************************************************************************/

  const umd = './static/js/rivet-umd.js'
  const esm = './static/js/rivet-esm.js'
  const iife = './static/js/rivet-iife.js'
  const min = './static/js/rivet.min.js'

  /**************************************************************************
   * Bundle, minify, and add license text to JS files.
   *************************************************************************/

  const bundle = await rollup.rollup({
    input: './src/js/index.js',
    plugins: [ nodeResolve() ]
  })

  /**************************************************************************
   * Compile UMD module.
   *************************************************************************/

  console.log('Compiling UMD module...')

  await bundle.write({
    file: umd,
    format: 'umd',
    name: 'Rivet'
  })

  /**************************************************************************
   * Compile ES module.
   *************************************************************************/

  console.log('Compiling ES module...')

  await bundle.write({
    file: esm,
    format: 'es',
    name: 'Rivet'
  })

  /**************************************************************************
   * Compile IIFE.
   *************************************************************************/

  console.log('Compiling IIFE...')

  await bundle.write({
    file: iife,
    format: 'iife',
    name: 'Rivet',
    plugins: [
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
        allowAllFormats: true
      })
    ]
  })

  /**************************************************************************
   * Compile minified IIFE.
   *************************************************************************/

  console.log('Compiling minified IIFE...')

  await bundle.write({
    file: min,
    format: 'iife',
    name: 'Rivet',
    plugins: [
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
        allowAllFormats: true
      }),
      terser({
        format: {
          comments: false
        }
      })
    ]
  })

  /**************************************************************************
   * Prepend license text to each compiled JS file.
   *************************************************************************/

  jetpack.write(umd, license + jetpack.read(umd))
  jetpack.write(esm, license + jetpack.read(esm))
  jetpack.write(iife, license + jetpack.read(iife))
  jetpack.write(min, license + jetpack.read(min))

}

/******************************************************************************
 * Run compilation function.
 *****************************************************************************/

compile()