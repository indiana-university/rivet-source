/**
* Copyright (C) 2018 The Trustees of Indiana University
* SPDX-License-Identifier: BSD-3-Clause
*/
import dispatchCustomEvent from '../utilities/dispatchCustomEvent';
import { isNode, nodeListToArray } from '../utilities/domHelpers';
import keyCodes from '../utilities/keyCodes';

export default class Modal {
  constructor(element, options) {
    const defaultOptions = {
      openOnInit: false
    };

    const settings = {
      ...defaultOptions,
      ...options
    };

    // Instance properties
    this.element = element;
    this.openOnInit = settings.openOnInit;
    this.modalAttribute = 'data-modal';
    this.modalSelector = `[${this.modalAttribute}]`;
    this.modalDataValue = this.element.getAttribute('data-modal');
    this.innerModalAttribute = 'data-modal-inner';
    this.innerModalSelector = `[${this.innerModalAttribute}]`;
    this.dialogAttribute = 'data-modal-dialog';
    this.openAttribute = 'data-modal-trigger';
    this.openSelector = `[${this.openAttribute}]`;
    this.openButton = document.querySelector(`[${this.openAttribute}="${this.modalDataValue}"]`);
    this.closeAttribute = 'data-modal-close';
    this.closeSelector = `[${this.closeAttribute}]`;
    this.closeButtons = nodeListToArray(
      this.element.querySelectorAll(this.closeSelector)
    );

    // Anything that is focus-able
    this.focusElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="-1"]';

    // bind methods
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);

    // Check to make sure that a DOM element was passed in for initialization
    if (!isNode(this.element)) {
      throw new TypeError(
        'A DOM element should be passed as the first argument to initialize the modal.'
      );
    }

    this.init();
  }

  _handleClick(event) {
    event.target.closest(this.innerModalSelector) !== null ? event.clickedInModal = true : event.clickedInModal = false;

    if (event.clickedInModal) {
      event.stopPropagation();
    }

    let triggerSelectors = this.openSelector + ', ' + this.closeSelector + ', ' + this.modalSelector;
    const trigger = event.target.closest(triggerSelectors);
    // Exit if trigger button doesn't exist
    if (!trigger) return;

    const triggerContent = trigger.getAttribute(this.openAttribute) || (trigger.getAttribute(this.closeAttribute) && trigger.getAttribute(this.closeAttribute) !== 'close' ? trigger.getAttribute(this.closeAttribute) : false) || event.target.closest(this.modalSelector);
    // Exit if trigger doesn't contain the open or close button
    if (!triggerContent) return;

    switch (trigger != null) {
      case trigger.hasAttribute(this.openAttribute): {

        if (trigger.getAttribute(this.openAttribute) !== this.modalDataValue) return;
        this.open();

        this.element.focus();

        break;
      }
      case trigger.hasAttribute(this.closeAttribute): {
        event.preventDefault();

        if (trigger.getAttribute(this.closeAttribute) !== this.modalDataValue) return;
        this.close();

        if (this.openButton !== null) this.openButton.focus();

        break;
      }
      case trigger === triggerContent && !event.clickedInModal: {
        if (trigger.hasAttribute(this.dialogAttribute)) return;

        if (triggerContent.getAttribute(this.modalAttribute) !== this.modalDataValue) return;
        this.close();

        this.openButton.focus();

        break;
      }
      default: {
        return;
      }
    }
  }

  _handleBackwardTab(first, last, event) {
    if (document.activeElement === first || document.activeElement === this.element) {
      event.preventDefault();
      last.focus();
    }
  }

  _handleForwardTab(first, last, event) {
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  _handleKeydown(event) {
    const currentModal = event.target.closest(this.modalSelector);

    if (!currentModal) return;

    switch (event.keyCode) {
      case keyCodes.tab: {

        const focusList = Array.prototype.slice.call(currentModal.querySelectorAll(this.focusElements));
        const firstFocus = focusList[0];
        const finalFocus = focusList[focusList.length - 1];

        event.shiftKey ? this._handleBackwardTab(firstFocus, finalFocus, event) : this._handleForwardTab(firstFocus, finalFocus, event);

        break;
      }
      case keyCodes.escape: {

        if (this.element.hasAttribute(this.dialogAttribute)) return;

        this.close();

        if (this.openButton !== null) this.openButton.focus();

        break;
      }
      default: {
        break;
      }
    }
  }

  open(callback) {
    /**
  * Custom event for opening the modal.
  */
    const openEvent = dispatchCustomEvent(
      'modalOpen',
      this.element,
      {
        id: this.element.dataset.modal
      }
    );

    if (!openEvent) return;

    this.element.setAttribute('aria-hidden', 'false');
    this.element.classList.add('rvt-modal-open');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  close(callback) {
    /**
  * Custom event for closing the modal.
  */
    const closeEvent = dispatchCustomEvent(
      'modalClose',
      this.element,
      {
        id: this.element.dataset.modal
      }
    );

    if (!closeEvent) return;

    this.element.setAttribute('aria-hidden', 'true');
    this.element.classList.remove('rvt-modal-open');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  focusTrigger() {
    if (!this.openButton) {
      throw new Error(`Could not find a modal trigger with the value of ${this.modalDataValue}`);
    }

    this.openButton.focus();
  }

  focusModal() {
    if (!this.element) {
      throw new Error(`Could not find a modal with the value of ${this.modalDataValue}`);
    }

    this.element.focus();
  }

  init() {
    if (!this.openOnInit) {
      this.element.setAttribute('aria-hidden', 'true');
    }

    this.destroy();

    // Add click handlers
    document.addEventListener('click', this._handleClick, false);
    document.addEventListener('keydown', this._handleKeydown, false);
  }

  destroy() {
    document.removeEventListener('click', this._handleClick, false);
    document.removeEventListener('keydown', this._handleKeydown, false);
  }

}