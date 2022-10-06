/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const jetpack = require('fs-jetpack')

console.log('Copying compiled JS files to distribution folder...')

/******************************************************************************
 * Copy UMD module to distribution folder.
 *****************************************************************************/

jetpack.copy('./static/js/rivet-umd.js', './js/rivet-umd.js', { overwrite: true })

/******************************************************************************
 * Copy ES module to distribution folder.
 *****************************************************************************/

jetpack.copy('./static/js/rivet-esm.js', './js/rivet-esm.js', { overwrite: true })

/******************************************************************************
 * Copy IIFE to distribution folder.
 *****************************************************************************/

jetpack.copy('./static/js/rivet-iife.js', './js/rivet-iife.js', { overwrite: true })

/******************************************************************************
 * Copy IIFE to distribution folder as rivet.min.js.
 *****************************************************************************/

jetpack.copy('./static/js/rivet-iife.js', './js/rivet.min.js', { overwrite: true })