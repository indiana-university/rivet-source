/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export default class Sidenav {
  constructor(element, options) {
    const defaultOptions = {
      openAllOnInit: false
    };

    const settings = {
      ...defaultOptions,
      ...options
    };

    this.element = element;
    this.openAllOnInit = settings.openAllOnInit;

    // get DOM selectors
    this.childMenus = this.element.querySelectorAll('[data-sidenav-list]');
    this.menuToggles = this.element.querySelectorAll('[data-sidenav-toggle]');

    // bind methods
    this._handleClick = this._handleClick.bind(this);

    this.init();
  }

  _handleClick(event) {
    const toggleButton = event.target.closest('[data-sidenav-toggle]');
    // Exit if toggle button doesn't exist
    if (!toggleButton) return;
    
    const toggleId = toggleButton.dataset.sidenavToggle;
    const targetList = this.element.querySelector(`[data-sidenav-list="${toggleId}"]`);

    // Exit if the target list isn't linked with a button
    if (!targetList || targetList.getAttribute('data-sidenav-list') === '') {
      return;
    }

    targetList.hasAttribute('hidden') ?
      this.open(toggleButton, targetList) :
      this.close(toggleButton, targetList);
  }

  _createFoldEvent(eventName, toggleButton) {
    const newEvent = new CustomEvent(`rvt:${eventName}`, {
      bubbles: true,
      cancelable: true,
      detail: {
        foldValue: toggleButton.getAttribute('data-sidenav-toggle')
      }
    });

    const eventShouldFire = toggleButton.dispatchEvent(newEvent);

    if (!eventShouldFire) return;
  }

  open(toggleButton, targetList) {
    this._createFoldEvent('sidenavFoldOpen', toggleButton);

    toggleButton.setAttribute('aria-expanded', 'true');
    targetList.removeAttribute('hidden');
  }

  close(toggleButton, targetList) {
    this._createFoldEvent('sidenavFoldClose', toggleButton);

    toggleButton.setAttribute('aria-expanded', 'false');
    targetList.setAttribute('hidden', '');
  }

  destroy() {
    // this.element.removeEventListener('click', event => this._handleClick(event), false);
    this.element.removeEventListener('click', this._handleClick, false);
  }

  init() { 
    // Handle open/closed folds on load
    if (this.openAllOnInit === false) {
      this.menuToggles.forEach(function(menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      });

      this.childMenus.forEach(function(childMenu) {
        childMenu.setAttribute('hidden', '');
      });
    }
    
    // Add click handlers
    // this.element.addEventListener('click', event => this._handleClick(event), false);
    this.element.addEventListener('click', this._handleClick, false);
  }
}