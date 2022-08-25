/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'
import keyCodes from '../utilities/keyCodes'

/******************************************************************************
 * The dropdown component presents the user with a list of options that can be
 * shown or hidden with a button.
 *
 * @see https://v2.rivet.iu.edu/docs/components/dropdown/
 *****************************************************************************/

export default class Dropdown extends Component {

  /****************************************************************************
   * Gets the dropdown's CSS selector.
   *
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    return '[data-rvt-dropdown]'
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
       * Initializes the dropdown.
       ***********************************************************************/

      init () {
        this._initSelectors()
        this._initElements()
        this._initProperties()
        this._initMenuItems()
        this._removeIconFromTabOrder()
        this._bindExternalEventHandlers()

        Component.bindMethodToDOMElement(this, 'open', this.open)
        Component.bindMethodToDOMElement(this, 'close', this.close)
      },

      /************************************************************************
       * Initializes dropdown child element selectors.
       *
       * @private
       ***********************************************************************/

       _initSelectors () {
        this.toggleAttribute = 'data-rvt-dropdown-toggle'
        this.menuAttribute = 'data-rvt-dropdown-menu'

        this.toggleSelector = `[${this.toggleAttribute}]`
        this.menuSelector = `[${this.menuAttribute}]`
      },

      /************************************************************************
       * Initializes dropdown child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        this.toggleElements = Array.from(
          document.querySelectorAll(this.toggleSelector)
        )
        
        this.primaryToggleElement = this.toggleElements[0]
        this.externalToggleElements = this.toggleElements.slice(1)
        this.menuElement = this.element.querySelector(this.menuSelector)
      },

      /************************************************************************
       * Initializes dropdown state properties.
       *
       * @private
       ***********************************************************************/

      _initProperties () {
        this.isOpen = false
      },

      /************************************************************************
       * Initializes a list of menu items in the dropdown.
       *
       * @private
       ***********************************************************************/

      _initMenuItems () {
        const focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'

        this.menuItems = Array.from(this.menuElement.querySelectorAll(focusableElements))
        this.firstMenuItem = this.menuItems[0]
        this.lastMenuItem = this.menuItems[this.menuItems.length - 1]
      },

      /************************************************************************
       * Removes the arrow icon from the tab order.
       *
       * @private
       ***********************************************************************/

      _removeIconFromTabOrder () {
        const icon = this.element.querySelector('svg')

        if (icon) { icon.setAttribute('focusable', 'false') }
      },

      /************************************************************************
       * Binds the dropdown instance to handler methods for relevant events
       * that originate outside the component's root DOM element.
       *
       * @private
       ***********************************************************************/

      _bindExternalEventHandlers () {
        this._onDocumentClick = this._onDocumentClick.bind(this)
      },

      /************************************************************************
       * Called when the dropdown is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)

        this._addDocumentEventHandlers()
      },

      /************************************************************************
       * Adds event handlers to the document that are related to the dropdown.
       *
       * @private
       ***********************************************************************/

      _addDocumentEventHandlers () {
        document.addEventListener('click', this._onDocumentClick, false)
      },

      /************************************************************************
       * Called when the dropdown is removed from the DOM.
       ***********************************************************************/

      disconnected () {
        Component.dispatchComponentRemovedEvent(this.element)

        this._removeDocumentEventHandlers()
      },

      /************************************************************************
       * Removes document event handlers related to the dropdown.
       *
       * @private
       ***********************************************************************/

      _removeDocumentEventHandlers () {
        document.removeEventListener('click', this._onDocumentClick, false)
      },

      /************************************************************************
       * Opens the dropdown.
       ***********************************************************************/

      open () {
        if (this._toggleElementIsDisabled()) { return }

        if (!this._eventDispatched('DropdownOpened')) { return }

        this._setOpenState()
      },

      /************************************************************************
       * Returns true if the dropdown is disabled.
       *
       * @private
       * @returns {boolean} Disabled state
       ***********************************************************************/

      _toggleElementIsDisabled () {
        return this.primaryToggleElement.hasAttribute('disabled')
      },

      /************************************************************************
       * Sets the dropdown's state properties to represent it being open.
       *
       * @private
       ***********************************************************************/

      _setOpenState () {
        this.primaryToggleElement.setAttribute('aria-expanded', 'true')
        this.menuElement.removeAttribute('hidden')
        this.firstMenuItem.focus()

        this.isOpen = true
      },

      /************************************************************************
       * Closes the dropdown.
       ***********************************************************************/

      close () {
        if (!this._isOpen()) { return }

        if (!this._eventDispatched('DropdownClosed')) { return }

        this._setClosedState()
      },

      /************************************************************************
       * Returns true if the dropdown is open.
       *
       * @private
       * @returns {boolean} Dropdown is open
       ***********************************************************************/

      _isOpen () {
        return this.isOpen
      },

      /************************************************************************
       * Sets the dropdown's state properties to represent it being closed.
       *
       * @private
       ***********************************************************************/

      _setClosedState () {
        this.primaryToggleElement.setAttribute('aria-expanded', 'false')
        this.menuElement.setAttribute('hidden', '')

        this.isOpen = false
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
      },

      /************************************************************************
       * Handles click events broadcast to the disclosure.
       *
       * @param {Event} event - Click event
       ***********************************************************************/

      onClick (event) {
        if (this._eventOriginatedInsideMenu(event)) { return }

        this._isOpen()
          ? this.close()
          : this.open()
      },

      /************************************************************************
       * Returns true if the given event originated inside the dropdown's menu.
       *
       * @private
       * @param {Event} event - Event
       * @returns {boolean} Event originated inside menu
       ***********************************************************************/

      _eventOriginatedInsideMenu (event) {
        return this.menuElement.contains(event.target)
      },

      /************************************************************************
       * Handles click events broadcast to the document that are related to
       * the dropdown but did not originate inside the dropdown itself.
       *
       * @param {Event} event - Click event
       ***********************************************************************/

      _onDocumentClick (event) {
        if (!this._clickOriginatedOutsideDropdown(event)) { return }

        if (this._clickOriginatedInExternalToggleElement(event)) { return }

        if (!this._isOpen()) { return }

        this.close()
      },

      /************************************************************************
       * Returns true if the click event originated inside the dropdown.
       *
       * @param {Event} event - Click event
       * @returns {boolean} Event originated outside dropdown
       ***********************************************************************/

      _clickOriginatedOutsideDropdown (event) {
        return ! this.element.contains(event.target)
      },

      /************************************************************************
       * Returns true if the click event originated inside an external toggle
       * button associated with the dropdown.
       *
       * @param {Event} event - Click event
       * @returns {boolean} Event originated inside external toggle button
       ***********************************************************************/

      _clickOriginatedInExternalToggleElement(event) {
        return this.externalToggleElements.some(el => el == event.target)
      },

      /************************************************************************
       * Handles keydown events broadcast to the dropdown.
       *
       * @param {Event} event - Keydown event
       ***********************************************************************/

      onKeydown (event) {
        switch (event.keyCode) {
          case keyCodes.escape:
            this._handleEscapeKey()
            break

          case keyCodes.up:
            this._handleUpKey(event)
            break

          case keyCodes.down:
            this._handleDownKey(event)
            break

          case keyCodes.tab:
            this._handleTabKey(event)
            break
        }
      },

      /************************************************************************
       * Handles the user pressing the Escape key.
       *
       * @private
       ***********************************************************************/

      _handleEscapeKey () {
        this.close()
        this.primaryToggleElement.focus()
      },

      /************************************************************************
       * Handles the user pressing the Up arrow key.
       *
       * @private
       * @param {Event} event - Keydown event
       ***********************************************************************/

      _handleUpKey (event) {
        event.preventDefault()

        if (!this._eventOriginatedInsideMenu(event)) { return }

        this._focusPreviousMenuItem(event)
      },

      /************************************************************************
       * Moves focus to the previous menu item in response to the given
       * keydown event.
       *
       * @private
       * @param {Event} event - Keydown event
       ***********************************************************************/

      _focusPreviousMenuItem (event) {
        let currentMenuItemIndex

        for (let i = 0; i < this.menuItems.length; i++) {
          if (event.target == this.menuItems[i]) {
            currentMenuItemIndex = i
          }
        }

        const previousItem = this.menuItems[currentMenuItemIndex - 1]

        if (!previousItem && this.lastMenuItem !== undefined) {
          this.lastMenuItem.focus()

          return
        }

        previousItem.focus()
      },

      /************************************************************************
       * Handles the user pressing the Down arrow key.
       *
       * @private
       * @param {Event} event - Keydown event
       ***********************************************************************/

      _handleDownKey (event) {
        event.preventDefault()

        if (!this._isOpen()) { this.open() }

        this._eventOriginatedInsideMenu(event)
          ? this._focusNextMenuItem(event)
          : this.firstMenuItem.focus()
      },

      /************************************************************************
       * Moves focus to the next menu item in response to the given keydown
       * event.
       *
       * @private
       * @param {Event} event - Keydown event
       ***********************************************************************/

      _focusNextMenuItem (event) {
        let currentMenuItemIndex

        for (let i = 0; i < this.menuItems.length; i++) {
          if (event.target == this.menuItems[i]) {
            currentMenuItemIndex = i
          }
        }

        const nextItem = this.menuItems[currentMenuItemIndex + 1]

        if (!nextItem) {
          this.firstMenuItem.focus()

          return
        }

        nextItem.focus()
      },

      /************************************************************************
       * Handles the user pressing the Down arrow key.
       *
       * @private
       * @param {Event} event - Keydown event
       ***********************************************************************/

      _handleTabKey (event) {
        if (!this._eventOriginatedInsideMenu(event)) { return }

        if (this._userTabbedOutOfLastMenuItem(event)) { this.close() }
      },

      /************************************************************************
       * Returns true if the user tabbed out of the last item in the dropdown
       * menu with the given keydown event.
       *
       * @private
       * @param {Event} event - Keydown event
       * @returns {boolean} User tabbed out of last menu item
       ***********************************************************************/

      _userTabbedOutOfLastMenuItem (event) {
        return document.activeElement == this.lastMenuItem && !event.shiftKey
      }
    }
  }
}
