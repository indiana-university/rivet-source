/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'
import keyCodes from '../utilities/keyCodes'
import SUPPRESS_EVENT from '../utilities/suppressEvent'

/******************************************************************************
 * The dialog component can be used to present content in a smaller window that
 * is displayed on top of the main application or site content.
 *
 * @see https://rivet.iu.edu/components/dialog/
 *****************************************************************************/

export default class Dialog extends Component {

  /****************************************************************************
   * Gets the dialog's CSS selector.
   *
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    return '[data-rvt-dialog]'
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
       * Initializes the dialog.
       ***********************************************************************/

      init () {
        this._initSelectors()
        this._initElements()
        this._initProperties()
        this._initAttributes()
        this._makeDialogFirstElementInBody()
        this._bindExternalEventHandlers()

        Component.bindMethodToDOMElement(this, 'open', this.open)
        Component.bindMethodToDOMElement(this, 'close', this.close)
        Component.bindMethodToDOMElement(this, 'focusTrigger', this.focusTrigger)
        Component.bindMethodToDOMElement(this, 'focusDialog', this.focusDialog)
      },

      /************************************************************************
       * Initializes dialog child element selectors.
       *
       * @private
       ***********************************************************************/

      _initSelectors () {
        this.dialogAttribute = 'data-rvt-dialog'
        this.mountElementAttribute = 'data-rvt-dialog-mount'
        this.triggerAttribute = 'data-rvt-dialog-trigger'
        this.closeButtonAttribute = 'data-rvt-dialog-close'
        this.modalAttribute = 'data-rvt-dialog-modal'
        this.disablePageInteractionAttribute = 'data-rvt-dialog-disable-page-interaction'

        this.mountElementSelector = `[${this.mountElementAttribute}]`
        this.triggerSelector = `[${this.triggerAttribute}]`
        this.closeButtonSelector = `[${this.closeButtonAttribute}]`
      },

      /************************************************************************
       * Initializes dialog child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        const dialogId = this.element.getAttribute(this.dialogAttribute)
        const mountElement = document.querySelector(this.mountElementSelector)

        this.mountElement = mountElement ?? document.body

        // Trigger buttons are outside the actual dialog element (this.element)
        // and more than one dialog might be on a page. For this reason, the
        // selector checks that the trigger attribute value matches the dialog's
        // ID to ensure a trigger is associated with this dialog instance.
        // Otherwise, trigger buttons associated with other dialogs would be
        // mistakenly associated with the current dialog instance and included
        // in this.triggerButtons.

        this.triggerButtons = Array.from(
          document.querySelectorAll(`[${this.triggerAttribute} = "${dialogId}"]`)
        )

        this.closeButtons = Array.from(
          this.element.querySelectorAll(this.closeButtonSelector)
        )

        this.lastClickedTriggerButton = null
      },

      /************************************************************************
       * Initializes dialog state properties.
       *
       * @private
       ***********************************************************************/

      _initProperties () {
        this.id = this.element.getAttribute('id')
        this.isOpen = false
        this.isModal = this.element.hasAttribute(this.modalAttribute)
      },

      /************************************************************************
       * Initializes dialog attributes.
       *
       * @private
       ***********************************************************************/

      _initAttributes () {
        if (this.isModal) {
          this.element.setAttribute('aria-modal', 'true')
        }
      },

      /************************************************************************
       * Rearranges the DOM so that the dialog becomes the first element in
       * the document body (or app container div in the case of a frontend
       * framework like React). This rearrangement of the DOM is required for
       * accessibility reasons.
       *
       * @private
       ***********************************************************************/

      _makeDialogFirstElementInBody () {
        this.mountElement.insertBefore(
          this.element,
          this.mountElement.firstElementChild
        )
      },

      /************************************************************************
       * Binds the dialog instance to handler methods for relevant events that
       * originate outside the component's root DOM element.
       *
       * @private
       ***********************************************************************/

      _bindExternalEventHandlers () {
        this._onTriggerClick = this._onTriggerClick.bind(this)
        this._onDocumentClick = this._onDocumentClick.bind(this)
      },

      /************************************************************************
       * Called when the dialog is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)
        Component.watchForDOMChanges(this)

        this._addTriggerEventHandlers()
        this._addDocumentEventHandlers()

        if (this._shouldBeOpenByDefault()) { this.open() }
      },

      /************************************************************************
       * Returns true if the dialog should be open on page load.
       *
       * @private
       * @returns {boolean} Dialog should be open
       ***********************************************************************/

      _shouldBeOpenByDefault () {
        return this.element.hasAttribute('data-rvt-dialog-open-on-init')
      },

      /************************************************************************
       * Adds event handlers for the trigger button. The trigger button event
       * handlers must be set manually rather than using onClick because the
       * trigger button exists outside the dialog component's root DOM element.
       *
       * @private
       ***********************************************************************/

      _addTriggerEventHandlers () {
        if (!this._hasTriggerButton()) { return }

        this.triggerButtons.forEach(button => {
          button.addEventListener('click', this._onTriggerClick, false)
        })
      },

      /************************************************************************
       * Returns true if the dialog has an associated trigger button.
       *
       * @private
       * @returns {boolean} Dialog has trigger button
       ***********************************************************************/

      _hasTriggerButton () {
        return this.triggerButtons.length
      },

      /************************************************************************
       * Adds event handlers to the document that are related to the dialog.
       *
       * @private
       ***********************************************************************/

      _addDocumentEventHandlers () {
        document.addEventListener('click', this._onDocumentClick, false)
      },

      /************************************************************************
       * Called when the dialog is removed from the DOM.
       ***********************************************************************/

      disconnected () {
        Component.dispatchComponentRemovedEvent(this.element)
        Component.stopWatchingForDOMChanges(this)

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

        this.triggerButtons.forEach(button => {
          button.removeEventListener('click', this._onTriggerClick, false)
        })
      },

      /************************************************************************
       * Removes document event handlers related to the dialog.
       *
       * @private
       ***********************************************************************/

      _removeDocumentEventHandlers () {
        document.removeEventListener('click', this._onDocumentClick, false)
      },

      /************************************************************************
       * Handles click events broadcast to the dialog. For click events related
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
       * Returns true if the dialog is open.
       *
       * @private
       * @returns {boolean} Dialog is open
       ***********************************************************************/

      _isOpen () {
        return this.isOpen
      },

      /************************************************************************
       * Returns true if the given click event originated inside one of the
       * dialog's "close" buttons.
       *
       * @private
       * @param {Event} event - Click event
       * @returns {boolean} Click originated inside close button
       ***********************************************************************/

      _clickOriginatedInCloseButton (event) {
        return event.target.closest(this.closeButtonSelector)
      },

      /************************************************************************
       * Handles click events broadcast to the dialog's trigger button.
       *
       * @private
       * @param {Event} event - Click event
       ***********************************************************************/

      _onTriggerClick (event) {
        this._setLastClickedTriggerButton(event)

        this._isOpen()
          ? this.close()
          : this.open()
      },

      /************************************************************************
       * Saves a reference to the last clicked trigger button.
       *
       * @private
       * @param {Event} event - Trigger button click event
       ***********************************************************************/

      _setLastClickedTriggerButton (event) {
        this.lastClickedTriggerButton = event.target.closest(this.triggerSelector)
      },

      /************************************************************************
       * Handles click events broadcast to the document that are related to
       * the dialog but did not originate inside the dialog itself.
       *
       * @private
       * @param {Event} event - Click event
       ***********************************************************************/

      _onDocumentClick (event) {
        if (this._clickOriginatedInsideDialogOrTrigger(event)) { return }

        if (!this._isOpen()) { return }

        if (this._shouldCloseOnClickOutside()) { return }

        this.close()
      },

      /************************************************************************
       * Returns true if the given click event originated inside the dialog or
       * dialog trigger button.
       *
       * @private
       * @param {Event} event - Click event
       * @returns {boolean} Click originated inside dialog or trigger button
       ***********************************************************************/

      _clickOriginatedInsideDialogOrTrigger (event) {

        // This method uses event.composedPath().some() to walk up the DOM tree
        // to determine if the event target was within the dialog instead of
        // this.element.contains(). It does so to prevent this method from
        // returning a false negative if a click event originating inside
        // the dialog removed its target from the DOM.

        return event.target.closest(this.triggerSelector) ||
               event.composedPath().some(el => el.dataset && 'rvtDialog' in el.dataset)
      },

      /************************************************************************
       * Returns true if the dialog should close if the user clicks outside
       * of the dialog.
       *
       * @private
       * @returns {boolean} Dialog should close on click outside
       ***********************************************************************/

      _shouldCloseOnClickOutside () {
        return !this.isModal
      },

      /************************************************************************
       * Handles keydown events broadcast to the dialog.
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
            if (!this._shouldCloseOnClickOutside()) { this.close() }
            break
        }
      },

      /************************************************************************
       * Sets the dialog's list of focusable child elements.
       *
       * @private
       ***********************************************************************/

      _setFocusableChildElements () {
        this.focusableChildElements = this.element.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="-1"]'
        )

        this.focusableChildElements = Array.from(this.focusableChildElements)
        this.focusableChildElements = this.focusableChildElements.filter(el => el.clientHeight > 0) // Exclude hidden elements

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
       * Handles the user tabbing backward through the dialog, trapping focus
       * within the dialog if necessary.
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
       * tabbing backward out of the dialog.
       *
       * @private
       * @returns {boolean} Should trap backward tab focus
       ***********************************************************************/

      _shouldTrapBackwardTabFocus () {
        return document.activeElement === this.firstFocusableChildElement ||
               document.activeElement === this.element
      },

      /************************************************************************
       * Handles the user tabbing forward through the dialog, trapping focus
       * within the dialog if necessary.
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
       * tabbing forward out of the dialog.
       *
       * @private
       * @returns {boolean} Dialog is dialog
       ***********************************************************************/

      _shouldTrapForwardTabFocus () {
        return document.activeElement === this.lastFocusableChildElement
      },

      /************************************************************************
       * Opens the dialog.
       * 
       * @param {boolean} suppressEvent - Suppress open event
       ***********************************************************************/

      open (suppressEvent = false) {
        if (this._isOpen()) { return }

        if (!suppressEvent)
          if (!this._eventDispatched('DialogOpened')) { return }

        this._setOpenState()
        this.focusDialog()

        if (this._shouldDisablePageInteraction()) {
          this._disablePageInteraction()
        }
      },

      /************************************************************************
       * Sets the dialog's state properties to represent it being open.
       *
       * @private
       ***********************************************************************/

      _setOpenState () {
        this.isOpen = true
        this.element.removeAttribute('hidden')

        if (this.isModal) {
          document.body.classList.add('rvt-dialog-prevent-scroll')
        }
      },

      /************************************************************************
       * Moves focus to the dialog.
       ***********************************************************************/

      focusDialog () {
        this.element.focus()
      },

      /************************************************************************
       * Returns true if interaction should be disabled for page elements
       * behind the dialog.
       *
       * @private
       * @returns {boolean} Should disable page interaction
       ***********************************************************************/

      _shouldDisablePageInteraction () {
        return this.element.hasAttribute(this.disablePageInteractionAttribute)
      },

      /************************************************************************
       * Disables interaction with page elements behind the dialog.
       *
       * @private
       ***********************************************************************/

      _disablePageInteraction () {
        this._getDirectChildrenOfBodyExceptDialog().forEach(child => {
          child.setAttribute('inert', '')
          child.setAttribute('aria-hidden', 'true')
        })
      },

      /************************************************************************
       * Returns an array of all current direct children of the document body
       * (or app container in the case of a frontend framework like React)
       * except for the dialog itself.
       *
       * @private
       * @returns {HTMLElement[]} Direct children of body
       ***********************************************************************/

      _getDirectChildrenOfBodyExceptDialog () {
        const directChildrenOfBody = Array.from(this.mountElement.children)

        return directChildrenOfBody.filter(el => !el.hasAttribute(this.dialogAttribute))
      },

      /************************************************************************
       * Closes the dialog.
       * 
       * @param {boolean} suppressEvent - Suppress close event
       ***********************************************************************/

      close (suppressEvent = false) {
        if (!this._isOpen()) { return }

        if (!suppressEvent)
          if (!this._eventDispatched('DialogClosed')) { return }

        this._setClosedState()

        if (this._shouldDisablePageInteraction()) {
          this._enablePageInteraction()
        }

        if (this._hasTriggerButton()) {
          this.focusTrigger()
        }
      },

      /************************************************************************
       * Sets the dialog's state properties to represent it being closed.
       *
       * @private
       ***********************************************************************/

      _setClosedState () {
        this.isOpen = false
        this.element.setAttribute('hidden', '')
        document.body.classList.remove('rvt-dialog-prevent-scroll')
      },

      /************************************************************************
       * Enables interaction with page elements behind the dialog.
       *
       * @private
       ***********************************************************************/

      _enablePageInteraction () {
        this._getDirectChildrenOfBodyExceptDialog().forEach(child => {
          child.removeAttribute('inert')
          child.removeAttribute('aria-hidden')
        })
      },

      /************************************************************************
       * Moves focus to the dialog's trigger button.
       ***********************************************************************/

      focusTrigger () {
        if (!this._hasTriggerButton()) {
          console.warn(`Could not find a trigger button for dialog ID '${this.id}'`)
          return
        }

        this.lastClickedTriggerButton && document.body.contains(this.lastClickedTriggerButton)
          ? this.lastClickedTriggerButton.focus()
          : this.triggerButtons[0].focus()
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
