/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { nodeListToArray } from '../utilities/domHelpers';

export default class Alert {

  constructor(element) {

    // Instance properties
    this.element = element;
    this.elementArray = nodeListToArray(this.element);
    this.closeAttribute = ['data-alert-close'];
    this.closeSelector = `[${this.closeAttribute}]`;
    this.ariaAttribute = ['aria-labelledby'];
    this.ariaSelector = `[${this.ariaAttribute}]`;

    // bind methods
    this._handleClick = this._handleClick.bind(this);

    // Check to make sure that a DOM element was passed in for initialization
    if (!(this.element instanceof NodeList)) {
      throw new TypeError(
        'A DOM element should be passed as the first argument to initialize the alert'
      );
    }

    this.init();
  }

  _handleClick(event) {
    const dismissAria = event.target.closest(this.ariaSelector);

    // If the target wasn't the Aria element bail.
    if (!dismissAria) {
      throw new Error(
        'Couldn\'t locate the Aria selector for the element.'
      );
    }

    this.dismissAlert(dismissAria);

  }

  dismissAlert(dismissAria) {
    let alert = dismissAria;

    if (!alert) {
      throw new Error(
        'Could not find an alert attached to the close selector to dismiss.'
      );
    }

    alert.remove();
  }

  init() {
    // Add click handlers
    this.elementArray.forEach((item) => {
      let dismissButton = item.querySelector(this.closeSelector);
      dismissButton.addEventListener('click', this._handleClick, false);
    })
  }

  destroy() {
    this.elementArray.forEach((item) => {
      let dismissButton = item.querySelector(this.closeSelector);
      dismissButton.removeEventListener('click', this._handleClick, false);
    })
  }

}