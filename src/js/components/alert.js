/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

// eslint-disable-next-line no-unused-vars
var Alert = (function() {
  'use strict';

  // Selectors
  var SELECTORS = '[data-alert-close]';

  /**
   * Kicks off the Alert component and sets up all event listeners
   *
   * @param {HTMLElement} context - An optional DOM element that the
   * alert can be initialized on. All event listeners will be attached
   * to this element. Usually best to just leave it to default
   * to the document.
   */
  function init(context) {
    // Optional element to bind the event listeners to
    if (context === undefined) {
      context = document;
    }

    // Destroy any currently initialized alerts
    destroy(context);

    document.addEventListener('click', _handleClick, false);
  }

  /**
   * Cleans up any currently initialized Alerts
   *
   * @param {HTMLElement} context - An optional DOM element. This only
   * needs to be passed in if a DOM element was passed to the init()
   * function. If so, the element passed in must be the same element
   * that was passed in at initialization so that the event listeners can
   * be properly removed.
   */
  function destroy(context) {
    if (context === undefined) {
      context = document;
    }

    document.removeEventListener('click', _handleClick, false);
  }

  var _handleClick = function(event) {
    var dismissButton = event.target.closest(SELECTORS);

    // If the target wasn't the dismiss button bail.
    if (!dismissButton) return;

    // Get the parent node of the dsimiss button i.e. the alert container
    var alertThatWasClicked = dismissButton.parentNode;

    dismissAlert(alertThatWasClicked);
  };

  /**
   * Dismisses the alert
   * @param {String} id - A unique string used for the alert's id attribute
   * @param {Function} callback - A function that is executed after alert
   * is closed.
   */
  function dismissAlert(id, callback) {
    var alert = document.querySelector('[aria-labelledby="' + id + '"]');

    if (!alert) {
      alert = document.getElementById(id);
    }

    if (!alert) {
      throw new Error(
        'Could not find an alert with the id of ' + id + ' to dismiss.'
      );
    }

    alert.parentNode.removeChild(alert);

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  return {
    init: init,
    destroy: destroy,
    dismiss: dismissAlert
  };
})();
