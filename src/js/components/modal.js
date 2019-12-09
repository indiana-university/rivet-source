/**
* Copyright (C) 2018 The Trustees of Indiana University
* SPDX-License-Identifier: BSD-3-Clause
*/
import dispatchCustomEvent from '../utilities/dispatchCustomEvent';
import { isNode, nodeListToArray } from '../utilities/domHelpers';

export default class Modal {
  constructor(element, options) {
    const defaultOptions = {
      openOnInit: false
    };

    const settings = {
      ...defaultOptions,
      ...options
    };

    // Instance properties
    this.element = element;
    this.openOnInit = settings.openOnInit;
    this.modalDataValue = this.element.getAttribute('data-modal');
    this.openAttribute = 'data-modal-trigger';
    this.openSelector = `[${this.openAttribute}]`;
    this.openButton = document.querySelector(`[${this.openAttribute}="${this.modalDataValue}"]`);
    this.closeAttribute = 'data-modal-close';
    this.closeSelector = `[${this.closeAttribute}]`;
    this.closeButtons = nodeListToArray(
      this.element.querySelectorAll(this.closeSelector)
    );


    // bind methods
    this._handleClick = this._handleClick.bind(this);

    // Check to make sure that a DOM element was passed in for initialization
    if (!isNode(this.element)) {
      throw new TypeError(
        'A DOM element should be passed as the first argument to initialize the modal.'
      );
    }

    this.init();
  }

  _handleClick(event) {
    let triggerSelectors = this.openSelector + ', ' + this.closeSelector;
    const trigger = event.target.closest(triggerSelectors);
    // Exit if trigger button doesn't exist
    console.log(this.closeButtons);
    if (!trigger) return;

    const triggerContent = trigger.getAttribute(this.openAttribute) || (trigger.getAttribute(this.closeAttribute) && trigger.getAttribute(this.closeAttribute) !== 'close' ? trigger.getAttribute(this.closeAttribute) : false);
    // Exit if trigger doesn't contain the open or close button
    if (!triggerContent) return;

    trigger.hasAttribute(this.openAttribute) ? this.open() : this.close();
  }
  open(callback) {
    /**
  * Custom event for opening the modal.
  */
    const openEvent = dispatchCustomEvent(
      'modalOpen',
      this.element,
      {
        id: this.element.dataset.modal
      }
    );

    if (!openEvent) return;

    this.element.setAttribute('aria-hidden', 'false');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  close(callback) {
    /**
  * Custom event for closing the modal.
  */
    const closeEvent = dispatchCustomEvent(
      'modalClose',
      this.element,
      {
        id: this.element.dataset.modal
      }
    );

    if (!closeEvent) return;

    this.element.setAttribute('aria-hidden', 'true');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  init() {
    if (!this.openOnInit) {
      this.element.setAttribute('aria-hidden', 'true');
    }

    // Add click handlers
    this.openButton.addEventListener('click', this._handleClick, false);
    this.closeButtons.forEach(closeButton => closeButton.addEventListener('click', this._handleClick, false));
  }

  destroy() {
    this.openButton.removeEventListener('click', this._handleClick, false);
    this.closeButtons.forEach(closeButton => closeButton.removeEventListener('click', this._handleClick, false));
  }

}