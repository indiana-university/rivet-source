/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
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
        this._initSelectors()
        this._initElements()
        this._initAttributes()
        this._setInitialChildMenuStates()

        Component.bindMethodToDOMElement(this, 'open', this.open)
        Component.bindMethodToDOMElement(this, 'close', this.close)
      },

      /************************************************************************
       * Initializes sidenav child element selectors.
       *
       * @private
       ***********************************************************************/

      _initSelectors () {
        this.toggleAttribute = 'data-rvt-sidenav-toggle'
        this.childMenuAttribute = 'data-rvt-sidenav-list'

        this.toggleSelector = `[${this.toggleAttribute}]`
        this.childMenuSelector = `[${this.childMenuAttribute}]`
      },

      /************************************************************************
       * Initializes sidenav child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        this.childMenuToggleButtons = Array.from(
          this.element.querySelectorAll(this.toggleSelector)
        )

        this.childMenus = Array.from(
          this.element.querySelectorAll(this.childMenuSelector)
        )
      },

      /************************************************************************
       * Initializes sidenav attributes.
       *
       * @private
       ***********************************************************************/

      _initAttributes () {
        this._assignComponentElementIds()
      },

      /************************************************************************
       * Assigns random IDs to each toggle button and child menu if one was
       * not already provided in the markup.
       *
       * @private
       ***********************************************************************/

      _assignComponentElementIds () {
        this._assignToggleIds()
        this._assignChildMenuIds()
      },

      /************************************************************************
       * Assigns a random ID to each toggle.
       *
       * @private
       ***********************************************************************/

      _assignToggleIds () {
        this.childMenuToggleButtons.forEach(toggle => {
          Component.setAttributeIfNotSpecified(toggle, this.toggleAttribute, Component.generateUniqueId())
        })
      },

      /************************************************************************
       * Assigns a random ID to each child menu.
       *
       * @private
       ***********************************************************************/

      _assignChildMenuIds () {
        const numMenus = this.childMenus.length

        for (let i = 0; i < numMenus; i++) {
          const toggle = this.childMenuToggleButtons[i]
          const menu = this.childMenus[i]
          const menuId = toggle.getAttribute(this.toggleAttribute)

          Component.setAttributeIfNotSpecified(menu, this.childMenuAttribute, menuId)
        }
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
        Component.watchForDOMChanges(this)
      },

      /************************************************************************
       * Called when the sidenav is removed from the DOM.
       ***********************************************************************/

      disconnected () {
        Component.dispatchComponentRemovedEvent(this.element)
        Component.stopWatchingForDOMChanges(this)
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
        return event.target.closest(this.toggleSelector)
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
          .closest(this.toggleSelector)
          .dataset.rvtSidenavToggle

        this.childMenuToToggle = this.element.querySelector(
          `[${this.childMenuAttribute} = "${this.childMenuToToggleId}"]`
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
               this.childMenuToToggle.getAttribute(this.childMenuAttribute) !== ''
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
       * @param {string} childMenuId - Child menu ID
       ***********************************************************************/

      open (childMenuId) {
        this._setChildMenuToOpen(childMenuId)

        if (!this._childMenuExists(childMenuId)) {
          console.warn(`No such subnav child menu '${childMenuId}' in open()`)
          return
        }

        if (!this._eventDispatched('SidenavListOpened', this.childMenuToOpen)) { return }

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
          `[${this.toggleAttribute} = "${childMenuId}"]`
        )

        this.childMenuToOpen = this.element.querySelector(
          `[${this.childMenuAttribute} = "${childMenuId}"]`
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
       * @param {string} childMenuId - Child menu ID
       ***********************************************************************/

      close (childMenuId) {
        this._setChildMenuToClose(childMenuId)

        if (!this._childMenuExists(childMenuId)) {
          console.warn(`No such subnav child menu '${childMenuId}' in close()`)
          return
        }

        if (!this._eventDispatched('SidenavListClosed', this.childMenuToClose)) { return }

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
          `[${this.toggleAttribute} = "${childMenuId}"]`
        )

        this.childMenuToClose = this.element.querySelector(
          `[${this.childMenuAttribute} = "${childMenuId}"]`
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
          `[${this.toggleAttribute} = "${childMenuId}"]`
        )

        const childMenu = this.element.querySelector(
          `[${this.childMenuAttribute} = "${childMenuId}"]`
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
