/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const jetpack = require('fs-jetpack')
const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')

/******************************************************************************
 * Watch for changes to the JS. Used in development only.
 *****************************************************************************/

console.log('Watching for changes to JS...')

const watcher = rollup.watch({
  input: './src/js/index.js',
  plugins: [ nodeResolve() ],
  output: {
    file: './static/js/rivet-iife.js',
    format: 'iife',
    name: 'Rivet',
    plugins: [
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
        allowAllFormats: true
      })
    ]
  }
})

/******************************************************************************
 * Copy rebuilt IIFE to distribution folder.
 *****************************************************************************/

watcher.on('event', (event) => {
  if (event.code === 'BUNDLE_END') {
    console.log('Change detected to JS, rebuilding...')
    jetpack.copy('./static/js/rivet-iife.js', './js/rivet-iife.js', { overwrite: true })
  }
})