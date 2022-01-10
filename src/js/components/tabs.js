/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'
import keyCodes from '../utilities/keyCodes'

/******************************************************************************
 * The tabs component allows the user to switch between related groups of
 * content without having to leave the page.
 *
 * @see https://v2.rivet.iu.edu/docs/components/tabs/
 *****************************************************************************/

export default class Tabs extends Component {

  /****************************************************************************
   * Gets the tabs component's CSS selector.
   *
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    return '[data-rvt-tabs]'
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
       * Initializes the tabs component.
       ***********************************************************************/

      init () {
        this._initSelectors()
        this._initElements()

        Component.bindMethodToDOMElement(this, 'activateTab', this.activateTab)
      },

      /************************************************************************
       * Initializes tabs component child element selectors.
       *
       * @private
       ***********************************************************************/

      _initSelectors () {
        this.tabAttribute = `data-rvt-tab`
        this.panelAttribute = `data-rvt-tab-panel`

        this.tabSelector = `[${this.tabAttribute}]`
        this.panelSelector = `[${this.panelAttribute}]`
        this.tablistSelector = '[role="tablist"]'
        this.initialTabSelector = '[data-rvt-tab-init]'
      },

      /************************************************************************
       * Initializes tabs component child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        this.tablist = this.element.querySelector(this.tablistSelector)
        this.tabs = Array.from(this.element.querySelectorAll(this.tabSelector))
        this.panels = Array.from(this.element.querySelectorAll(this.panelSelector))
      },

      /************************************************************************
       * Called when the tabs component is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)

        this._activateInitialTab()
      },

      /************************************************************************
       * Activates the tabs component's initial tab. Defaults to the first tab
       * in the component unless the data-rvt-tab-init attribute is used.
       *
       * @private
       ***********************************************************************/

      _activateInitialTab () {
        const initialTab = this.element.querySelector(this.initialTabSelector)
        const firstTab = this.panels[0]

        initialTab
          ? this.activateTab(initialTab.getAttribute(this.panelAttribute))
          : this.activateTab(firstTab.getAttribute(this.panelAttribute))
      },

      /************************************************************************
       * Called when the tabs component is removed from the DOM.
       ***********************************************************************/

      disconnected () {
        Component.dispatchComponentRemovedEvent(this.element)
      },

      /************************************************************************
       * Handles click events broadcast to the tabs component.
       *
       * @param {Event} event - Click event
       ***********************************************************************/

      onClick (event) {
        if (!this._eventOriginatedInsideTab(event)) { return }

        this.activateTab(this._getClickedTabId(event))
      },

      /************************************************************************
       * Returns true if the given event originated inside a tab.
       *
       * @private
       * @param {Event} event - Event
       * @returns {boolean} Event originated inside a tab
       ***********************************************************************/

      _eventOriginatedInsideTab (event) {
        return event.target.closest(this.tabSelector)
      },

      /************************************************************************
       * Returns the ID of the clicked tab.
       *
       * @private
       * @param {Event} event - Click event
       * @returns {string} Clicked tab ID
       ***********************************************************************/

      _getClickedTabId (event) {
        return event.target.closest(this.tabSelector).getAttribute(this.tabAttribute)
      },

      /************************************************************************
       * Handles keydown events broadcast to the tabs component.
       *
       * @param {Event} event - Keydown event
       ***********************************************************************/

      onKeydown (event) {
        if (!this._eventOriginatedInsideTab(event)) { return }

        this._setNeighboringTabIndexes(event)

        switch (event.keyCode) {
          case keyCodes.left:
            this._focusPreviousTab()
            break

          case keyCodes.right:
            this._focusNextTab()
            break

          case keyCodes.home:
            this._focusFirstTab()
            break

          case keyCodes.end:
            this._focusLastTab()
            break
        }
      },

      /************************************************************************
       * Sets the indexes of the tab before and after the one from which the
       * given keydown event originated. Used to determine which tabs should
       * receive focus when the left and right arrow keys are pressed.
       *
       * @private
       * @param {Event} event - Keydown event
       ***********************************************************************/

      _setNeighboringTabIndexes (event) {
        const currentTab = event.target.closest(this.tabSelector)

        this.previousTabIndex = this.tabs.indexOf(currentTab) - 1
        this.nextTabIndex = this.tabs.indexOf(currentTab) + 1
      },

      /************************************************************************
       * Moves focus to the tab before the one that currently has focus. If
       * focus is currently on the first tab, move focus to the last tab.
       *
       * @private
       ***********************************************************************/

      _focusPreviousTab () {
        this.tabs[this.previousTabIndex]
          ? this.tabs[this.previousTabIndex].focus()
          : this.tabs[this.tabs.length - 1].focus()
      },

      /************************************************************************
       * Moves focus to the tab after the one that currently has focus. If
       * focus is currently on the last tab, move focus to the first tab.
       *
       * @private
       ***********************************************************************/

      _focusNextTab () {
        this.tabs[this.nextTabIndex]
          ? this.tabs[this.nextTabIndex].focus()
          : this.tabs[0].focus()
      },

      /************************************************************************
       * Moves focus to the first tab.
       *
       * @private
       ***********************************************************************/

      _focusFirstTab () {
        this.tabs[0].focus()
      },

      /************************************************************************
       * Moves focus to the last tab.
       *
       * @private
       ***********************************************************************/

      _focusLastTab () {
        this.tabs[this.tabs.length - 1].focus()
      },

      /************************************************************************
       * Activates the tab with the given ID.
       *
       * @param {string} tabId - ID of tab to activate
       ***********************************************************************/

      activateTab (tabId) {
        this._setTabToActivate(tabId)

        if (!this._tabToActivateExists()) {
          console.warn(`No such tab '${tabId}' in activateTab()`)
          return
        }

        if (!this._tabActivatedEventDispatched()) { return }

        this._deactivateUnselectedTabs()
        this._activateSelectedTab()
      },

      /************************************************************************
       * Updates the component's state to store references to the tab to
       * activate. Used by tab activation submethods to validate a tab
       * activation request and determine which panels should be shown or
       * hidden.
       *
       * @private
       * @param {string} tabId - ID of tab to activate
       ***********************************************************************/

      _setTabToActivate (tabId) {
        this.tabToActivate = this.element.querySelector(`[${this.tabAttribute} = "${tabId}"]`)
        this.panelToActivate = this.element.querySelector(`[${this.panelAttribute} = "${tabId}"]`)
      },

      /************************************************************************
       * Returns true if the tab to activate actually exists in the DOM.
       *
       * @private
       * @returns {boolean} Tab to activate exists
       ***********************************************************************/

      _tabToActivateExists () {
        return this.tabToActivate && this.panelToActivate
      },

      /************************************************************************
       * Returns true if the custom "tab activated" event was successfully
       * dispatched.
       *
       * @private
       * @returns {boolean} Event successfully dispatched
       ***********************************************************************/

      _tabActivatedEventDispatched () {
        const dispatched = Component.dispatchCustomEvent(
          'tabActivated',
          this.element,
          { tab: this.panelToActivate }
        )

        return dispatched
      },

      /************************************************************************
       * Deactivates all tabs that aren't the selected tab to activate.
       *
       * @private
       ***********************************************************************/

      _deactivateUnselectedTabs () {
        this.panels.forEach((panel, index) => {
          if (!this._panelShouldBeActivated(panel)) {
            this._deactivateTab(panel, index)
          }
        })
      },

      /************************************************************************
       * Returns true if the given panel should be activated.
       *
       * @private
       * @param {HTMLElement} panel - Panel element
       * @returns {boolean} Panel should be activated
       ***********************************************************************/

      _panelShouldBeActivated (panel) {
        panel.getAttribute(this.panelAttribute) !== this.panelToActivate.dataset.rvtTabPanel
      },

      /************************************************************************
       * Deactivates the given tab.
       *
       * @private
       * @param {HTMLElement} panel - Panel element to hide
       * @param {string} tabIndex - Index of tab to deactivate
       ***********************************************************************/

      _deactivateTab (panel, tabIndex) {
        panel.setAttribute('hidden', '')
        this.tabs[tabIndex].setAttribute('aria-selected', 'false')
        this.tabs[tabIndex].setAttribute('tabindex', '-1')
      },

      /************************************************************************
       * Activates the currently selected tab.
       *
       * @private
       ***********************************************************************/

      _activateSelectedTab () {
        this.tabToActivate.setAttribute('aria-selected', 'true')
        this.tabToActivate.removeAttribute('tabindex')
        this.panelToActivate.removeAttribute('hidden')
      }
    }
  }
}
