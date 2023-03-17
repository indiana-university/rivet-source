/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
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
        this._initProperties()
        this._initAttributes()

        Component.bindMethodToDOMElement(this, 'activateTab', this.activateTab)
        Component.bindMethodToDOMElement(this, 'addTab', this.addTab)
        Component.bindMethodToDOMElement(this, 'removeTab', this.removeTab)
      },

      /************************************************************************
       * Initializes tabs component child element selectors.
       *
       * @private
       ***********************************************************************/

      _initSelectors () {
        this.tabAttribute = 'data-rvt-tab'
        this.panelAttribute = 'data-rvt-tab-panel'

        this.tabSelector = `[${this.tabAttribute}]`
        this.panelSelector = `[${this.panelAttribute}]`
        this.tablistSelector = '[data-rvt-tablist]'
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

        // The data-rvt-tablist attribute was added in Rivet 2.4.0. To maintain
        // backward compatibility, the code below infers which element is the
        // tablist if the data-rvt-tablist attribute is not present.

        if (!this.tablist) {
          this.tablist = this.tabs[0].parentElement
        }
      },

      /************************************************************************
       * Initializes tabs state properties.
       *
       * @private
       ***********************************************************************/

      _initProperties () {
        this.activeTab = null
      },

      /************************************************************************
       * Initializes dialog attributes.
       *
       * @private
       ***********************************************************************/

      _initAttributes () {
        this._assignComponentElementIds()
        this._setAriaAttributes()
      },

      /************************************************************************
       * Assigns a random ID to the tabs component if an ID was not already
       * specified in the markup.
       *
       * @private
       ***********************************************************************/

      _assignComponentElementIds () {
        this._assignTabIds()
        this._assignPanelIds()
      },

      /************************************************************************
       * Assigns a random ID to each tab.
       *
       * @private
       ***********************************************************************/

      _assignTabIds () {
        this.tabs.forEach(tab => {
          const existingTabId = tab.getAttribute('data-rvt-tab')

          if (!existingTabId) {
            Component.setAttributeIfNotSpecified(tab, 'data-rvt-tab', Component.generateUniqueId())
            Component.setAttributeIfNotSpecified(tab, 'id', Component.generateUniqueId())
          }
        })
      },

      /************************************************************************
       * Assigns a random ID to each panel.
       *
       * @private
       ***********************************************************************/

      _assignPanelIds () {
        const numPanels = this.panels.length

        for (let i = 0; i < numPanels; i++) {
          const tab = this.tabs[i]
          const panel = this.panels[i]
          const panelId = tab.getAttribute('data-rvt-tab')

          Component.setAttributeIfNotSpecified(panel, 'data-rvt-tab-panel', panelId)
          Component.setAttributeIfNotSpecified(panel, 'id', panelId)
        }
      },

      /************************************************************************
       * Sets the tabs component's ARIA attributes.
       *
       * @private
       ***********************************************************************/

      _setAriaAttributes () {
        this.tablist.setAttribute('role', 'tablist')
        this.tabs.forEach(tab => tab.setAttribute('role', 'tab'))
        this.panels.forEach(panel => {
          panel.setAttribute('role', 'tabpanel')
          panel.setAttribute('tabindex', 0)
        })

        for (let i = 0; i < this.tabs.length; i++) {
          const tab = this.tabs[i]
          const panel = this.panels[i]
          const id = tab.getAttribute('id')

          panel.setAttribute('aria-labelledby', id)
        }
      },

      /************************************************************************
       * Called when the tabs component is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)
        Component.watchForDOMChanges(this)

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
        Component.stopWatchingForDOMChanges(this)
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
            event.preventDefault()
            this._focusPreviousTab()
            break

          case keyCodes.right:
            event.preventDefault()
            this._focusNextTab()
            break

          case keyCodes.home:
            event.preventDefault()
            this._focusFirstTab()
            break

          case keyCodes.end:
            event.preventDefault()
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
       * Activates the tab with the given ID or index.
       *
       * @param {string|number} idOrIndex - ID or index of tab to activate
       ***********************************************************************/

      activateTab (idOrIndex) {
        const id = this._tabIndexWasPassed(idOrIndex)
          ? this._getTabIdFromIndex(idOrIndex)
          : idOrIndex

        this._setTabToActivate(id)

        if (!this._tabToActivateExists()) {
          console.warn(`No such tab '${id}' in activateTab()`)
          return
        }

        if (!this._tabActivatedEventDispatched()) { return }

        this._deactivateUnselectedTabs()
        this._activateSelectedTab()
      },

      /************************************************************************
       * Activates the tab with the given ID or index.
       *
       * @param {string|number} idOrIndex - ID or index of tab to activate
       ***********************************************************************/

      _tabIndexWasPassed (idOrIndex) {
        return typeof idOrIndex === 'number'
      },

      /************************************************************************
       * Gets the ID of the tab at the given index.
       *
       * @private
       * @param {number} index - Tab index
       ***********************************************************************/

      _getTabIdFromIndex (index) {
        return this.tabs[index]
          ? this.tabs[index].getAttribute(this.tabAttribute)
          : null
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
          'TabActivated',
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
        return panel.getAttribute(this.panelAttribute) === this.panelToActivate.dataset.rvtTabPanel
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

        this.activeTab = this.tabToActivate
      },

      /************************************************************************
       * Adds a tab with the given label to the component, along with its
       * associated panel. Returns an object with references to both the added
       * tab and panel:
       *
       * `{ tab: HTMLElement, panel: HTMLElement }`
       *
       * @param {string} label - Tab label
       * @returns {object} Added tab and panel
       ***********************************************************************/

      addTab (label) {
        const tab = this._createNewTabElement(label)
        const panel = this._createNewPanelElement(tab)

        if (!this._tabAddedEventDispatched(tab, panel)) { return }

        this.tablist.appendChild(tab)
        this.element.appendChild(panel)

        return { tab, panel }
      },

      /************************************************************************
       * Creates a new tab element to be added to the component.
       *
       * @private
       * @param {string} label - Tab label
       * @returns {HTMLElement} Tab to add
       ***********************************************************************/

      _createNewTabElement (label) {
        const tab = document.createElement('button')
        tab.textContent = label
        tab.classList.add('rvt-tabs__tab')
        tab.setAttribute(this.tabAttribute, Component.generateUniqueId())
        tab.setAttribute('id', Component.generateUniqueId())
        tab.setAttribute('role', 'tab')
        tab.setAttribute('aria-selected', false)
        tab.setAttribute('tabindex', -1)

        return tab
      },

      /************************************************************************
       * Creates a new tab panel element to be added to the component.
       *
       * @private
       * @param {HTMLElement} tab - Tab associated with panel to create
       * @returns {HTMLElement} Panel to add
       ***********************************************************************/

      _createNewPanelElement (tab) {
        const panel = document.createElement('div')
        panel.classList.add('rvt-tabs__panel')
        panel.setAttribute(this.panelAttribute, tab.getAttribute(this.tabAttribute))
        panel.setAttribute('id', tab.getAttribute(this.tabAttribute))
        panel.setAttribute('role', 'tabpanel')
        panel.setAttribute('tabindex', 0)
        panel.setAttribute('aria-labelledby', tab.getAttribute('id'))
        panel.setAttribute('hidden', true)

        return panel
      },

      /************************************************************************
       * Returns true if the custom "tab added" event was successfully
       * dispatched.
       *
       * @private
       * @param {HTMLElement} tab - Added tab
       * @param {HTMLElement} panel - Panel associated with added tab
       * @returns {boolean} Event successfully dispatched
       ***********************************************************************/

      _tabAddedEventDispatched (tab, panel) {
        const dispatched = Component.dispatchCustomEvent(
          'TabAdded',
          this.element,
          { tab, panel }
        )

        return dispatched
      },

      /************************************************************************
       * Removes a tab with the given ID or index value.
       *
       * @param {string|number} idOrIndex - ID or index of tab to remove
       ***********************************************************************/

      removeTab (idOrIndex) {
        const id = this._tabIndexWasPassed(idOrIndex)
          ? this._getTabIdFromIndex(idOrIndex)
          : idOrIndex

        this._setTabToRemove(id)

        if (!this._tabToRemoveExists()) {
          console.warn(`No such tab '${id}' in removeTab()`)
          return
        }

        if (!this._tabRemovedEventDispatched()) { return }

        if (this._removedTabWasActiveTab()) {
          this._activateTabNearestToRemovedTab()
        }

        this._removeTab()
      },

      /************************************************************************
       * Updates the component's state to store references to the tab to
       * remove. Used by tab removal submethods to validate a tab removal
       * request and determine which panels should be removed from the DOM.
       *
       * @private
       * @param {string} tabId - ID of tab to remove
       ***********************************************************************/

      _setTabToRemove (tabId) {
        this.tabToRemove = this.element.querySelector(`[${this.tabAttribute}="${tabId}"]`)
        this.panelToRemove = this.element.querySelector(`[${this.panelAttribute} = "${tabId}"]`)
      },

      /************************************************************************
       * Returns true if the tab to activate actually exists in the DOM.
       *
       * @private
       * @returns {boolean} Tab to remove exists
       ***********************************************************************/

      _tabToRemoveExists () {
        return this.tabToRemove && this.panelToRemove
      },

      /************************************************************************
       * Returns true if the custom "tab removed" event was successfully
       * dispatched.
       *
       * @private
       * @returns {boolean} Event successfully dispatched
       ***********************************************************************/

      _tabRemovedEventDispatched () {
        const dispatched = Component.dispatchCustomEvent(
          'TabRemoved',
          this.element,
          {
            tab: this.tabToRemove,
            panel: this.panelToRemove
          }
        )

        return dispatched
      },

      /************************************************************************
       * Returns true if the removed tab was the active tab.
       *
       * @private
       * @returns {boolean} Removed tab was active tab
       ***********************************************************************/

      _removedTabWasActiveTab () {
        return this.tabToRemove === this.activeTab
      },

      /************************************************************************
       * Activates the tab nearest to the removed tab.
       *
       * @private
       ***********************************************************************/

      _activateTabNearestToRemovedTab () {
        const previousTab = this.tabToRemove.previousElementSibling
        const nextTab = this.tabToRemove.nextElementSibling

        if (previousTab) {
          this.activateTab(previousTab.dataset.rvtTab)
        } else if (nextTab) {
          this.activateTab(nextTab.dataset.rvtTab)
        }
      },

      /************************************************************************
       * Deletes from the DOM the tab and panel marked for removal.
       *
       * @private
       ***********************************************************************/

      _removeTab () {
        this.tabToRemove.remove()
        this.panelToRemove.remove()
      }
    }
  }
}
