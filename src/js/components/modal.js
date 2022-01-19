/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'
import keyCodes from '../utilities/keyCodes'

/******************************************************************************
 * The modal component can be used to present content in a smaller window that
 * is displayed on top of the main application or site content.
 *
 * @see https://v2.rivet.iu.edu/docs/components/modal/
 *****************************************************************************/

export default class Modal extends Component {

  /****************************************************************************
   * Gets the modal's CSS selector.
   *
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    return '[data-rvt-modal]'
  }

  /****************************************************************************
   * Gets an object containing the methods that should be attached to the
   * component's root DOM element. Used by wicked-elements to initialize a DOM
   * element with Web Component-like behavior.
   *
   * @static
   * @returns {Object} Object with component methods
   ***************************************************************************/

  static get methods () {
    return {

      /************************************************************************
       * Initializes the modal.
       ***********************************************************************/

      init () {
        this._initSelectors()
        this._initElements()
        this._initProperties()
        this._bindExternalEventHandlers()

        Component.bindMethodToDOMElement(this, 'open', this.open)
        Component.bindMethodToDOMElement(this, 'close', this.close)
        Component.bindMethodToDOMElement(this, 'focusTrigger', this.focusTrigger)
        Component.bindMethodToDOMElement(this, 'focusModal', this.focusModal)
      },

      /************************************************************************
       * Initializes modal child element selectors.
       *
       * @private
       ***********************************************************************/

      _initSelectors () {
        this.modalAttribute = 'data-rvt-modal'
        this.innerModalAttribute = 'data-rvt-modal-inner'
        this.triggerAttribute = 'data-rvt-modal-trigger'
        this.closeButtonAttribute = 'data-rvt-modal-close'
        this.dialogAttribute = this.dialogAttribute

        this.innerModalSelector = `[${this.innerModalAttribute}]`
        this.triggerSelector = `[${this.triggerAttribute}]`
        this.closeButtonSelector = `[${this.closeButtonAttribute}]`
      },

      /************************************************************************
       * Initializes modal child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        const modalId = this.element.getAttribute(this.modalAttribute)

        this.innerModal = this.element.querySelector(this.innerModalSelector)
        this.triggerButton = document.querySelector(`[${this.triggerAttribute} = "${modalId}"]`)
        this.closeButtons = this.element.querySelectorAll(this.closeButtonSelector)
      },

      /************************************************************************
       * Initializes modal state properties.
       *
       * @private
       ***********************************************************************/

      _initProperties () {
        this.id = this.element.getAttribute('id')
        this.isOpen = false
        this.isDialog = this.element.hasAttribute(this.dialogAttribute)
      },

      /************************************************************************
       * Binds the modal instance to handler methods for relevant events that
       * originate outside the component's root DOM element.
       *
       * @private
       ***********************************************************************/

      _bindExternalEventHandlers () {
        this._onTriggerClick = this._onTriggerClick.bind(this)
        this._onDocumentClick = this._onDocumentClick.bind(this)
      },

      /************************************************************************
       * Called when the modal is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)

        this._addTriggerEventHandlers()
        this._addDocumentEventHandlers()

        if (this._shouldBeOpenByDefault()) { this.open() }
      },

      /************************************************************************
       * Returns true if the modal should be open on page load.
       *
       * @private
       * @returns {boolean} Modal should be open
       ***********************************************************************/

      _shouldBeOpenByDefault () {
        return this.element.hasAttribute('data-rvt-modal-open-on-init')
      },

      /************************************************************************
       * Adds event handlers for the trigger button. The trigger button event
       * handlers must be set manually rather than using onClick because the
       * trigger button exists outside the modal component's root DOM element.
       *
       * @private
       ***********************************************************************/

      _addTriggerEventHandlers () {
        if (!this._hasTriggerButton()) { return }

        this.triggerButton.addEventListener('click', this._onTriggerClick, false)
      },

      /************************************************************************
       * Returns true if the modal has an associated trigger button.
       *
       * @private
       * @returns {boolean} Modal has trigger button
       ***********************************************************************/

      _hasTriggerButton () {
        return this.triggerButton
      },

      /************************************************************************
       * Adds event handlers to the document that are related to the modal.
       *
       * @private
       ***********************************************************************/

      _addDocumentEventHandlers () {
        document.addEventListener('click', this._onDocumentClick, false)
      },

      /************************************************************************
       * Called when the modal is removed from the DOM.
       ***********************************************************************/

      disconnected () {
        Component.dispatchComponentRemovedEvent(this.element)

        this._removeTriggerEventHandlers()
        this._removeDocumentEventHandlers()
      },

      /************************************************************************
       * Removes trigger button event handlers.
       *
       * @private
       ***********************************************************************/

      _removeTriggerEventHandlers () {
        if (!this._hasTriggerButton()) { return }

        this.triggerButton.removeEventListener('click', this._onTriggerClick, false)
      },

      /************************************************************************
       * Removes document event handlers related to the modal.
       *
       * @private
       ***********************************************************************/

      _removeDocumentEventHandlers () {
        document.removeEventListener('click', this._onDocumentClick, false)
      },

      /************************************************************************
       * Handles click events broadcast to the modal. For click events related
       * to the trigger button and document, see the _onTriggerClick() and
       * _onDocumentClick() methods, respectively.
       *
       * @param {Event} event - Click event
       ***********************************************************************/

      onClick (event) {
        if (!this._isOpen()) { return }

        if (!this._clickOriginatedInCloseButton(event)) { return }

        this.close()
      },

      /************************************************************************
       * Returns true if the modal is open.
       *
       * @private
       * @returns {boolean} Modal is open
       ***********************************************************************/

      _isOpen () {
        return this.isOpen
      },

      /************************************************************************
       * Returns true if the given click event originated inside one of the
       * modal's "close" buttons.
       *
       * @private
       * @param {Event} event - Click event
       * @returns {boolean} Click originated inside close button
       ***********************************************************************/

      _clickOriginatedInCloseButton (event) {
        return event.target.closest(this.closeButtonSelector)
      },

      /************************************************************************
       * Handles click events broadcast to the modal's trigger button.
       *
       * @param {Event} event - Click event
       ***********************************************************************/

      _onTriggerClick (event) {
        this._isOpen()
          ? this.close()
          : this.open()
      },

      /************************************************************************
       * Handles click events broadcast to the document that are related to
       * the modal but did not originate inside the modal itself.
       *
       * @param {Event} event - Click event
       ***********************************************************************/

      _onDocumentClick (event) {
        if (this._clickOriginatedInsideModalOrTrigger(event)) { return }

        if (!this._isOpen()) { return }

        if (this._isDialog()) { return }

        this.close()
      },

      /************************************************************************
       * Returns true if the given click event originated inside the inner
       * modal or modal trigger button.
       *
       * @param {Event} event - Click event
       * @returns {boolean} Click originated inside inner modal or trigger
       ***********************************************************************/

      _clickOriginatedInsideModalOrTrigger (event) {
        return event.target.closest(this.innerModalSelector) ||
               event.target.closest(this.triggerSelector)
      },

      /************************************************************************
       * Returns true if the modal is a dialog. (Dialog modals can't be closed
       * by clicking outside the modal or hitting the Escape key.)
       *
       * @private
       * @returns {boolean} Modal is dialog
       ***********************************************************************/

      _isDialog () {
        return this.isDialog
      },

      /************************************************************************
       * Handles keydown events broadcast to the modal.
       *
       * @param {Event} event - Keydown event
       ***********************************************************************/

      onKeydown (event) {
        switch (event.keyCode) {
          case keyCodes.tab:
            this._setFocusableChildElements()
            this._shiftKeyPressed(event)
              ? this._handleBackwardTab(event)
              : this._handleForwardTab(event)
            break

          case keyCodes.escape:
            if (!this._isDialog()) { this.close() }
            break
        }
      },

      /************************************************************************
       * Sets the modal's list of focusable child elements.
       *
       * @private
       ***********************************************************************/

      _setFocusableChildElements () {
        this.focusableChildElements = this.element.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="-1"]'
        )

        this.firstFocusableChildElement = this.focusableChildElements[0]
        this.lastFocusableChildElement = this.focusableChildElements[this.focusableChildElements.length - 1]
      },

      /************************************************************************
       * Returns true if Shift was held during the given keydown event.
       *
       * @private
       * @param {Event} event - Keydown event
       * @returns {boolean} Shift key pressed
       ***********************************************************************/

      _shiftKeyPressed (event) {
        return event.shiftKey
      },

      /************************************************************************
       * Handles the user tabbing backward through the modal, trapping focus
       * within the modal if necessary.
       *
       * @private
       * @param {Event} event - Keydown event
       ***********************************************************************/

      _handleBackwardTab (event) {
        if (this._shouldTrapBackwardTabFocus()) {
          event.preventDefault()
          this.lastFocusableChildElement.focus()
        }
      },

      /************************************************************************
       * Returns true if focus should be trapped to prevent the user from
       * tabbing backward out of the modal.
       *
       * @private
       * @returns {boolean} Modal is dialog
       ***********************************************************************/

      _shouldTrapBackwardTabFocus () {
        return document.activeElement === this.firstFocusableChildElement ||
               document.activeElement === this.element
      },

      /************************************************************************
       * Handles the user tabbing forward through the modal, trapping focus
       * within the modal if necessary.
       *
       * @private
       * @param {Event} event - Keydown event
       ***********************************************************************/

      _handleForwardTab (event) {
        if (this._shouldTrapForwardTabFocus()) {
          event.preventDefault()
          
          this.firstFocusableChildElement.focus()
        }
      },

      /************************************************************************
       * Returns true if focus should be trapped to prevent the user from
       * tabbing forward out of the modal.
       *
       * @private
       * @returns {boolean} Modal is dialog
       ***********************************************************************/

      _shouldTrapForwardTabFocus () {
        return document.activeElement === this.lastFocusableChildElement
      },

      /************************************************************************
       * Opens the modal.
       ***********************************************************************/

      open () {
        if (this._isOpen()) { return }

        if (!this._eventDispatched('modalOpened')) { return }

        this._setOpenState()
        this.focusModal()
      },

      /************************************************************************
       * Sets the modal's state properties to represent it being open.
       *
       * @private
       ***********************************************************************/

      _setOpenState () {
        this.isOpen = true
        this.element.removeAttribute('hidden')
        document.body.classList.add('rvt-modal-open')
      },

      /************************************************************************
       * Moves focus to the modal.
       ***********************************************************************/

      focusModal () {
        this.element.focus()
      },

      /************************************************************************
       * Closes the modal.
       ***********************************************************************/

      close () {
        if (!this._isOpen()) { return }

        if (!this._eventDispatched('modalClosed')) { return }

        this._setClosedState()

        if (this._hasTriggerButton()) {
          this.focusTrigger()
        }
      },

      /************************************************************************
       * Sets the modal's state properties to represent it being closed.
       *
       * @private
       ***********************************************************************/

      _setClosedState () {
        this.isOpen = false
        this.element.setAttribute('hidden', '')
        document.body.classList.remove('rvt-modal-open')
      },

      /************************************************************************
       * Moves focus to the modal's trigger button.
       ***********************************************************************/

      focusTrigger () {
        if (!this._hasTriggerButton()) {
          console.warn(`Could not find a trigger button with for modal ID '${this.id}'`)
          return
        }

        this.triggerButton.focus()
      },

      /************************************************************************
       * Returns true if the custom event with the given name was successfully
       * dispatched.
       *
       * @private
       * @param {string} name - Event name
       * @returns {boolean} Event successfully dispatched
       ***********************************************************************/

      _eventDispatched (name) {
        const dispatched = Component.dispatchCustomEvent(name, this.element)

        return dispatched
      }
    }
  }
}
