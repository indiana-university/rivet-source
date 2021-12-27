/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

/******************************************************************************
 * ChildNode.remove() polyfill
 *
 * @see https://go.iu.edu/4fto
 *****************************************************************************/

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) { return }

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove () {
        if (this.parentNode === null) { return }

        this.parentNode.removeChild(this)
      }
    })
  })
})([Element.prototype, CharacterData.prototype, DocumentType.prototype])
