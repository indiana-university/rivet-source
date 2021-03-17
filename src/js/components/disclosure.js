/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import dispatchCustomEvent from '../utilities/dispatchCustomEvent';
import keyCodes from '../utilities/keyCodes';

/**
 * The Disclosure class models an interactive page element that can be used
 * to hide/show another related page element, such as a button that hides or
 * shows a navigation drawer.
 */

export default class Disclosure {
  constructor(element, options) {
    // more parameters than i'd like but we have to maintain backwards
    // compatibility for v1.x.x. these will be unnecessary in version 2.x.x
    // as we'll be using web components and both Disclosures/disclosures will
    // use a unified set of attributes for handling toggles
    const defaults = {
      disclosureAttribute: '[data-disclosure]',
      toggleAttribute: '[data-disclosure-toggle]',
      toggleDataProperty: 'toggle',
      targetAttribute: '[data-disclosure-target]',
      openEventName: 'disclosureOpen',
      closeEventName: 'disclosureClose'
    };

    options = Object.assign(defaults, options);

    this.element = element;
    this.disclosureAttribute = options.disclosureAttribute;
    this.toggleAttribute = options.toggleAttribute;
    this.toggleDataProperty = options.toggleDataProperty;
    this.targetAttribute = options.targetAttribute;
    this.openEventName = options.openEventName;
    this.closeEventName = options.closeEventName;
    this.toggleElement = this.element.querySelector(this.toggleAttribute);
    this.targetElement = this.element.querySelector(this.targetAttribute);

    // Keeps track of the currently active disclosure
    this.isOpen = false;
    this.activeToggle = null;
    this.activeDisclosure = null;

    // Bind methods
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);

    // Make sure icons don't receive focus
    const icon = this.element.querySelector('svg');
    if (icon) {
      icon.setAttribute('focusable', 'false');
    }

    this.init();
  }

  open() {
    // Return if disabled disclosure is being opened programmatically

    if (this.toggleElement.hasAttribute('disabled')) {
      return;
    }

    // Fire a disclosureOpen event

    const openEvent = dispatchCustomEvent(
      this.openEventName,
      this.toggleElement,
      {
        id: this.toggleElement.dataset[this.toggleDataProperty]
      }
    );

    // Bail if the event was suppressed

    if (!openEvent) return;

    // Set the disclosure's open state to "true"

    this.isOpen = true;
    this.toggleElement.setAttribute('aria-expanded', 'true');

    // Remove the 'hidden' attribute to show the element to disclose

    this.targetElement.removeAttribute('hidden');

    // Set currently active toggle and disclosed element

    this.activeToggle = this.toggleElement;
    this.activeDisclosure = this.targetElement;
  }

  close() {
    /**
     * If there isn't a currently active disclosure, then bail so close() isn't
     * fired multiple times.
     */
    if (!this.activeToggle) return;

    const closeEvent = dispatchCustomEvent(
      this.closeEventName,
      this.toggleElement,
      {
        id: this.toggleElement.dataset[this.toggleDataProperty]
      }
    );

    if (!closeEvent) return;

    this.isOpen = false;

    this.activeToggle.setAttribute('aria-expanded', 'false');
    this.activeDisclosure.setAttribute('hidden', '');

    // Resets the state variables
    this.activeToggle = null;
    this.activeDisclosure = null;
  }

  _handleClick(event) {
    const toggle = event.target.closest(this.toggleAttribute);

    // Did it come from inside open disclosure?
    if (this.targetElement.contains(event.target)) return;

    // If it came from outside component, close all open disclosures
    if (!toggle && this.activeToggle !== null) {
      this.close();
      return;
    }

    // Check which toggle the click came from, and whether it's already opened
    if (toggle !== this.toggleElement || this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  _shouldHandleKeydown(event) {
    // If the keydown didn't come from within disclosure component, then bail.
    if (!this.element.contains(event.target)) return false;

    // Delegate event to only this instance of the disclosure
    const disclosure = event.target.closest(this.disclosureAttribute);
    if (disclosure !== this.element) return false;

    return true;
  }

  _handleKeydown(event) {
    if (!this._shouldHandleKeydown(event)) return;

    switch (event.keyCode) {
      case keyCodes.escape: {
        if (!this.activeToggle) return;

        // If there's an open disclosure, close it.
        this.close();

        this.toggleElement.focus();

        /**
         * Resets the state variables so as not to interfere with other
         * Escape key handlers/interactions
         */
        this.activeToggle = null;

        break;
      }
    }
  }

  init() {
    document.addEventListener('click', this._handleClick, false);
    document.addEventListener('keydown', this._handleKeydown, false);
  }

  destroy() {
    document.removeEventListener('click', this._handleClick, false);
    document.removeEventListener('keydown', this._handleKeydown, false);
  }
}
