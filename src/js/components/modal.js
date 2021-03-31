/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Component from './component';
import { nodeListToArray } from '../utilities/domHelpers';
import keyCodes from '../utilities/keyCodes';

export default class Modal extends Component {
  static get selector() {
    return '[data-rvt-modal]';
  }

  static get methods() {
    return {
      init() {
        console.log('Modal::init()');

        this.openOnInit = this.element.hasAttribute('data-rvt-modal-open');
        this.dialog = this.element.hasAttribute('data-rvt-modal-dialog');
        this.modalAttribute = 'data-rvt-modal';
        this.modalSelector = `[${this.modalAttribute}]`;
        this.modalDataValue = this.element.getAttribute('data-rvt-modal');
        this.innerModalAttribute = 'data-rvt-modal-inner';
        this.innerModalSelector = `[${this.innerModalAttribute}]`;
        this.openAttribute = 'data-rvt-modal-trigger';
        this.openSelector = `[${this.openAttribute}]`;
        this.openButton = document.querySelector(
          `[${this.openAttribute}="${this.modalDataValue}"]`
        );
        this.closeAttribute = 'data-rvt-modal-close';
        this.closeSelector = `[${this.closeAttribute}]`;

        // Anything that is focus-able
        this.focusElements =
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="-1"]';

        // bind methods
        Component.bindMethodToDOMElement(this.element, 'open', this.open);
        Component.bindMethodToDOMElement(this.element, 'close', this.close);
        Component.bindMethodToDOMElement(this.element, 'focusTrigger', this.focusTrigger);
        Component.bindMethodToDOMElement(this.element, 'focusModal', this.focusModal);

        this._handleClick = this._handleClick.bind(this);
        this._handleKeydown = this._handleKeydown.bind(this);
      },

      connected() {
        Component.dispatchComponentAddedEvent(this.element);

        if (!this.openOnInit) {
          this.element.setAttribute('hidden', '');
        }
    
        // Add click handlers
        document.addEventListener('click', this._handleClick, false);
        document.addEventListener('keydown', this._handleKeydown, false);
      },

      disconnected() {
        Component.dispatchComponentRemovedEvent(this.element);
        
        document.removeEventListener('click', this._handleClick, false);
        document.removeEventListener('keydown', this._handleKeydown, false);
      },

      _handleClick(event) {
        event.target.closest(this.innerModalSelector) !== null
          ? (event.clickedInModal = true)
          : (event.clickedInModal = false);
    
        if (event.clickedInModal) {
          event.stopPropagation();
        }
    
        // The event trigger should involve the open, close, or modal selector
        const triggerSelectors = `${this.openSelector}, ${this.closeSelector}, ${this.modalSelector}`;
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
            // Check that the data-rvt-modal-trigger value matches the instance's data-rvt-modal value
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
    
            // Check that the data-rvt-modal-close value matches the instance's data-rvt-modal value
            if (trigger.getAttribute(this.closeAttribute) !== this.modalDataValue)
              return;
            this.close();
    
            if (this.openButton !== null) this.openButton.focus();
    
            break;
          }
          // If the trigger was clicking outside of the modal
          case !event.clickedInModal: {
            // Check that the trigger is not a dialog because the user needs to make a choice to proceed
            if (this.dialog) return;
    
            // Check that the trigger content data-rvt-modal value matches the instance's data-rvt-modal value
            if (
              triggerContent.getAttribute(this.modalAttribute) !==
              this.modalDataValue
            )
              return;
            this.close();
    
            if (this.openButton !== null) this.openButton.focus();
    
            break;
          }
          default: {
            return;
          }
        }
      },

      _handleBackwardTab(first, last, event) {
        if (
          document.activeElement === first ||
          document.activeElement === this.element
        ) {
          event.preventDefault();
          last.focus();
        }
      },

      _handleForwardTab(first, last, event) {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      },

      _handleKeydown(event) {
        // Determine if keydown is occurring within the modal
        const currentModal = event.target.closest(this.modalSelector);
        // If not in the modal, ignore
        if (!currentModal) return;
    
        switch (event.keyCode) {
          case keyCodes.tab: {
            // Create an array of all the focusable elements within the modal
            const focusList = nodeListToArray(
              currentModal.querySelectorAll(this.focusElements)
            );
            const firstFocus = focusList[0];
            const finalFocus = focusList[focusList.length - 1];
    
            // If they shift tab, trigger the backward tab handler, otherwise use the forward tab handler
            event.shiftKey
              ? this._handleBackwardTab(firstFocus, finalFocus, event)
              : this._handleForwardTab(firstFocus, finalFocus, event);
    
            break;
          }
          case keyCodes.escape: {
            // Check that the modal is not a dialog because the user needs to make a choice to proceed
            if (this.dialog) return;
    
            // Check that the current modal matches the instance's
            if (
              currentModal.getAttribute(this.modalAttribute) !== this.modalDataValue
            )
              return;
    
            this.close();
    
            if (this.openButton !== null) this.openButton.focus();
    
            break;
          }
          default: {
            break;
          }
        }
      },

      open() {
        // Trigger modalOpen custom event. This event is used to control the process of closing other open modals.
        const openEvent = Component.dispatchCustomEvent('modalOpen', this.element, {
          id: this.element.dataset.rvtModal
        });
    
        if (!openEvent) return;
    
        this.element.removeAttribute('hidden');
        document.body.classList.add('rvt-modal-open');
      },

      close() {
        // Trigger modalClose custom event.
        const closeEvent = Component.dispatchCustomEvent('modalClose', this.element, {
          id: this.element.dataset.rvtModal
        });
    
        if (!closeEvent) return;
    
        this.element.setAttribute('hidden', '');
        document.body.classList.remove('rvt-modal-open');
      },
    
      focusTrigger() {
        if (!this.openButton) {
          throw new Error(
            `Could not find a modal trigger with the value of ${this.modalDataValue}`
          );
        }
    
        this.openButton.focus();
      },
    
      focusModal() {
        if (!this.element) {
          throw new Error(
            `Could not find a modal with the value of ${this.modalDataValue}`
          );
        }
    
        this.element.focus();
      }

    }
  }
}
