/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Component from './component';

export default class FileInput extends Component {
  static get selector() {
    return '[data-rvt-file-input]';
  }

  static get methods() {
    return {
      init() {
        console.log('FileInput::init()');

        this.wrapperAttribute = 'data-rvt-file-input';
        this.inputAttribute = 'data-rvt-file-input-button';
        this.previewAttribute = 'data-rvt-file-input-preview';
        this.previewText = this.element.querySelector(`[${this.previewAttribute}]`).textContent;
    
        this._handleChange = this._handleChange.bind(this);
      },

      _sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
      },

      _buildSingleFile(input) {
        // Create <span> element to display our file name
        const singleFileItem = document.createElement('span');
    
        /**
         * Sanitize use input here just incase someone would make the
         * name of their file a malicious script.
         */
        const singleFileName = this._sanitizeHTML(input.files[0].name);
    
        // Add the file name as the text content
        singleFileItem.textContent = singleFileName;
    
        // Returns our built <span> element.
        return singleFileItem;
      },

      _buildMultipleFiles(input) {
        const fileCount = document.createElement('span');
        fileCount.textContent = input.files.length + ' files selected';
    
        return fileCount;
      },

      onChange(event) {
        this._handleChange();
      },

      _handleChange() {
        // The actual input element
        const uploadInput = this.element.querySelector(`[${this.inputAttribute}]`);
    
        // The preview element where we'll inject file count, etc.
        const uploadPreview = this.element.querySelector(
          `[${this.previewAttribute}]`
        );
    
        // Check to make sure that at least one file was attached
        if (uploadInput.files.length > 0) {
          // Emit a fileAttached custom event
          const attachedEvent = Component.dispatchCustomEvent(
            'fileAttached',
            this.element,
            {
              id: this.element.dataset.rvtFileInput,
              files: Array.from(uploadInput.files).map(f => f.name)
            }
          );

          if (!attachedEvent) return;

          // Set remove the preview element placeholder text
          uploadPreview.innerHTML = '';
          
          /**
           * If there is more than one file attached, build up a span
           * that shows the file count to insert into the preview element,
           * otherwise show the file name that was uploaded.
           */
          uploadInput.files.length > 1
            ? uploadPreview.appendChild(this._buildMultipleFiles(uploadInput))
            : uploadPreview.appendChild(this._buildSingleFile(uploadInput));
        } else {
          /**
           * If no files were attached set the placeholder text back
           * to the default
           */
          uploadPreview.innerHTML = this.previewText;
        }
      }
    }
  }
}
