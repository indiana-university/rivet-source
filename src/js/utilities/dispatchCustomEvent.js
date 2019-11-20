/**
 * Copyright (C) 2019 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Helper for creating and dispatching a CustomEvent.
 * @param {String} eventName The name of the event to emit
 * @param {HTMLElement} element The element from which the event should
 * be emitted.
 * @param {Object} detail An object with properties that should be included
 * in the event's detail object.
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail
 * @returns {Boolean} Will return false if the event was cancelled using
 * event.preventDefault().
 */
function dispatchCustomEvent(eventName, element, detail) {
  const newEvent = new CustomEvent(`rvt:${eventName}`, {
    bubbles: true,
    cancelable: true,
    detail
  });

  const eventShouldFire = element.dispatchEvent(newEvent);
  return eventShouldFire;
}

export default dispatchCustomEvent;