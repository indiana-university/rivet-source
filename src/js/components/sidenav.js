/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'

/******************************************************************************
 * The sidenav component can be used to add a vertical list of navigation
 * links to a sidebar. Sidenavs can contain dropdowns that reveal nested links.
 *
 * @see https://v2.rivet.iu.edu/docs/components/sidenav/
 *****************************************************************************/

export default class Sidenav extends Component {
  
  /****************************************************************************
   * Gets the sidenav's CSS selector.
   *
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    return '[data-rvt-sidenav]'
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
       * Initializes the sidenav.
       ***********************************************************************/

      init () {
        this._initElements()
        this._setInitialChildMenuStates()

        Component.bindMethodToDOMElement(this, 'open', this.open)
        Component.bindMethodToDOMElement(this, 'close', this.close)
      },

      /************************************************************************
       * Initializes sidenav child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        this.childMenuToggleButtons = Array.from(
          this.element.querySelectorAll('[data-rvt-sidenav-toggle]')
        )

        this.childMenus = Array.from(
          this.element.querySelectorAll('[data-rvt-sidenav-list]')
        )
      },

      /************************************************************************
       * Sets the initial state of the sidenav's child menus.
       *
       * @private
       ***********************************************************************/

      _setInitialChildMenuStates () {
        this._setChildMenuDefaultAriaAttributes()
        this._shouldOpenAllChildMenus()
          ? this._openAllChildMenus()
          : this._setChildMenuDefaultStates()
      },

      /************************************************************************
       * Sets the default ARIA attributes for the sidenav's child menus.
       *
       * @private
       ***********************************************************************/

      _setChildMenuDefaultAriaAttributes () {
        this.childMenuToggleButtons.forEach(
          toggleButton => toggleButton.setAttribute('aria-haspopup', 'true')
        )
      },

      /************************************************************************
       * Returns true if all child menus should be opened when the component
       * is added to the DOM.
       *
       * @private
       * @returns {boolean} Child menus should be opened
       ***********************************************************************/

      _shouldOpenAllChildMenus () {
        return this.element.hasAttribute('data-rvt-sidenav-open-all')
      },

      /************************************************************************
       * Opens all child menus.
       *
       * @private
       ***********************************************************************/

      _openAllChildMenus () {
        this.childMenuToggleButtons.forEach((toggleButton, index) => {
          toggleButton.setAttribute('aria-expanded', 'true')
          this.childMenus[index].removeAttribute('hidden')
        })
      },

      /************************************************************************
       * Sets the default open/closed state for each child menu based on
       * the ARIA attributes set by the developer.
       *
       * @private
       ***********************************************************************/

      _setChildMenuDefaultStates () {
        this.childMenuToggleButtons.forEach((element, index) => {
          if (element.getAttribute('aria-expanded') === 'true') {
            this.childMenus[index].removeAttribute('hidden')
          } else {
            element.setAttribute('aria-expanded', 'false')
            this.childMenus[index].setAttribute('hidden', '')
          }
        })
      },

      /************************************************************************
       * Called when the sidenav is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)
      },

      /************************************************************************
       * Called when the sidenav is removed from the DOM.
       ***********************************************************************/

      disconnected () {
        Component.dispatchComponentRemovedEvent(this.element)
      },

      /************************************************************************
       * Handles click events broadcast to the sidenav.
       *
       * @param {Event} event - Click event
       ***********************************************************************/

      onClick (event) {
        if (!this._clickOriginatedInChildMenuToggleButton(event)) { return }

        this._setChildMenuToToggle(event)

        if (!this._childMenuToToggleExists()) { return }

        this._childMenuToToggleIsOpen()
          ? this.close(this.childMenuToToggleId)
          : this.open(this.childMenuToToggleId)
      },

      /************************************************************************
       * Returns true if the given click event originated inside one of the
       * sidenav's child menu toggle buttons.
       *
       * @private
       * @param {Event} event - Click event
       * @returns {boolean} Click originated inside child menu toggle button
       ***********************************************************************/

      _clickOriginatedInChildMenuToggleButton (event) {
        return event.target.closest('[data-rvt-sidenav-toggle]')
      },

      /************************************************************************
       * Sets references to the child menu to be toggled by the given click
       * event. These references are used by other click handler submethods.
       *
       * @private
       * @param {Event} event - Click event
       ***********************************************************************/

      _setChildMenuToToggle (event) {
        this.childMenuToToggleId = event.target
          .closest('[data-rvt-sidenav-toggle]')
          .dataset.rvtSidenavToggle

        this.childMenuToToggle = this.element.querySelector(
          `[data-rvt-sidenav-list="${this.childMenuToToggleId}"]`
        )
      },

      /************************************************************************
       * Returns true if the child menu to be toggled by a click event actually
       * exists in the DOM.
       *
       * @private
       * @returns {boolean} Child menu exists
       ***********************************************************************/

      _childMenuToToggleExists () {
        return this.childMenuToToggle &&
               this.childMenuToToggle.getAttribute('data-rvt-sidenav-list') !== ''
      },

      /************************************************************************
       * Returns true if the child menu to be toggled by a click event is open.
       *
       * @private
       * @returns {boolean} Child menu is open
       ***********************************************************************/

      _childMenuToToggleIsOpen () {
        return !this.childMenuToToggle.hasAttribute('hidden')
      },

      /************************************************************************
       * Opens the child menu with the given data-rvt-sidenav-list ID value.
       *
       * @private
       * @param {string} childMenuId - Child menu ID
       ***********************************************************************/

      open (childMenuId) {
        this._setChildMenuToOpen(childMenuId)

        if (!this._childMenuExists(childMenuId)) {
          console.warn(`No such subnav child menu '${childMenuId}' in open()`)
          return
        }

        if (!this._eventDispatched('sidenavListOpened', this.childMenuToOpen)) { return }

        this._openChildMenu()
      },

      /************************************************************************
       * Sets references to the child menu to be opened. These references are
       * used by other submethods.
       *
       * @private
       * @param {string} childMenuId - Child menu ID
       ***********************************************************************/

      _setChildMenuToOpen (childMenuId) {
        this.childMenuToOpenToggleButton = this.element.querySelector(
          `[data-rvt-sidenav-toggle="${childMenuId}"]`
        )

        this.childMenuToOpen = this.element.querySelector(
          `[data-rvt-sidenav-list="${childMenuId}"]`
        )
      },

      /************************************************************************
       * Expands the child menu to be opened.
       *
       * @private
       ***********************************************************************/

      _openChildMenu () {
        this.childMenuToOpenToggleButton.setAttribute('aria-expanded', 'true')
        this.childMenuToOpen.removeAttribute('hidden')
      },

      /************************************************************************
       * Closes the child menu with the given data-rvt-sidenav-list ID value.
       *
       * @private
       * @param {string} childMenuId - Child menu ID
       ***********************************************************************/

      close (childMenuId) {
        this._setChildMenuToClose(childMenuId)

        if (!this._childMenuExists(childMenuId)) {
          console.warn(`No such subnav child menu '${childMenuId}' in close()`)
          return
        }

        if (!this._eventDispatched('sidenavListClosed', this.childMenuToClose)) { return }

        this._closeChildMenu()
      },

      /************************************************************************
       * Sets references to the child menu to be closed. These references are
       * used by other submethods.
       *
       * @private
       * @param {string} childMenuId - Child menu ID
       ***********************************************************************/

      _setChildMenuToClose (childMenuId) {
        this.childMenuToCloseToggleButton = this.element.querySelector(
          `[data-rvt-sidenav-toggle="${childMenuId}"]`
        )

        this.childMenuToClose = this.element.querySelector(
          `[data-rvt-sidenav-list="${childMenuId}"]`
        )
      },

      /************************************************************************
       * Collapses the child menu to be closed.
       *
       * @private
       ***********************************************************************/

      _closeChildMenu () {
        this.childMenuToCloseToggleButton.setAttribute('aria-expanded', 'false')
        this.childMenuToClose.setAttribute('hidden', '')
      },

      /************************************************************************
       * Returns true if a child menu with the given ID exists.
       *
       * @private
       * @returns {boolean} Child menu exists
       ***********************************************************************/

      _childMenuExists (childMenuId) {
        const childMenuToggleButton = this.element.querySelector(
          `[data-rvt-sidenav-toggle="${childMenuId}"]`
        )

        const childMenu = this.element.querySelector(
          `[data-rvt-sidenav-list="${childMenuId}"]`
        )

        return childMenuToggleButton && childMenu
      },

      /************************************************************************
       * Returns true if the custom event with the given name was successfully
       * dispatched.
       *
       * @private
       * @param {string} name - Event name
       * @returns {boolean} Event successfully dispatched
       ***********************************************************************/

      // FIXME: Violates command-query separation and side-effects rules.

      _eventDispatched (name, childMenu) {
        const dispatched = Component.dispatchCustomEvent(
          name,
          this.element,
          { list: childMenu }
        )

        return dispatched
      }
    }
  }
}
