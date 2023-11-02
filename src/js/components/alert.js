/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'

/******************************************************************************
 * The alert component displays brief important messages to the user like
 * errors or action confirmations.
 *
 * @see https://rivet.iu.edu/docs/components/alert/
 *****************************************************************************/

export default class Alert extends Component {

  /****************************************************************************
   * Gets the alert's CSS selector.
   *
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    return '[data-rvt-alert]'
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
       * Initializes the alert.
       ***********************************************************************/

      init () {
        this._initSelectors()
        this._initElements()

        Component.bindMethodToDOMElement(this, 'dismiss', this.dismiss)
      },

      /************************************************************************
       * Initializes alert child element selectors.
       *
       * @private
       ***********************************************************************/

      _initSelectors () {
        this.closeButtonAttribute = 'data-rvt-alert-close'

        this.closeButtonSelector = `[${this.closeButtonAttribute}]`
      },

      /************************************************************************
       * Initializes alert child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        this.closeButton = this.element.querySelector(this.closeButtonSelector)
      },

      /************************************************************************
       * Called when the alert is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)
      },

      /************************************************************************
       * Called when the alert is removed from the DOM.
       ***********************************************************************/

      disconnected () {
        Component.dispatchComponentRemovedEvent(this.element)
      },

      /************************************************************************
       * Handles click events broadcast to the alert.
       *
       * @param {Event} event - Click event
       ***********************************************************************/

      onClick (event) {
        if (this._clickOriginatedInsideCloseButton(event)) { this.dismiss() }
      },

      /************************************************************************
       * Returns true if the given click event originated inside the
       * alert's close button.
       *
       * @private
       * @param {Event} event - Click event
       * @returns {boolean} Click originated inside content area
       ***********************************************************************/

      _clickOriginatedInsideCloseButton (event) {
        return this.closeButton && this.closeButton.contains(event.target)
      },

      /************************************************************************
       * Dismisses the alert.
       ***********************************************************************/

      dismiss () {
        if (!this._dismissEventDispatched()) { return }

        this.element.remove()
      },

      /************************************************************************
       * Returns true if the custom "dismiss" event was successfully
       * dispatched.
       *
       * @private
       * @returns {boolean} Event successfully dispatched
       ***********************************************************************/

      _dismissEventDispatched () {
        const dispatched = Component.dispatchCustomEvent(
          'AlertDismissed',
          this.element
        )

        return dispatched
      }
    }
  }
}
