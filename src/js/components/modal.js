/**
 * A lot of this is largely based on the great work in this article:
 * https://bitsofco.de/accessible-modal-modal/
 */

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

  // Anything that is focusable
  var ALL_FOCUSABLE_ELS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

  var activeTrigger;
  var activeModal;

  function _createModalObject(id) {
    var modal = {};

    modal.trigger = document.querySelector('[' + TRIGGER_ATTR + '="' + id + '"]');

    modal.body = document.getElementById(id);

    return modal;
  }

  function open(id, callback) {
    if (!id) {
      throw new Error("You must provide a unique id for the modal you're trying to open.");
    }

    var modal = _createModalObject(id);

    activeModal = modal.body;

    activeTrigger = modal.trigger;

    modal.body.setAttribute('aria-hidden', 'false');

    document.body.classList.add('rvt-modal-open');

    fireCustomEvent(modal.trigger, TRIGGER_ATTR, 'modalOpen');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  function close(id, callback) {
    if (!id) {
      throw new Error("You must provide a unique id for the modal you're trying to close.");
    }

    var modal = _createModalObject(id);

    modal.body.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('rvt-modal-open');

    fireCustomEvent(modal.trigger, TRIGGER_ATTR, 'modalClose');

    if (callback && typeof callback === 'function') {
        callback();
    }
  }

  function focusTrigger(id) {
    var trigger =
      document.querySelector('[data-modal-trigger="' + id + '"');

    trigger.focus();
  }

  function focusModal(id) {
    var modal =
      document.getElementById(id);

    activeModal = modal;

    modal.focus();
  }

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
      trigger.getAttribute(CLOSE_ATTR) ||
      trigger.id;

    switch (trigger !== null || undefined) {
      case trigger.hasAttribute(TRIGGER_ATTR):
        open(id);

        activeModal.focus();

        break;
      case trigger.hasAttribute(CLOSE_ATTR):
        event.preventDefault();

        close(id);

        activeTrigger.focus();

        break;
      case trigger.id === id && !event.clickedInModal:
        // If the modal is a dialog bail
        if (trigger.hasAttribute('data-modal-dialog')) return;

        close(id);

        activeTrigger.focus();
      default:
        return;
    }
  }

  function _handBackwardTab(first, last, event) {
    if (document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  }

  function _handleForwardTab(first, last, event) {
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function _handleKeydown(event) {
    // Do not continue if key stroke is anything other than Escape or Tab
    var currentModal = event.target.closest(MODAL_SELECTOR);

    if (!currentModal) return;

    switch (event.keyCode) {
      case KEYS.tab:

        /**
         * Get all focusable elements in the modal and convert the
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
          _handBackwardTab(firstFocusable, lastFocusable, event) :
          _handleForwardTab(firstFocusable, lastFocusable, event);

        break;
      case KEYS.escape:
        // If it's a modal dialog, bail
        if (activeModal.hasAttribute('data-modal-dialog')) return;

        close(activeModal.id);

        activeTrigger.focus();

        break;
      default:
        break;
    }
  }

  function destroy(context) {
    // Optional element to bind the event listeners to
    if (context === undefined) {
      context = document;
    }

    context.removeEventListener('click', _handleClick, false);
    context.removeEventListener('keydown', _handleKeydown, false);
  }

  function init(context) {
    // Optional element to bind the event listeners to
    if (context === undefined) {
      context = document;
    }

    destroy(context);

    context.addEventListener('click', _handleClick, false);
    context.addEventListener('keydown', _handleKeydown, false);
  }

  return {
    init: init,
    destroy: destroy,
    open: open,
    close: close,
    focusTrigger: focusTrigger,
    focusModal: focusModal
  }
})();
