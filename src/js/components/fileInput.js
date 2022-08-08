/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'

/******************************************************************************
 * The file input component allows the user to select a file to be uploaded as
 * part of a form submission.
 *
 * @see https://v2.rivet.iu.edu/docs/components/file-input/
 *****************************************************************************/

export default class FileInput extends Component {

  /****************************************************************************
   * Gets the file input's CSS selector.
   *
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    return '[data-rvt-file-input]'
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
       * Initializes the file input.
       ***********************************************************************/

      init () {
        this._initSelectors()
        this._initElements()
        this._initProperties()
      },

      /************************************************************************
       * Initializes file input child element selectors.
       *
       * @private
       ***********************************************************************/

      _initSelectors () {
        this.inputElementAttribute = 'data-rvt-file-input-button'
        this.previewElementAttribute = 'data-rvt-file-input-preview'

        this.inputElementSelector = `[${this.inputElementAttribute}]`
        this.previewElementSelector = `[${this.previewElementAttribute}]`
      },

      /************************************************************************
       * Initializes file input child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        this.inputElement = this.element.querySelector(this.inputElementSelector)
        this.previewElement = this.element.querySelector(this.previewElementSelector)
      },

      /************************************************************************
       * Initializes file input state properties.
       *
       * @private
       ***********************************************************************/

      _initProperties () {
        this.defaultPreviewText = this.previewElement.textContent
      },

      /************************************************************************
       * Called when the file input is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)
      },

      /************************************************************************
       * Called when the file input is removed from the DOM.
       ***********************************************************************/

      disconnected () {
        Component.dispatchComponentRemovedEvent(this.element)
      },

      /************************************************************************
       * Handles change events broadcast to the file input.
       *
       * @param {Event} event - Change event
       ***********************************************************************/

      onChange (event) {
        if (this._hasAttachedFiles()) {
          if (!this._attachEventDispatched()) { return }

          this._hasMultipleAttachedFiles()
            ? this._showNumberOfAttachedFiles()
            : this._showAttachedFilename()
        } else {
          this._resetPreviewTextToDefault()
        }
      },

      /************************************************************************
       * Returns true if any files are attached to the file input.
       *
       * @private
       * @returns {boolean} Has attached files
       ***********************************************************************/

      _hasAttachedFiles () {
        return this.inputElement.files.length > 0
      },

      /************************************************************************
       * Returns true if the "file attached" custom event was successfully
       * dispatched.
       *
       * @private
       * @returns {boolean} Event successfully dispatched
       ***********************************************************************/

      _attachEventDispatched () {
        const files = Array.from(this.inputElement.files).map(f => f.name)
        const dispatched = Component.dispatchCustomEvent(
          'FileAttached',
          this.element,
          { files }
        )

        return dispatched
      },

      /************************************************************************
       * Returns true if more than one file is attached to the file input.
       *
       * @private
       * @returns {boolean} Has multiple attached files
       ***********************************************************************/

      _hasMultipleAttachedFiles () {
        return this.inputElement.files.length > 1
      },

      /************************************************************************
       * Sets the file input preview text to show the number of attached files.
       *
       * @private
       ***********************************************************************/

      _showNumberOfAttachedFiles () {
        this.previewElement.textContent = this.inputElement.files.length + ' files selected'
      },

      /************************************************************************
       * Sets the file input preview text to show the name of the attached
       * file.
       *
       * @private
       ***********************************************************************/

      _showAttachedFilename () {
        this.previewElement.textContent = this._getSanitizedFilename()
      },

      /************************************************************************
       * Sanitizes the name of the attached file for safe output.
       *
       * @private
       * @returns {string} Sanitized filename
       ***********************************************************************/

      _getSanitizedFilename () {
        return this.inputElement.files[0].name.replace(/[^\w\.\-]+/gi, '')
      },

      /************************************************************************
       * Resets the file input preview text to its default value.
       *
       * @private
       ***********************************************************************/

      _resetPreviewTextToDefault () {
        this.previewElement.textContent = this.defaultPreviewText
      }
    }
  }
}
