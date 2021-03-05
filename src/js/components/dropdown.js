/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { nodeListToArray } from '../utilities/domHelpers';
import keyCodes from '../utilities/keyCodes';
import Disclosure from './disclosure';

/**
 * The Dropdown class is a descendant of the Disclosure class with additional
 * functionality needed to model a dropdown menu of options/links navigable
 * using the arrow and tab keys.
 */

export default class Dropdown extends Disclosure {
  constructor(element) {
    super(element, {
      disclosureAttribute: '[data-dropdown]',
      toggleAttribute: '[data-dropdown-toggle]',
      toggleDataProperty: 'dropdownToggle',
      targetAttribute: '[data-dropdown-menu]',
      openEventName: 'dropdownOpen',
      closeEventNane: 'dropdownClose'
    });

    this.focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
  }

  /**
   * Creates an object of menu items within a dropdown
   * @param {HTMLDivElement} menu - a div containing the dropdown menu items
   * @returns {Object} An object of menu item anchor elements
   */
  _setUpMenu(menu) {
    const menuObject = {};

    // Create a real Array of all the focusable elements in the menu
    const menuFocusables = nodeListToArray(
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

  _handleKeydown(event) {

    super._handleKeydown(event);

    if (!this._shouldHandleKeydown(event)) return;

    switch (event.keyCode) {
      case keyCodes.down: {
        /**
         * Open the menu if it hasn't been opened yet.
         * Move the focus to the first item if the menu has been opened.
         */
        if (!this.isOpen) {
          this.open();
        } else {
          const currentMenu = this._setUpMenu(this.targetElement);
          currentMenu.first.focus();
        }

        /**
         * Handle down arrow key when inside the open menu.
         * If the event didn't come from within the menu, then bail.
         */
        if (!this.targetElement.contains(event.target)) break;

        /**
         * This keeps track of which button/focusable is focused in the open menu
         */
        const currentMenu = this._setUpMenu(this.targetElement);
        let currentIndex;

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

        break;
      }

      case keyCodes.up: {
        event.preventDefault();

        /**
         * Handle up arrow key when inside the open menu.
         * If the event didn't come from within the menu, then bail.
         */
        if (!this.targetElement.contains(event.target)) break;

        /**
         * This keeps track of which button/focusable is focused in the open menu
         */
        const currentMenu = this._setUpMenu(this.targetElement);
        let currentIndex;

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

        break;
      }

      case keyCodes.tab: {
        /**
         * Handle tab key when inside the open menu.
         */
        if (!this.targetElement.contains(event.target)) break;

        const currentMenu = this._setUpMenu(this.targetElement);

        // Close the dropdown when the user tabs out of the menu.
        if (document.activeElement == currentMenu.last && !event.shiftKey) {
          this.close();

          return;
        }

        break;
      }
    }
  }
}
