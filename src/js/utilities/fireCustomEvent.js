/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 *
 * @param {HTMLElement} element
 * An HTML Element used to emmit the event from
 * @param {String} attributeId
 * A data attribute with a unique value
 * @param {String} eventName
 * A unique name for the custom event
 */
// eslint-disable-next-line no-unused-vars
var fireCustomEvent = function (element, attributeId, eventName) {
  var event = new CustomEvent(eventName, {
    bubbles: true,
    detail: {
      name: function () {
        return element.getAttribute(attributeId);
      }
    }
  });

  // Distpatch the event
  element.dispatchEvent(event);
}
