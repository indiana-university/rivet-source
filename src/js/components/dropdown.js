/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import keyCodes from '../utilities/keyCodes';

export default class Dropdown {
  constructor(element) {
    this.element = element;
    this.focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

    this.dropdownAttribute = '[data-dropdown]';

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

  openMenu(toggle, menu) {
    const toggleButton = toggle || this.toggleElement;
    const menuList = menu || this.menuElement;

    // Return if disabled dropdown is being opened programmatically
    if (toggleButton.hasAttribute('disabled')) {
      return;
    }

    // If the menu was opened by clicking an associated toggle
    if (toggleButton && toggleButton !== null) {
      toggleButton.setAttribute('aria-expanded', 'true');
    }

    // Remove the 'hidden' attribute to show the menu
    menuList.setAttribute('aria-hidden', 'false');
  }

  closeMenu(toggle, menu) {
    const toggleButton = toggle || this.toggleElement;
    const menuList = menu || this.menuElement;

    // Return if disabled dropdown is being closed programmatically
    if (toggleButton.hasAttribute('disabled')) {
      return;
    }

    if (toggleButton && toggleButton !== undefined) {
      toggleButton.setAttribute('aria-expanded', 'false');
    }

    menuList.setAttribute('aria-hidden', 'true');
  }

  _setUpMenu() {

  }

  _handleClick(event) {
    const dropdown = event.target.closest(this.dropdownAttribute);
    if (!dropdown) return;

    // Delegate event to only this instance of the dropdown
    if (dropdown === this.element) {
      const menuTarget = event.target.closest(this.menuAttribute);

      // Use this boolean on the event object in place of stopPropagation()
      if (menuTarget && menuTarget !== null) {
        event.clickedWithinMenu = true;
      }
  
      const toggleButton = dropdown.querySelector(this.toggleAttribute);
      const menuList = dropdown.querySelector(this.menuAttribute);
  
      if (!toggleButton || toggleButton.getAttribute('aria-expanded') === 'true') {
        /**
         * Otherwise close the currently open menu unless the click
         * happened inside of it.
         */
        if (!event.clickedWithinMenu) {
          this.closeMenu(toggleButton, menuList);
        }
  
        return;
      }
  
      this.openMenu(toggleButton, menuList);
    }
  }

  _handleKeydown() {

  }

  init() {
    document.addEventListener('click', this._handleClick, false);
  }

  destroy() {
    document.removeEventListener('click', this._handleClick, false);
  }
}