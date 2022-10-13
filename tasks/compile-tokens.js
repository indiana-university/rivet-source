/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const StyleDictionary = require('style-dictionary').extend(
  './.tokens.config.js'
)

/******************************************************************************
 * Determine if the current build environment is "production".
 *****************************************************************************/

const isProduction = process.argv[2] === '--production'

/******************************************************************************
 * Compile design tokens.
 *****************************************************************************/

console.log('Compiling design tokens...')

isProduction
  ? StyleDictionary.buildAllPlatforms()
  : StyleDictionary.buildPlatform('src/sass/core')