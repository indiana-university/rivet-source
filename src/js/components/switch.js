/******************************************************************************
 * Copyright (C) 2023 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'

/******************************************************************************
 * The switch component allows the user to toggle between "on" and "off"
 * states.
 *
 * @see https://rivet.iu.edu/docs/components/switch/
 *****************************************************************************/

export default class Switch extends Component {

  /****************************************************************************
   * Gets the switch's CSS selector.
   *
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    return '[data-rvt-switch]'
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
       * Initializes the switch.
       ***********************************************************************/

      init () {
        this._initProperties()
        this._setInitialState()

        Component.bindMethodToDOMElement(this, 'switchOn', this.switchOn)
        Component.bindMethodToDOMElement(this, 'switchOff', this.switchOff)
      },

      /************************************************************************
       * Initializes switch state properties.
       *
       * @private
       ***********************************************************************/

      _initProperties () {
        this.on = false
      },

      /************************************************************************
       * Sets the initial state of the switch.
       *
       * @private
       ***********************************************************************/

      _setInitialState () {
        this._hideLabelsFromAssistiveTech()
        this._setInitialToggleState()
      },

      /************************************************************************
       * Hides the on/off text labels from assistive technology.
       *
       * @private
       ***********************************************************************/

      _hideLabelsFromAssistiveTech () {
        this.element
            .querySelectorAll('span')
            .forEach(span => span.setAttribute('aria-hidden', true))
      },

      /************************************************************************
       * Sets the switch's initial toggle state.
       *
       * @private
       ***********************************************************************/

      _setInitialToggleState () {
        this.element.setAttribute('aria-checked', 'false')

        if (this._shouldBeOnByDefault()) { this.switchOn() }
      },

      /************************************************************************
       * Returns true if the switch should be toggled on by default.
       *
       * @private
       ***********************************************************************/

      _shouldBeOnByDefault () {
        return this.element.hasAttribute('data-rvt-switch-on')
      },

      /************************************************************************
       * Called when the switch is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)
      },

      /************************************************************************
       * Called when the switch is removed from the DOM.
       ***********************************************************************/

      disconnected () {
        Component.dispatchComponentRemovedEvent(this.element)
      },

      /************************************************************************
       * Handles click events broadcast to the switch.
       *
       * @param {Event} event - Click event
       ***********************************************************************/

      onClick (event) {
        this._isOn()
          ? this.switchOff()
          : this.switchOn()
      },

      /************************************************************************
       * Returns true if the switch is toggled on.
       ***********************************************************************/

      _isOn () {
        return this.on
      },

      /************************************************************************
       * Toggle the switch on.
       ***********************************************************************/

      switchOn () {
        if (this._isOn()) { return }

        if (!this._eventDispatched('SwitchToggledOn')) { return }

        this._setOnState()
      },

      /************************************************************************
       * Sets the switch's state properties to represent it being on.
       *
       * @private
       ***********************************************************************/

      _setOnState () {
        this.on = true
        this.element.setAttribute('aria-checked', 'true')
      },

      /************************************************************************
       * Toggle the switch off.
       ***********************************************************************/

      switchOff () {
        if (!this._isOn()) { return }

        if (!this._eventDispatched('SwitchToggledOff')) { return }

        this._setOffState()
      },

      /************************************************************************
       * Sets the switch's state properties to represent it being off.
       *
       * @private
       ***********************************************************************/

      _setOffState () {
        this.on = false
        this.element.setAttribute('aria-checked', 'false')
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
