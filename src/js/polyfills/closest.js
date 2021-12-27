/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

/******************************************************************************
 * Element.matches() polyfill
 *****************************************************************************/

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
                              Element.prototype.webkitMatchesSelector
}

/******************************************************************************
 * Element.closest() polyfill
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 *****************************************************************************/

if (!Element.prototype.closest) {
  Element.prototype.closest = function (selector) {
    var el = this
    var ancestor = this

    if (!document.documentElement.contains(el)) { return null }

    do {
      if (ancestor.matches(selector)) { return ancestor }

      ancestor = ancestor.parentElement
    } while (ancestor !== null)

    return null
  }
}
