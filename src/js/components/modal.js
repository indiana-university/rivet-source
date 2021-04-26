/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

// eslint-disable-next-line no-unused-vars
var Modal = (function() {
  'use strict';

  var KEYS = {
    tab: 9,
    escape: 27
  };

  // Selectors
  var TRIGGER_SELECTOR = '[data-modal-trigger]';
  var TRIGGER_ATTR = 'data-modal-trigger';
  var CLOSE_ATTR = 'data-modal-close';
  var CLOSE_SELECTOR = '[data-modal-close]';
  var MODAL_SELECTOR = '.rvt-modal, .modal';

  // Anything that is focus-able
  var ALL_FOCUSABLE_ELS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="-1"]';

  /**
   * These variables are used to keep track of currently active/open modals.
   * They are available in the root scope of the Modal closure so that
   * all of the Modal's methods have access to them.
   *
   * TODO: This probably isn't the best solutions as it makes most of the
   * Modal methods impure. I would be interested in how we might get rid
   * of the need for these global (to the Modal) variables.
   */
  var activeTrigger;
  var activeModal;

  /**
   * @param {String} id - A unique string used for a modal's id and/or
   * data-modal-trigger attribute.
   */
  function _createModalObject(id) {
    var modal = {};

    modal.trigger =
      document.querySelector('[' + TRIGGER_ATTR + '="' + id + '"]');

    modal.body = document.getElementById(id);

    return modal.trigger && modal.body ? modal : null;
  }

  /**
   * Opens the modal
   * @param {String} id - A unique string used for the modal's id attribute
   * @param {Function} callback - A function that is executed after modal
   * is opened.
   */
  function open(id, callback) {
    /**
     * DEPRECATED: This is to add backwards compatibility for the older API
     * where you needed to pass in the modal Object/HTMLElement. This should
     * be deprecated in the next major version.
     */
    if (typeof id === 'object' && id.nodeType === 1) {
      id = id.getAttribute('id');

      if (!id) {
        throw new Error('Please proved an id attribute for the modal you want to open.');
      }
    }
    /**
     * END DEPRECATION
     */

    var modal = _createModalObject(id);

    if (!modal) return;

    if (!modal.body) {
      throw new Error('Could not find a modal with the id of ' + id + ' to open.');
    }

    activeModal = modal.body;

    activeTrigger = modal.trigger;

    modal.body.setAttribute('aria-hidden', 'false');

    // Sets a class on the body to handle overflow and scroll.
    document.body.classList.add('rvt-modal-open');

    /**
     * Emit a custom 'modalOpen' event and send along the modal's
     * id attribute in the event.detail.name()
     */
    // eslint-disable-next-line no-undef
    fireCustomEvent(activeModal, 'id', 'modalOpen');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  /**
   * Closes the modal
   * @param {String} id - A unique string used for the modal's id attribute
   * @param {Function} callback - A function that is executed after modal is closed.
   */
  function close(id, callback) {
    /**
     * DEPRECATED: This is to add backwards compatibility for the older API
     * where you needed to pass in the modal Object/HTMLElement. This should
     * be deprecated in the next major version.
     */
    if (typeof id === 'object' && id.nodeType === 1) {
      id = id.getAttribute('id');

      if (!id) {
        throw new Error('Please proved an id attribute for the modal you want to close.');
      }
    }
    /**
     * END DEPRECATION
     */

    var modal = _createModalObject(id);

    if (!modal) return;

    if (!modal.body) {
      throw new Error('Could not find a modal with the id of ' + id + ' to close.');
    }

    modal.body.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('rvt-modal-open');
    
    /**
     * Emit a custom 'modalClose' event and send along the modal's
     * id attribute in the event.detail.name()
     */
    // eslint-disable-next-line no-undef
    fireCustomEvent(activeModal, 'id', 'modalClose');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  /**
   * Focuses the currently active modal trigger if it exists. This is a
   * Helper function that can be used in the callback of the close() method
   * to move focus back to corresponding trigger if needed.
   * @param {String} id - A unique string that is used for the modal
   * trigger's data-modal-trigger attribute.
   */
  function focusTrigger(id) {
    var trigger =
      document.querySelector('[data-modal-trigger="' + id + '"');

    if (!trigger) {
      throw new Error('Could not find a modal trigger with the id of ' + id);
    }

    activeTrigger = trigger;

    trigger.focus();
  }

  /**
   * Focuses the currently open modal if it exists. Can be used
   * to programmatically focus a modal after opening. For instance, in the
   * callback for Modal.open().
   * @param {String} id - A unique string that used for the modal's id
   * attribute.
   */
  function focusModal(id) {
    var modal =
      document.getElementById(id);

    if (!modal) {
      throw new Error('Could not find a modal with the id of ' + id);
    }

    activeModal = modal;

    modal.focus();
  }

  /**
   * Handles all click interactions for modals.
   * @param {Event} event - The event object.
   */
  function _handleClick(event) {
    /**
     * Stores a boolean in the event object, so we can check to see
     * if we should prevent the event from bubbling up when the user
     * clicks inside of the inner modal element.
     */
    event.target.closest('.rvt-modal__inner, .modal__inner') !== null ?
      event.clickedInModal = true:
      event.clickedInModal = false;

    if (event.clickedInModal) {
      event.stopPropagation();
    }

    /**
     * Stores a reference to the event target if it is any of the following:
     * A  Modal trigger button, a modal close button, or the modal background.
     */
    var matchingSelectors =
      TRIGGER_SELECTOR + ', ' + CLOSE_SELECTOR + ', ' + MODAL_SELECTOR;

    var trigger =
      event.target.closest(matchingSelectors);

    if (!trigger) {
      return;
    }

    // Sets the id based on whatever the matching target was.
    var id = trigger.getAttribute(TRIGGER_ATTR) ||
      (trigger.getAttribute(CLOSE_ATTR) && trigger.getAttribute(CLOSE_ATTR) !== 'close' ?
        trigger.getAttribute(CLOSE_ATTR) : false) ||
        event.target.closest(MODAL_SELECTOR);

    switch (trigger !== null) {
      case trigger.hasAttribute(TRIGGER_ATTR):
        open(id);

        activeModal.focus();

        break;
      case trigger.hasAttribute(CLOSE_ATTR):
        event.preventDefault();

        close(id);
        
        // Check to make sure modal was opened via a trigger element.
        if (activeTrigger !== null) activeTrigger.focus();

        break;
      case trigger === id && !event.clickedInModal:
        // If the modal is a dialog bail
        if (trigger.hasAttribute('data-modal-dialog')) return;

        close(id);

        activeTrigger.focus();

        break;
      default:
        return;
    }
  }

  /**
   * A helper function that handles focus trapping for forward (default)
   * tab key press.
   * @param {HTMLElement} first - first focus-able HTMLElement in an array
   * of all focus-able elements.
   * @param {HTMLElement} last - last focus-able HTMLElement in an array
   * of focus-able elements
   * @param {Event} event - The event object
   */
  function _handleBackwardTab(first, last, event) {
    if (document.activeElement === first || document.activeElement === activeModal) {
      event.preventDefault();
      last.focus();
    }
  }

  /**
   * A helper function that handles focus trapping for backward (with the
   * shift key) tab key press.
   * @param {HTMLElement} first - first focus-able HTMLElement in an array
   * of all focus-able elements.
   * @param {HTMLElement} last - last focus-able HTMLElement in an array
   * of focus-able elements
   * @param {Event} event - The event object
   */
  function _handleForwardTab(first, last, event) {
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /**
   * Handles all keyboard interaction required for the modal.
   * @param {Event} event - The event object
   */
  function _handleKeydown(event) {
    // Do not continue if key stroke is anything other than Escape or Tab
    var currentModal = event.target.closest(MODAL_SELECTOR);

    if (!currentModal) return;

    switch (event.keyCode) {
      case KEYS.tab:

        /**
         * Get all focus-able elements in the modal and convert the
         * resulting nodeList to an Array.
         */
        var focusables =
          Array
            .prototype
            .slice
            .call(currentModal.querySelectorAll(ALL_FOCUSABLE_ELS));

        var firstFocusable = focusables[0];

        var lastFocusable = focusables[focusables.length - 1];

        event.shiftKey ?
          _handleBackwardTab(firstFocusable, lastFocusable, event) :
          _handleForwardTab(firstFocusable, lastFocusable, event);

        break;
      case KEYS.escape:
        // If it's a modal dialog, bail
        if (activeModal.hasAttribute('data-modal-dialog')) return;

        close(activeModal.id);

        if (activeTrigger !== null) activeTrigger.focus();

        break;
      default:
        break;
    }
  }

  /**
   * Destroys any initialized Modals
   * @param {HTMLElement} context - An optional DOM element. This only
   * needs to be passed in if a DOM element was passed to the init()
   * function. If so, the element passed in must be the same element
   * that was passed in at initialization so that the event listeners can
   * be properly removed.
   */
  function destroy(context) {
    // Optional element to bind the event listeners to
    if (context === undefined) {
      context = document;
    }

    // Cleans up event listeners
    context.removeEventListener('click', _handleClick, false);
    context.removeEventListener('keydown', _handleKeydown, false);
  }

  /**
   * Initializes the modal plugin
   * @param {HTMLElement} context - An DOM element initialize the modal
   * on. Although it is possible to only initialize the modal on a specific
   * element for instance, <div id="my-div">Modals only work here</div>,
   * We recommend initializing the modal without passing the context argument
   * and letting all event listeners get attached to the document instead.
   */
  function init(context) {
    // Optional element to bind the event listeners to
    if (context === undefined) {
      context = document;
    }

    // Destroy any initialized modals
    destroy(context);

    // Set up event listeners
    context.addEventListener('click', _handleClick, false);
    context.addEventListener('keydown', _handleKeydown, false);
  }

  // Returns public APIs
  return {
    init: init,
    destroy: destroy,
    open: open,
    close: close,
    focusTrigger: focusTrigger,
    focusModal: focusModal
  }
})();