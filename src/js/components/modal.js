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
      openOnInit: false,
      dialog: false
    };

    const settings = {
      ...defaultOptions,
      ...options
    };

    // Instance properties
    this.element = element;

    // Check to make sure that a DOM element was passed in for initialization
    if (!isNode(this.element)) {
      throw new TypeError(
        'A DOM element should be passed as the first argument to initialize the modal.'
      );
    }

    this.openOnInit = settings.openOnInit;
    this.dialog = settings.dialog;
    this.modalAttribute = 'data-modal';
    this.modalSelector = `[${this.modalAttribute}]`;
    this.modalDataValue = this.element.getAttribute('data-modal');
    this.innerModalAttribute = 'data-modal-inner';
    this.innerModalSelector = `[${this.innerModalAttribute}]`;
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

    this.init();
  }

  /**
   * This function is used to handle all click events on
   * the document. It accepts the Event object, checks target to see if it came
   * from within the modal. It then checks to see whether the target matches
   * the open, close, or modal Selector. From there, it determines if the click
   * target attribute value matches the instance's modal-data-value.
   * @param {Event} event
   */
  _handleClick(event) {
    event.target.closest(this.innerModalSelector) !== null ? event.clickedInModal = true : event.clickedInModal = false;

    if (event.clickedInModal) {
      event.stopPropagation();
    }

    // The event trigger should involve the open, close, or modal selector
    let triggerSelectors = `${this.openSelector}, ${this.closeSelector}, ${this.modalSelector}`;
    const trigger = event.target.closest(triggerSelectors);
    // Exit if trigger button doesn't exist
    if (!trigger) return;

    // Set the triggerContent to the value of the trigger open or close attribute. If neither exist, get the nearest modal selector to the event
    let triggerContent;

    if (trigger.getAttribute(this.openAttribute)) {
      triggerContent = trigger.getAttribute(this.openAttribute);
    } else if (trigger.getAttribute(this.closeAttribute)) {
      triggerContent = trigger.getAttribute(this.closeAttribute);
    } else {
      triggerContent = event.target.closest(this.modalSelector);
    }

    // Exit if trigger doesn't contain the open or close button
    if (!triggerContent) return;

    switch (trigger != null) {
      // If the trigger has an open attribute
      case trigger.hasAttribute(this.openAttribute): {

        // Check that the data-modal-trigger value matches the instance's data-modal value
        if (trigger.getAttribute(this.openAttribute) !== this.modalDataValue) {
          // If it doesn't match
          this.close();
          // If it doesn't match and is currently closed then bail
          return;
        }

        this.open();

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
      case !event.clickedInModal: {
        // Check that the trigger is not a dialog because the user needs to make a choice to proceed
        if (this.dialog) return;

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

  /**
   * This function is used to trap the backward tab within the active modal,
   * and prevent it from escaping while the modal remains active.
   * @param {Object} first - The first focusable element in the modal
   * @param {Object} last - The last focusable element in the modal
   * @param {Event} event 
   */
  _handleBackwardTab(first, last, event) {
    if (document.activeElement === first || document.activeElement === this.element) {
      event.preventDefault();
      last.focus();
    }
  }

  /**
   * This function is used to trap the forward tab within the active modal,
   * and prevent it from escaping while the modal remains active.
   * @param {Object} first - The first focusable element in the modal
   * @param {Object} last - The last focusable element in the modal
   * @param {Event} event 
   */
  _handleForwardTab(first, last, event) {
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /**
   * This function is used to handle all keydown events on
   * the document. It ignores keydown events which occur outside an active
   * modal. It checks for the use of tabs, then triggers the appropriate
   * tab event handler based on whether it is a backward or forward tab. It
   * also listens for usage of the escape button, which triggers the close
   * method.
   * @param {Event} event
   */
  _handleKeydown(event) {
    // Determine if keydown is occurring within the modal
    const currentModal = event.target.closest(this.modalSelector);
    // If not in the modal, ignore
    if (!currentModal) return;

    switch (event.keyCode) {
      case keyCodes.tab: {

        // Create an array of all the focusable elements within the modal
        const focusList = nodeListToArray(currentModal.querySelectorAll(this.focusElements));
        const firstFocus = focusList[0];
        const finalFocus = focusList[focusList.length - 1];

        // If they shift tab, trigger the backward tab handler, otherwise use the forward tab handler
        event.shiftKey ? this._handleBackwardTab(firstFocus, finalFocus, event) : this._handleForwardTab(firstFocus, finalFocus, event);

        break;
      }
      case keyCodes.escape: {

        // Check that the modal is not a dialog because the user needs to make a choice to proceed
        if (this.dialog) return;

        // Check that the current modal matches the instance's
        if (currentModal.getAttribute(this.modalAttribute) !== this.modalDataValue) return;

        this.close();

        if (this.openButton !== null) this.openButton.focus();

        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * This function is used to open a modal by triggering the modalOpen custom
   * event, setting the modal's hidden to false, and adding the
   * rvt-modal-open class to it. It also allows developers to setup a custom
   * callback function.
   * @param {Function} callback 
   */
  open(callback) {
    // Trigger modalOpen custom event. This event is used to control the process of closing other open modals.
    const openEvent = dispatchCustomEvent(
      'modalOpen',
      this.element,
      {
        id: this.element.dataset.modal,
      }
    );

    if (!openEvent) return;

    this.element.removeAttribute('hidden');
    document.body.classList.add('rvt-modal-open');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  /**
   * This function is used to close a modal by triggering the modalClose custom
   * event, setting the modal's hidden to true, and removing the
   * rvt-modal-open class from it. It also allows developers to setup a custom
   * callback function.
   * @param {Function} callback 
   */
  close(callback) {
    // Trigger modalClose custom event.
    const closeEvent = dispatchCustomEvent(
      'modalClose',
      this.element,
      {
        id: this.element.dataset.modal
      }
    );

    if (!closeEvent) return;

    this.element.setAttribute('hidden', '');
    document.body.classList.remove('rvt-modal-open');

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
      this.element.setAttribute('hidden', '');
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