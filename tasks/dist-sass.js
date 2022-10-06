/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const jetpack = require('fs-jetpack')

/******************************************************************************
 * Copy raw Sass files to distribution folder.
 *****************************************************************************/

console.log('Copying Sass files to distribution folder...')

jetpack.copy('./src/sass', './sass', { 
  overwrite: true,
  matching: '*.scss'
})