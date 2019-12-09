/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export default class Dropdown {
  constructor(element) {
    this.element = element;
    this.focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
    this.toggleAttribute = '[data-dropdown-toggle]';
    this.menuSelector = '[data-dropdown-menu]';

    // Bind methods
    this._handleClick = this._handleClick.bind(this);

    this.init();
  }

  openMenu() {

  }

  closeMenu() {

  }

  toggle() {

  }

  _setUpMenu() {

  }

  _handleClick() {

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