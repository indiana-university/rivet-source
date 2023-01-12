/******************************************************************************
 * Copyright (C) 2023 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'

/******************************************************************************
 * The switch component does something.
 *
 * @see https://v2.rivet.iu.edu/docs/components/switch/
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
        this._initSelectors()
        this._initElements()

        Component.bindMethodToDOMElement(this, 'someMethod', this.someMethod)
      },

      /************************************************************************
       * Initializes switch child element selectors.
       *
       * @private
       ***********************************************************************/

      _initSelectors () {
        // Initialize component child element selectors here
      },

      /************************************************************************
       * Initializes switch child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        // Initialize component child elements here
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
       * Do something with the switch.
       ***********************************************************************/

      someMethod () {
        // Do something with the switch
      }
    }
  }
}