/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const StyleDictionary = require('style-dictionary').extend(
  './.tokens.config.js'
)

/******************************************************************************
 * Compile design tokens.
 *****************************************************************************/

console.log('Compiling design tokens...')

StyleDictionary.buildAllPlatforms()