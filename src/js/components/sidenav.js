/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import dispatchCustomEvent from '../utilities/dispatchCustomEvent';
import { nodeListToArray } from '../utilities/domHelpers';

export default class Sidenav {
  constructor(element, options) {
    const defaultOptions = {
      openAllOnInit: false,
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
    // Handle open/closed lists on load
    if (this.openAllOnInit === false) {
      const menuToggles = this.element.querySelectorAll(this.toggleSelector);
      const childMenus = this.element.querySelectorAll(this.listSelector);

      nodeListToArray(menuToggles)
        .forEach(menuToggle => {
          menuToggle.setAttribute('aria-expanded', 'false');
          // Since JavaScript is available add popup semantics to toggles
          menuToggle.setAttribute('aria-haspopup', 'true');
        });

      nodeListToArray(childMenus)
        .forEach(childMenu => childMenu.setAttribute('hidden', ''));
    }

    // Add click handlers
    this.element.addEventListener('click', this._handleClick, false);
  }
  
  destroy() {
    this.element.removeEventListener('click', this._handleClick, false);
  }
}