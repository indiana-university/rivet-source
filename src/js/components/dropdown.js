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

    // Keeps track of the currently active dropdown and helps with focus management
    this.activeDropdown = null;

    // Bind methods
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);

    this.init();
  }

  open() {
    // Return if disabled dropdown is being opened programmatically
    if (this.toggleElement.hasAttribute('disabled')) {
      return;
    }

    this.toggleElement.setAttribute('aria-expanded', 'true');

    // Remove the 'hidden' attribute to show the menu
    this.menuElement.removeAttribute('hidden');

    this.activeDropdown = this.element;
  }

  close() {
    // Return if disabled dropdown is being closed programmatically
    if (this.toggleElement.hasAttribute('disabled')) {
      return;
    }

    this.toggleElement.setAttribute('aria-expanded', 'false');

    this.menuElement.setAttribute('hidden', '');
  }

  /**
   * Creates an object of menu items within a dropdown
   * @param {HTMLDivElement} menu - a div containing the dropdown menu items
   * @returns {Object} An object of menu item anchor elements
   */
  _setUpMenu(menu) {
    const menuObject = {};

    // Create a real Array of all the focusable elements in the menu
    const menuFocusables = Array.prototype.slice.call(
      menu.querySelectorAll(this.focusableElements)
    );

    // Create a property to hold an array of all focusables
    menuObject.all = menuFocusables;

    // Create a property with a reference to the first focusable
    menuObject.first = menuFocusables[0];

    // Create a property with a reference to the last focusable
    menuObject.last = menuFocusables[menuFocusables.length - 1];

    return menuObject;
  }

  _handleClick(event) {
    const dropdown = event.target.closest(this.dropdownAttribute);

    // If click didn't come from within dropdown component, close all open menus
    if (!dropdown) {
      this.close();
      return;
    }

    const toggleButton = dropdown.querySelector(this.toggleAttribute);
    const menuList = dropdown.querySelector(this.menuAttribute);

    // Delegate event to only this instance of the dropdown
    if (dropdown === this.element) {
      const menuTarget = event.target.closest(this.menuAttribute);

      // Use this boolean on the event object in place of stopPropagation()
      if (menuTarget && menuTarget !== null) {
        event.clickedWithinMenu = true;
      }

      if (!toggleButton || toggleButton.getAttribute('aria-expanded') === 'true') {
        /**
         * Close the menu if there is a click outside of the menu, but within 
         * the dropdown component
         */
        if (!event.clickedWithinMenu) {
          this.close(toggleButton, menuList);
        }

        return;
      }
  
      this.open(toggleButton, menuList);
    } else {
      this.close();
    }
  }

  _handleKeydown(event) {
    const dropdown = event.target.closest(this.dropdownAttribute);

    if (!dropdown) return;

    const toggleButton = dropdown.querySelector(this.toggleAttribute);
    const menuList = dropdown.querySelector(this.menuAttribute);

    // Delegate event to only this instance of the dropdown
    if (dropdown === this.element) {
      switch (event.keyCode) {
        case keyCodes.down: {
          event.preventDefault();

          const toggle = event.target.closest(this.toggleAttribute);

          /**
           * If you were focused on the dropdown toggle
           */
          if (toggle && toggle !== null) {
            // If you're focused on the toggle button and the menu is open.
            if (toggle.getAttribute('aria-expanded') === 'true') {
              const currentMenu = this._setUpMenu(this.menuElement);
  
              currentMenu.first.focus();
            }
  
            this.open(toggleButton, menuList);
          }

          /**
           * Handle down arrow key when inside the open menu.
           */

          if (event.target.closest(this.menuAttribute) !== null) {
            const currentMenu = this._setUpMenu(this.menuElement);

            let currentIndex;

            /**
             * This keeps track of which button/focusable is focused in the open menu
             */
            for (let i = 0; i < currentMenu.all.length; i++) {
              if (event.target == currentMenu.all[i]) {
                currentIndex = i;
              }
            }

            const nextItem = currentMenu.all[currentIndex + 1];

            if (!nextItem) {
              currentMenu.first.focus();

              return;
            }

            nextItem.focus();
          }
  
          break;
        }
  
        case keyCodes.up: {
          event.preventDefault();

          /**
           * Handle up arrow key when inside the open menu.
           */
          if (event.target.closest(this.menuAttribute) !== null) {
            const currentMenu = this._setUpMenu(this.menuElement);

            let currentIndex;

            /**
             * This keeps track of which button/focusable is focused in the open menu
             */
            for (let i = 0; i < currentMenu.all.length; i++) {
              if (event.target == currentMenu.all[i]) {
                currentIndex = i;
              }
            }

            const previousItem = currentMenu.all[currentIndex - 1];

            if (!previousItem && currentMenu.last !== undefined) {
              currentMenu.last.focus();

              return;
            }

            previousItem.focus();
          }
  
          break;
        }
  
        case keyCodes.escape: {
          // If there's an open menu, close it.
          if (this.activeDropdown) {
            this.close(this.toggleElement, this.menuElement);
          }

          if (this.toggleElement && this.toggleElement !== null) {
            this.toggleElement.focus();
          }

          /**
           * Resets the state variables so as not to interfere with other
           * Escape key handlers/interactions
           */
          this.activeDropdown = null;

          break;
        }
  
        case keyCodes.tab: {
          /**
           * Handle tab key when inside the open menu.
           */
          if (event.target.closest(this.menuAttribute) !== null) {
            const currentMenu = this._setUpMenu(this.menuElement);

            // Close the dropdown when the user tabs out of the menu.
            if (document.activeElement == currentMenu.last && !event.shiftKey) {
              this.close(this.toggleElement, this.menuElement);

              return;
            }
          }

          break;
        }
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