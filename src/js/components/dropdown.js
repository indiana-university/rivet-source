/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Component from './component';
import { nodeListToArray } from '../utilities/domHelpers';
import keyCodes from '../utilities/keyCodes';

/**
 * The Dropdown class is a descendant of the Disclosure class with additional
 * functionality needed to model a dropdown menu of options/links navigable
 * using the arrow and tab keys.
 */

export default class Dropdown extends Component {
  static get selector() {
    return '[data-rvt-dropdown]';
  }

  static get methods() {
    return {
      init() {
        console.log('Dropdown::init()');

        this.disclosureAttribute = '[data-rvt-dropdown]';
        this.toggleAttribute = '[data-rvt-dropdown-toggle]';
        this.toggleDataProperty = 'dropdownToggle';
        this.targetAttribute = '[data-rvt-dropdown-menu]';
        this.openEventName = 'dropdownOpen';
        this.closeEventNane = 'dropdownClose';
        this.toggleElement = this.element.querySelector('[data-rvt-dropdown-toggle]');
        this.targetElement = this.element.querySelector('[data-rvt-dropdown-menu]');
        this.isOpen = false;
        this.activeToggle = null;
        this.activeDisclosure = null;
        
        const icon = this.element.querySelector('svg');
        if (icon) {
          icon.setAttribute('focusable', 'false');
        }
        
        Component.bindMethodToDOMElement(this.element, 'open', this.open);
        Component.bindMethodToDOMElement(this.element, 'close', this.close);

        this._handleClick = this._handleClick.bind(this);
        this._handleKeydown = this._handleKeydown.bind(this);

        this.focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
      },

      connected() {
        Component.dispatchComponentAddedEvent(this.element);
        
        document.addEventListener('click', this._handleClick, false);
        document.addEventListener('keydown', this._handleKeydown, false);
      },

      disconnected() {
        console.log('Dropdown::disconnected');

        document.removeEventListener('click', this._handleClick, false);
        document.removeEventListener('keydown', this._handleKeydown, false);
      },

      open() {
        // Return if disabled disclosure is being opened programmatically

        if (this.toggleElement.hasAttribute('disabled')) {
          return;
        }

        // Fire a disclosureOpen event

        const openEvent = Component.dispatchCustomEvent(
          'disclosureOpen',
          this.toggleElement,
          {
            id: this.toggleElement.dataset['toggle']
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
      },

      close() {
        /**
         * If there isn't a currently active disclosure, then bail so close() isn't
         * fired multiple times.
         */
        if (!this.activeToggle) return;

        const closeEvent = Component.dispatchCustomEvent(
          'dropdownClose',
          this.toggleElement,
          {
            id: this.toggleElement.dataset['toggle']
          }
        );

        if (!closeEvent) return;

        this.isOpen = false;
        this.activeToggle.setAttribute('aria-expanded', 'false');
        this.activeDisclosure.setAttribute('hidden', '');

        // Resets the state variables
        this.activeToggle = null;
        this.activeDisclosure = null;
      },

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
      },

      _handleClick(event) {
        const toggle = event.target.closest('[data-rvt-dropdown-toggle]');

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
      },

      _shouldHandleKeydown(event) {
        // If the keydown didn't come from within disclosure component, then bail.
        if (!this.element.contains(event.target)) return false;
    
        // Delegate event to only this instance of the disclosure
        const disclosure = event.target.closest('[data-rvt-dropdown]');
        if (disclosure !== this.element) return false;
    
        return true;
      },

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
  }
}
