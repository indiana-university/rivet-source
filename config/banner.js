const package = require('../package.json');

// Create the string for the verion number banner.
var bannerText = `/*!
 * ${package.name} - @version ${package.version}

 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

`;

module.exports = bannerText
