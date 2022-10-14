/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const jetpack = require('fs-jetpack')

/******************************************************************************
 * Copy starter file to distribution folder as index.html.
 *****************************************************************************/

console.log('Copying starter file to distribution folder...')

jetpack.copy('./src/components/_extras/_index-example.html', './index.html', { overwrite: true })