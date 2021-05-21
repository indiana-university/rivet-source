const pkg = require('../package.json')

// Create the string for the version number banner.
const bannerText = `/*!
 * ${pkg.name} - @version ${pkg.version}

 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

`

module.exports = bannerText;