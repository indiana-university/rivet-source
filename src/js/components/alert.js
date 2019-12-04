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

    // bind methods
    this._handleClick = this._handleClick.bind(this);

    // Check to make sure that a DOM element was passed in for initialization
    if (!isNode(this.element)) {
      throw new TypeError(
        'A DOM element should be passed as the first argument to initialize the sidenav'
      );
    }

    this.init();
  }

  _handleClick() {
    this.dismiss();
  }

  /**
   * Custom event for handling removal of alerts from a page.
   */
  dismiss() {
    const dismissEvent = dispatchCustomEvent(
      'alertDismiss',
      this.element,
      {
        id: this.element.dataset.alert
      }
    );

    if (!dismissEvent) return;

    this.element.remove();
  }

  init() {
    // Add click handlers
    const dismissButton = this.element.querySelector(this.closeSelector);
    dismissButton.addEventListener('click', this._handleClick, false);
  }

  destroy() {
    const dismissButton = this.element.querySelector(this.closeSelector);
    dismissButton.addEventListener('click', this._handleClick, false);
  }

}