/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'
import keyCodes from '../utilities/keyCodes'

/******************************************************************************
 * The accordion component can be used to group content into sections that can
 * be opened and closed.
 *
 * @see https://v2.rivet.iu.edu/docs/components/accordion/
 *****************************************************************************/

export default class Accordion extends Component {

  /****************************************************************************
   * Gets the accordion's CSS selector.
   *
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    return '[data-rvt-accordion]'
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
       * Initializes the accordion.
       ***********************************************************************/

      init () {
        this._initElements()
        this._setInitialPanelStates()

        Component.bindMethodToDOMElement(this, 'open', this.open)
        Component.bindMethodToDOMElement(this, 'close', this.close)
      },

      /************************************************************************
       * Initializes accordion child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        this.triggers = Array.from(
          this.element.querySelectorAll('[data-rvt-accordion-trigger]')
        )

        this.panels = Array.from(
          this.element.querySelectorAll('[data-rvt-accordion-panel]')
        )
      },

      /************************************************************************
       * Sets the initial state of the accordion's panels.
       *
       * @private
       ***********************************************************************/

      _setInitialPanelStates () {
        this._shouldOpenAllPanels()
          ? this._openAllPanels()
          : this._setPanelDefaultStates()
      },

      /************************************************************************
       * Returns true if all panels should be opened when the component is
       * added to the DOM.
       *
       * @private
       * @returns {boolean} Panels should be opened
       ***********************************************************************/

      _shouldOpenAllPanels () {
        return this.element.hasAttribute('data-rvt-accordion-open-all')
      },

      /************************************************************************
       * Opens all panels.
       *
       * @private
       ***********************************************************************/

      _openAllPanels () {
        this.panels.forEach((panel, index) => this._openPanel(index))
      },

      /************************************************************************
       * Sets the default open/closed state for each panel based on the ARIA
       * attributes set by the developer.
       *
       * @private
       ***********************************************************************/

      _setPanelDefaultStates () {
        this.panels.forEach(panel => {
          this._panelShouldBeOpen(panel)
            ? this.open(panel.getAttribute('data-rvt-accordion-panel'))
            : this.close(panel.getAttribute('data-rvt-accordion-panel'))
        })
      },

      /************************************************************************
       * Returns true of the given panel element should be opened on page load.
       *
       * @private
       * @param {HTMLElement} panel - Panel DOM element
       * @returns {boolean} Panel should be opened
       ***********************************************************************/

      _panelShouldBeOpen (panel) {
        return panel.hasAttribute('data-rvt-accordion-panel-init')
      },

      /************************************************************************
       * Called when the accordion is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)
      },

      /************************************************************************
       * Called when the accordion is removed from the DOM.
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
        if (!this._clickOriginatedInTrigger(event)) { return }

        this._setTriggerToToggle(event)

        this._triggerToToggleIsOpen()
          ? this.close(this.triggerToToggleId)
          : this.open(this.triggerToToggleId)
      },

      /************************************************************************
       * Returns true if the given click event originated inside one of the
       * accordion's panel triggers.
       *
       * @private
       * @param {Event} event - Click event
       * @returns {boolean} Click originated inside panel trigger
       ***********************************************************************/

      _clickOriginatedInTrigger (event) {
        return event.target.closest('[data-rvt-accordion-trigger]')
      },

      /************************************************************************
       * Sets references to the panel trigger to be toggled by the given click
       * event. These references are used by other click handler submethods.
       *
       * @private
       * @param {Event} event - Click event
       ***********************************************************************/

      _setTriggerToToggle (event) {
        this.triggerToToggle = event.target.closest('[data-rvt-accordion-trigger]')
        this.triggerToToggleId = this.triggerToToggle.getAttribute('data-rvt-accordion-trigger')
      },

      /************************************************************************
       * Returns true if the panel trigger to toggle is already open.
       *
       * @private
       * @returns {boolean} Click originated inside panel trigger
       ***********************************************************************/

      _triggerToToggleIsOpen () {
        return this.triggerToToggle.getAttribute('aria-expanded') === 'true'
      },

      /************************************************************************
       * Handles keydown events broadcast to the accordion.
       *
       * @param {Event} event - Keydown event
       ***********************************************************************/

      onKeydown (event) {
        if (!this._keydownOriginatedInTrigger(event)) { return }

        this._setNeighboringTriggerIndexes(event)

        switch (event.keyCode) {
          case keyCodes.up:
            this._focusPreviousTrigger()
            break

          case keyCodes.down:
            this._focusNextTrigger()
            break

          case keyCodes.home:
            this._focusFirstTrigger()
            break

          case keyCodes.end:
            this._focusLastTrigger()
            break
        }
      },

      /************************************************************************
       * Returns true if the given keydown event originated inside one of the
       * accordion's panel triggers.
       *
       * @private
       * @param {Event} event - Keydown event
       * @returns {boolean} Keydown originated inside panel trigger
       ***********************************************************************/

      _keydownOriginatedInTrigger (event) {
        return event.target.closest('[data-rvt-accordion-trigger]')
      },

      /************************************************************************
       * Sets the indexes of the panel trigger before and after the one from
       * which the given keydown event originated. Used to determine which
       * panel trigger should receive focus when the up and down arrow keys
       * are pressed.
       *
       * @private
       * @param {Event} event - Keydown event
       ***********************************************************************/

      _setNeighboringTriggerIndexes (event) {
        const currentTrigger = event.target.closest('[data-rvt-accordion-trigger]')

        this.previousTriggerIndex = this.triggers.indexOf(currentTrigger) - 1
        this.nextTriggerIndex = this.triggers.indexOf(currentTrigger) + 1
      },

      /************************************************************************
       * Moves focus to the panel trigger before the one that currently has
       * focus. If focus is currently on the first trigger, move focus to the
       * last trigger.
       *
       * @private
       ***********************************************************************/

      _focusPreviousTrigger () {
        this.triggers[this.previousTriggerIndex]
          ? this.triggers[this.previousTriggerIndex].focus()
          : this.triggers[this.triggers.length - 1].focus()
      },

      /************************************************************************
       * Moves focus to the panel trigger after the one that currently has
       * focus. If focus is currently on the last trigger, move focus to the
       * first trigger.
       *
       * @private
       ***********************************************************************/

      _focusNextTrigger () {
        this.triggers[this.nextTriggerIndex]
          ? this.triggers[this.nextTriggerIndex].focus()
          : this.triggers[0].focus()
      },

      /************************************************************************
       * Moves focus to the first panel trigger.
       *
       * @private
       ***********************************************************************/

      _focusFirstTrigger () {
        this.triggers[0].focus()
      },

      /************************************************************************
       * Moves focus to the last panel trigger.
       *
       * @private
       ***********************************************************************/

      _focusLastTrigger () {
        this.triggers[this.triggers.length - 1].focus()
      },

      /************************************************************************
       * Opens the panel with the given data-rvt-accordion-panel ID value.
       *
       * @param {string} childMenuId - Panel ID
       ***********************************************************************/

      open (panelId) {
        this._setPanelToOpen(panelId)

        if (!this._panelToOpenExists()) {
          console.warn(`No such accordion panel '${panelId}' in open()`)
          return
        }

        if (!this._eventDispatched('accordionOpened', this.panelToOpen)) { return }

        this._openPanel()
      },

      /************************************************************************
       * Sets references to the panel to be opened. These references are used
       * by other submethods.
       *
       * @private
       * @param {string} panelId - Panel ID
       ***********************************************************************/

      _setPanelToOpen (panelId) {
        this.triggerToOpen = this.element.querySelector(
          `[data-rvt-accordion-trigger = "${panelId}"]`
        )

        this.panelToOpen = this.element.querySelector(
          `[data-rvt-accordion-panel="${panelId}"]`
        )
      },

      /************************************************************************
       * Returns true if the panel to open actually exists in the DOM.
       *
       * @private
       * @returns {boolean} Panel to open exists
       ***********************************************************************/

      _panelToOpenExists () {
        return this.panelToOpen
      },

      /************************************************************************
       * Expands the accordion panel to be opened.
       *
       * @private
       ***********************************************************************/

      _openPanel () {
        this.triggerToOpen.setAttribute('aria-expanded', 'true')
        this.panelToOpen.removeAttribute('hidden')
      },

      /************************************************************************
       * Closes the panel with the given data-rvt-accordion-panel ID value.
       *
       * @param {string} childMenuId - Panel ID
       ***********************************************************************/

      close (panelId) {
        this._setPanelToClose(panelId)

        if (!this._panelToCloseExists()) {
          console.warn(`No such accordion panel '${panelId}' in close()`)
          return
        }

        if (!this._eventDispatched('accordionClosed', this.panelToClose)) { return }

        this._closePanel()
      },

      /************************************************************************
       * Sets references to the panel to be closed. These references are used
       * by other submethods.
       *
       * @private
       * @param {string} panelId - Panel ID
       ***********************************************************************/

      _setPanelToClose (panelId) {
        this.triggerToClose = this.element.querySelector(
          `[data-rvt-accordion-trigger = "${panelId}"]`
        )

        this.panelToClose = this.element.querySelector(
          `[data-rvt-accordion-panel="${panelId}"]`
        )
      },

      /************************************************************************
       * Returns true if the panel to close actually exists in the DOM.
       *
       * @private
       * @returns {boolean} Panel to close exists
       ***********************************************************************/

      _panelToCloseExists () {
        return this.panelToClose
      },

      /************************************************************************
       * Collapses the accordion panel to be closed.
       *
       * @private
       ***********************************************************************/

      _closePanel () {
        this.triggerToClose.setAttribute('aria-expanded', 'false')
        this.panelToClose.setAttribute('hidden', '')
      },

      /************************************************************************
       * Returns true if the custom event with the given name was successfully
       * dispatched.
       *
       * @private
       * @param {string} name - Event name
       * @param {HTMLElement} panel - Panel DOM element toggled by event
       * @returns {boolean} Event successfully dispatched
       ***********************************************************************/

      // FIXME: Violates command-query separation and side-effects rules.

      _eventDispatched (name, panel) {
        const dispatched = Component.dispatchCustomEvent(
          name,
          this.element,
          { panel }
        )

        return dispatched
      }
    }
  }
}
