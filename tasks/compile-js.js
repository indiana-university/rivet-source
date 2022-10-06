/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const license = require('./license')
const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')

/******************************************************************************
 * Define function to compile JS. The function must be async since Rollup
 * bundling methods return a Promise to be awaited.
 *****************************************************************************/

async function compile() {
  try {

    /**************************************************************************
     * Bundle, minify, and add license text to JS files.
     *************************************************************************/

    const bundle = await rollup.rollup({
      input: './src/js/index.js',
      plugins: [
        nodeResolve(),
        terser({
          format: {
            comments: false,
            preamble: license
          }
        })
      ]
    })

    /**************************************************************************
     * Compile UMD module.
     *************************************************************************/

    console.log('Compiling UMD module...')
  
    await bundle.write({
      file: './static/js/rivet-umd.js',
      format: 'umd',
      name: 'Rivet'
    })

    /**************************************************************************
     * Compile IIFE.
     *************************************************************************/

    console.log('Compiling IIFE...')

    await bundle.write({
      file: './static/js/rivet-iife.js',
      format: 'iife',
      name: 'Rivet'
    })

    /**************************************************************************
     * Compile ES module.
     *************************************************************************/

    console.log('Compiling ES module...')

    await bundle.write({
      file: './static/js/rivet-esm.js',
      format: 'es',
      name: 'Rivet'
    })

  } catch (error) {

    /**************************************************************************
     * Throw exception if compilation fails.
     *************************************************************************/

    throw new Error(error)

  }
}

/******************************************************************************
 * Run compilation function.
 *****************************************************************************/

compile()