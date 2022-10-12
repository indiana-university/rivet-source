/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import globalSettings from '../globalSettings'
import { define } from 'wicked-elements'

/******************************************************************************
 * Abstract base class from which all Rivet component classes are derived.
 *****************************************************************************/

export default class Component {

  /****************************************************************************
   * Initializes all current and future instances of the component that are
   * added to the DOM.
   *
   * @static
   ***************************************************************************/

  static initAll () {
    this.init(this.selector)
  }

  /****************************************************************************
   * Initializes a specific component instance with the given selector.
   *
   * @static
   * @param {string} selector - CSS selector of component to initialize
   * @returns {HTMLElement} The initialized component
   ***************************************************************************/

  static init (selector) {
    define(selector, this.methods)

    return document.querySelector(selector)
  }

  /****************************************************************************
   * Gets the component's CSS selector.
   *
   * @abstract
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    /* Virtual, must be implemented by subclass. */
  }

  /****************************************************************************
   * Gets the component's methods.
   *
   * @abstract
   * @static
   * @returns {Object} The component's methods
   ***************************************************************************/

  static get methods () {
    /* Virtual, must be implemented by subclass. */
  }

  /****************************************************************************
   * Binds the given method to the component DOM element.
   *
   * @static
   * @param {Component} self - Component instance
   * @param {string} name - Method name
   * @param {Function} method - Method to bind
   ***************************************************************************/

  static bindMethodToDOMElement (self, name, method) {
    Object.defineProperty(self.element, name, {
      value: method.bind(self),
      writable: false
    })
  }

  /****************************************************************************
   * Dispatches a custom browser event.
   *
   * @static
   * @param {string} eventName - Event name
   * @param {HTMLElement} element - Event target
   * @param {Object?} detail - Optional event details
   * @returns {boolean} Event success or failure
   ***************************************************************************/

  static dispatchCustomEvent (eventName, element, detail = {}) {
    const prefix = globalSettings.prefix
    const event = new CustomEvent(`${prefix}${eventName}`, {
      bubbles: true,
      cancelable: true,
      detail
    })

    return element.dispatchEvent(event)
  }

  /****************************************************************************
   * Dispatches a "component added" browser event.
   *
   * @static
   * @param {HTMLElement} element - New component DOM element
   * @returns {boolean} Event success or failure
   ***************************************************************************/

  static dispatchComponentAddedEvent (element) {
    return this.dispatchCustomEvent('ComponentAdded', document, {
      component: element
    })
  }

  /****************************************************************************
   * Dispatches a "component removed" browser event.
   *
   * @static
   * @param {HTMLElement} element - Removed component DOM element
   * @returns {boolean} Event success or failure
   ***************************************************************************/

  static dispatchComponentRemovedEvent (element) {
    return this.dispatchCustomEvent('ComponentRemoved', document, {
      component: element
    })
  }

  /****************************************************************************
   * Watches the component's DOM and updates references to child elements
   * if the DOM changes. Accepts an optional callback to perform additional
   * updates to the component on DOM change.
   *
   * @static
   * @param {Object} self - Component instance
   * @param {Function} callback - Optional callback
   ***************************************************************************/

  static watchForDOMChanges (self, callback = null) {
    self.observer = new MutationObserver((mutationList, observer) => {
      self._initElements()

      if (callback) {
        callback()
      }
    })

    self.observer.observe(self.element, { childList: true, subtree: true })
  }

  /****************************************************************************
   * Stop watching the component's DOM for changes.
   *
   * @static
   * @param {Object} self - Component instance
   ***************************************************************************/

  static stopWatchingForDOMChanges (self) {
    self.observer.disconnect()
  }

}
