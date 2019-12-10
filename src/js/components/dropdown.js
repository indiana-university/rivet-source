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

    // Keeps track of the currently active dropdown and helps with focus management
    this.activeDropdown = null;

    // Bind methods
    this._handleClick = this._handleClick.bind(this);

    this.init();
  }

  openMenu() {
    // Return if disabled dropdown is being opened programmatically
    if (this.toggleElement.hasAttribute('disabled')) {
      return;
    }

    // If the menu was opened by clicking an associated toggle
    if (this.toggleElement && this.toggleElement !== null) {
      this.toggleElement.setAttribute('aria-expanded', 'true');
    }

    // Remove the 'hidden' attribute to show the menu
    this.menuElement.setAttribute('aria-hidden', 'false');
  }

  closeMenu() {
    // Return if disabled dropdown is being closed programmatically
    if (this.toggleElement.hasAttribute('disabled')) {
      return;
    }

    if (this.toggleElement && this.toggleElement !== undefined) {
      this.toggleElement.setAttribute('aria-expanded', 'false');
    }

    this.menuElement.setAttribute('aria-hidden', 'true');
  }

  _setUpMenu() {

  }

  _handleClick(event) {
    const menu = event.target.closest(this.menuAttribute);

    // Use this boolean on the event object in place of stopPropagation()
    if (menu && menu !== null) {
      event.clickedWithinMenu = true;
    }

    if (!this.toggleElement || this.toggleElement.getAttribute('aria-expanded') === 'true') {
      /**
       * Otherwise close the currently open menu unless the click
       * happened inside of it.
       */
      if (!event.clickedWithinMenu) {
        this.closeMenu();
      }

      return;
    }

    const dropdownId = this.element;

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