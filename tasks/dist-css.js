/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const jetpack = require('fs-jetpack')

console.log('Copying compiled CSS files to distribution folder...')

/******************************************************************************
 * Copy non-minified CSS to distribution folder.
 *****************************************************************************/

jetpack.copy('./static/css/rivet.css', './css/rivet.css', { overwrite: true })

/******************************************************************************
 * Copy minified CSS to distribution folder.
 *****************************************************************************/

jetpack.copy('./static/css/rivet.min.css', './css/rivet.min.css', { overwrite: true })