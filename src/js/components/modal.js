/**
* Copyright (C) 2018 The Trustees of Indiana University
* SPDX-License-Identifier: BSD-3-Clause
*/
import dispatchCustomEvent from '../utilities/dispatchCustomEvent';
import { isNode } from '../utilities/domHelpers';
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

    // Anything that is focus-able
    this.focusElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="-1"]';

    // bind methods
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleBackwardTab = this._handleBackwardTab.bind(this);
    this._handleForwardTab = this._handleForwardTab.bind(this);
    this._handleOpenEvent = this._handleOpenEvent.bind(this);

    // Check to make sure that a DOM element was passed in for initialization
    if (!isNode(this.element)) {
      throw new TypeError(
        'A DOM element should be passed as the first argument to initialize the modal.'
      );
    }

    this.init();
  }

  /**
   * 
   * @param {Event} event - This function is used to handle all click events on
   * the document. It accepts the Event object, checks target to see if it came
   * from within the modal. It then checks to see whether the target matches
   * the open, close, or modal Selector. From there, it determines if the click
   * target attribute value matches the instance's modal-data-value.
   */
  _handleClick(event) {
    event.target.closest(this.innerModalSelector) !== null ? event.clickedInModal = true : event.clickedInModal = false;

    if (event.clickedInModal) {
      event.stopPropagation();
    }

    // The event trigger should involve the open, close, or modal selector
    let triggerSelectors = this.openSelector + ', ' + this.closeSelector + ', ' + this.modalSelector;
    const trigger = event.target.closest(triggerSelectors);
    // Exit if trigger button doesn't exist
    if (!trigger) return;

    // Set the triggerContent to the value of the trigger open or close attribute. If neither exist, get the nearest modal selector to the event
    const triggerContent = trigger.getAttribute(this.openAttribute) || (trigger.getAttribute(this.closeAttribute) && trigger.getAttribute(this.closeAttribute) !== 'close' ? trigger.getAttribute(this.closeAttribute) : false) || event.target.closest(this.modalSelector);
    // Exit if trigger doesn't contain the open or close button
    if (!triggerContent) return;

    switch (trigger != null) {
      // If the trigger has an open attribute
      case trigger.hasAttribute(this.openAttribute): {

        // Check that the data-modal-trigger value matches the instance's data-modal value
        if (trigger.getAttribute(this.openAttribute) !== this.modalDataValue) return;

        this.open(this.element);

        this.element.focus();

        break;
      }
      // If the trigger has a close attribute
      case trigger.hasAttribute(this.closeAttribute): {
        event.preventDefault();

        // Check that the data-modal-close value matches the instance's data-modal value
        if (trigger.getAttribute(this.closeAttribute) !== this.modalDataValue) return;
        this.close();

        if (this.openButton !== null) this.openButton.focus();

        break;
      }
      // If the trigger was clicking outside of the modal
      case trigger === triggerContent && !event.clickedInModal: {
        // Check that the trigger is not a dialog because the user needs to make a choice to proceed
        if (trigger.hasAttribute(this.dialogAttribute)) return;

        // Check that the trigger content data-modal value matches the instance's data-modal value
        if (triggerContent.getAttribute(this.modalAttribute) !== this.modalDataValue) return;
        this.close();

        if (this.openButton !== null) this.openButton.focus();

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

  _handleOpenEvent(event) {
    const currentModal = event.detail.id;

    // If a modal opens, close any open modals
    if (currentModal !== this.element && this.element.getAttribute('aria-hidden') === 'false') {
      this.close();
    } else {
      return;
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
        bubbles: true,
        id: this.element.dataset.modal,
        element: this.element
      }
    );

    if (!openEvent) return;

    this.element.setAttribute('aria-hidden', 'false');
    this.element.classList.add('rvt-modal-open');


    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  close(modal, callback) {
    /**
  * Custom event for closing the modal.
  */
    const closeEvent = dispatchCustomEvent(
      'modalClose',
      this.element,
      {
        bubbles: true,
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
    document.addEventListener('rvt:modalOpen', this._handleOpenEvent, false);
  }

  destroy() {
    document.removeEventListener('click', this._handleClick, false);
    document.removeEventListener('keydown', this._handleKeydown, false);
    document.removeEventListener('rvt:modalOpen', this._handleOpenEvent, false);
  }

}