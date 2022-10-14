/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const pkg = require('../package.json')

/******************************************************************************
 * Define license text to be prepended to CSS and JS source files.
 *****************************************************************************/

const license = `/*!
 * ${pkg.name} - @version ${pkg.version}
 *
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */
`

/******************************************************************************
 * Export.
 *****************************************************************************/

module.exports = license;