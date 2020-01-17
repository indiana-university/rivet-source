/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import dispatchCustomEvent from '../utilities/dispatchCustomEvent';
import { nodeListToArray, isNode } from '../utilities/domHelpers';

export default class Sidenav {
  constructor(element, options) {
    const defaultOptions = {
      openAllOnInit: false
    };

    const settings = {
      ...defaultOptions,
      ...options
    };

    // Instance properties
    this.element = element;
    this.openAllOnInit = settings.openAllOnInit;
    this.toggleAttribute = 'data-sidenav-toggle',
    this.toggleSelector = `[${this.toggleAttribute}]`
    this.listAttribute = 'data-sidenav-list'
    this.listSelector = `[${this.listAttribute}]`;

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

  _handleClick(event) {
    const toggleButton = event.target.closest(this.toggleSelector);
    // Exit if toggle button doesn't exist
    if (!toggleButton) return;
    
    const toggleId = toggleButton.dataset.sidenavToggle;
    const targetList = this.element.querySelector(
      `[${this.listAttribute}="${toggleId}"]`
    );

    // Exit if the target list isn't linked with a button
    if (!targetList || targetList.getAttribute(this.listAttribute) === '') {
      return;
    }

    targetList.hasAttribute('hidden') ?
      this.open(toggleButton, targetList) :
      this.close(toggleButton, targetList);
  }

  open(toggleButton, targetList) {
    const openEvent = dispatchCustomEvent(
      'sidenavListOpen',
      toggleButton,
      {
        id: toggleButton.dataset.sidenavToggle
      }
    );

    if (!openEvent) return;

    toggleButton.setAttribute('aria-expanded', 'true');
    targetList.removeAttribute('hidden');
  }

  close(toggleButton, targetList) {
    const closeEvent = dispatchCustomEvent(
      'sidenavListClose',
      toggleButton,
      {
        id: toggleButton.dataset.sidenavToggle
      }
    );

    if (!closeEvent) return;

    toggleButton.setAttribute('aria-expanded', 'false');
    targetList.setAttribute('hidden', '');
  }

  init() {
    // Add click handler
    this.element.addEventListener('click', this._handleClick, false);

    // Get all the necessary DOM elements and convert to Arrays.
    const menuToggles = nodeListToArray(
      this.element.querySelectorAll(this.toggleSelector)
    );
    const childMenus = nodeListToArray(
      this.element.querySelectorAll(this.listSelector)
    );

    childMenus.forEach((element) => {
      // Display all child menus if everything is open on init
      if (this.openAllOnInit) {
        element.removeAttribute('hidden');

        return;
      }

      // Hide all child menus
      element.setAttribute('hidden', '');
    });

    menuToggles.forEach((element) => {
      // Since JavaScript is available add popup semantics to toggles
      element.setAttribute('aria-haspopup', 'true');

      // Aria-expand all toggles if everything is open on init
      if (this.openAllOnInit) {
        element.setAttribute('aria-expanded', 'true');

        return;
      }

      // Check if this toggle been manually set to expanded in markup
      if (element.getAttribute('aria-expanded') === 'true') {
        const toggleValue = element.getAttribute('data-sidenav-toggle');
        const list = this.element.querySelector(`[data-sidenav-list="${toggleValue}"]`);

        // Open list matching this toggle
        list.removeAttribute('hidden');
      } else {
        element.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  destroy() {
    this.element.removeEventListener('click', this._handleClick, false);
  }
}