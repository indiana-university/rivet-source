/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

// eslint-disable-next-line no-unused-vars
var FileInput = (function() {
  'use strict';

  /**
   * Sets up some text we'll need to reuse throughout.
   */
  var DEFAULT_TEXT = 'No file selected';
  var UPLOAD_ATTR = 'data-upload';

  /*!
   * Sanitize and encode all HTML in a user-submitted string
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {String} str  The user-submitted string
   * @return {String} str  The sanitized string
   */
  function sanitizeHTML(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  /**
   *
   * @param {HTMLInputElement} input - HTML file input
   * @return {HTMLSpanElement} - A span containing the a description
   * of the number of files attached to file input
   */
  function _buildMultipleFiles(input) {
    var fileCount = document.createElement('span');
    fileCount.textContent = input.files.length + ' files selected';
    return fileCount;
  }

  /**
   *
   * @param {HTMLInputElement} input - HTML file input
   * @return {HTMLSpanElement} - A span containing the file name that was
   * attached to the file input
   */
  function _buildSingleFile(input) {
    // Create <span> element to display our file name
    var singleFileItem = document.createElement('span');

    /**
     * Sanitize use input here just incase someone would make the
     * name of their file a malicious script.
     */
    var singleFileName = sanitizeHTML(input.files[0].name);

    // Add the file name as the text content
    singleFileItem.textContent = singleFileName;

    // Returns our built <span> element.
    return singleFileItem;
  }

  /**
   *
   * @param {Event} event - Handles the main 'change' event emitted when
   * file(s) are attached to the file input
   */
  function _handleChange(event) {
    // Store a reference to the file input wrapper (data-upload) element
    var uploadElement = event.target.closest('[' + UPLOAD_ATTR + ']');

    // If the change event was on the file input, bail.
    if (!uploadElement) return;

    // The unique id of the file input, wrapper, and preview elements
    var uploadId = uploadElement.getAttribute(UPLOAD_ATTR);

    // The actual input element
    var uploadInput = document.getElementById(uploadId);

    // The preview element where we'll inject file count, etc.
    var uploadPreview = uploadElement.querySelector('[data-file-preview]');

    // Check to make sure that at least one file was attached
    if (uploadInput.files.length > 0) {
      // Set remove the preview element placeholder text
      uploadPreview.innerHTML = '';

      /**
       * If there is more than one file attached, build up a span
       * that shows the file count to insert into the preview element,
       * otherwise show the file name that was uploaded.
       */
      uploadInput.files.length > 1 ?
        uploadPreview.appendChild(_buildMultipleFiles(uploadInput)) :
        uploadPreview.appendChild(_buildSingleFile(uploadInput));

      // Fire a custom event as a hook for other scripts
      // eslint-disable-next-line no-undef
      fireCustomEvent(uploadElement, UPLOAD_ATTR, 'fileAttached');
    } else {
      /**
       * If no files were attached set the placeholder text back
       * to the default
       */
      uploadPreview.innerHTML = DEFAULT_TEXT;
    }
  }

  /**
   * @param {HTMLElement} context - An optional DOM element. This only
   * needs to be passed in if a DOM element was passed to the init()
   * function. If so, the element passed in must be the same element
   * that was passed in at initialization so that the event listeners can
   * be properly removed.
   */
  function destroy(context) {
    if (context === undefined) {
      context = document;
    }

    context.removeEventListener('change', _handleChange, false);
  }

  /**
   * @param {HTMLElement} context - An optional DOM element that the
   * file input can be initialized on. All event listeners will be attached
   * to this element. Usually best to just leave it to default
   * to the document.
   */
  function init(context) {
    if (context === undefined) {
      context = document;
    }

    // Destroy any currently initialized file inputs
    destroy(context);

    context.addEventListener('change', _handleChange, false);
  }

  // Expose public API here
  return {
    init: init,
    destroy: destroy
  };
})();
