/**
 * Copyright (C) 2019 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Converts a NodeList (Array-like) to a real Array so that you
 * can safely (IE11) use all Array methods (.map, .filter, etc.) on
 * collections of DOM nodes.
 * @param {HTMLCollection} nodes - NodeList to be converted
 * @returns {Array} An array of DOM elements
 */
export const nodeListToArray = nodes => Array.prototype.slice.call(nodes);