/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import keyCodes from '../utilities/keyCodes';

export default class Dropdown {
  constructor(element) {
    this.element = element;
    this.focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

    this.toggleAttribute = '[data-dropdown-toggle]';
    this.toggleElement = this.element.querySelector(this.toggleAttribute);

    this.menuAttribute = '[data-dropdown-menu]';
    this.menuElement = this.element.querySelector(this.menuAttribute);

    // Keyboard Codes
    this.keys = keyCodes;

    // Keeps track of the currently active toggle and helps with focus management
    this.activeToggle = null;
    this.activeMenu = null;

    // Bind methods
    this._handleClick = this._handleClick.bind(this);

    this.init();
  }

  openMenu(id, callback) {
    // If there's an open menu, close it.
    if (this.activeMenu) {
      this.closeMenu(this.activeMenu);
    }

    // Set the current active menu the menu we're about to open
    this.activeMenu = id;

    // Return if disabled dropdown is being opened programmatically
    if (this.toggleElement.hasAttribute('disabled')) {
      return;
    }

    // If the menu was opened by clicking an associated toggle
    if (this.toggleElement && this.toggleElement !== null) {
      this.toggleElement.setAttribute('aria-expanded', 'true');

      this.activeToggle = this.toggleElement;
    }

    // Remove the 'hidden' attribute to show the menu
    this.menuElement.setAttribute('aria-hidden', 'false');

    // Execute supplied callback function if it exists
    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  closeMenu() {

  }

  toggle() {

  }

  _setUpMenu() {

  }

  _handleClick(event) {
    if (!this.toggleElement || this.toggleElement.getAttribute('aria-expanded') === 'true') {
      // No menu has been opened yet and the event target was not a toggle, so bail.
      if (!this.activeMenu) return;

      /**
       * Otherwise close the currently open menu unless the click
       * happened inside of it.
       */
      if (!event.clickedWithinMenu) {
        this.closeMenu(this.activeMenu);
      }

      return;
    }

    var dropdownId = this.toggleElement.getAttribute(this.toggleAttribute);

    this.openMenu(dropdownId);
  }

  _handleKeydown() {

  }

  init() {
    this.element.addEventListener('click', this._handleClick, false);
  }

  destroy() {
    this.element.removeEventListener('click', this._handleClick, false);
  }
}