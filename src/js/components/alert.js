/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */
import dispatchCustomEvent from '../utilities/dispatchCustomEvent';
import { isNode } from '../utilities/domHelpers';

export default class Alert {
  constructor(element) {

    // Instance properties
    this.element = element;
    this.closeAttribute = 'data-alert-close';
    this.closeSelector = `[${this.closeAttribute}]`;
    this.closeButton = null;

    // bind methods
    this._handleClick = this._handleClick.bind(this);

    // Check to make sure that a DOM element was passed in for initialization
    if (!isNode(this.element)) {
      throw new TypeError(
        'A DOM element should be passed as the first argument to initialize the alert'
      );
    }

    this.init();
  }

  _handleClick() {
    this.dismiss();
  }
  dismiss() {
    /**
   * Custom event for handling removal of alerts from a page.
   */
    const dismissEvent = dispatchCustomEvent(
      'alertDismiss',
      this.element,
      {
        id: this.element.dataset.alert
      }
    );

    if (!dismissEvent) return;

    this.destroy();
    this.element.remove();
  }

  init() {
    // Add click handlers
    this.closeButton = this.element.querySelector(this.closeSelector);
    this.closeButton.addEventListener('click', this._handleClick, false);
  }

  destroy() {
    this.closeButton.addEventListener('click', this._handleClick, false);
  }

}