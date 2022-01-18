/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

/******************************************************************************
 * CustomEvent polyfill
 *
 * @see https://go.iu.edu/4ftn
 *****************************************************************************/

(function () {
  if (typeof window.CustomEvent === 'function') { return false }

  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }

    var customEvent = document.createEvent('CustomEvent')

    customEvent.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    )

    return customEvent
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
})()
