var Uploader = (function() {
    /**
     * Sets up some text we'll need to reuse throughout.
     */
    var defaultText = 'No files selected';

    /**
     * This kicks off our Uploader only if there
     * are any in the document.
     */
    var init = function() {
        /**
         * This gets all of the the uploaders in the document
         * so we can work with them in our _bindUiActions function.
         */
        var uploaders = document.querySelectorAll('[data-upload]');

        if(uploaders.length > 0) {
            _bindUiActions(uploaders);
        }
    }

    var _bindUiActions = function (uploaderEls) {
        for(var i = 0; i < uploaderEls.length; i++) {
            // Add the change listener to the file input
            uploaderEls[i].addEventListener('change', function() {

                // Set up
                var uploaderContainer = this;
                var uploaderId = this.getAttribute('data-upload');
                var uploaderInput = this.querySelector('#' + uploaderId);
                var uploadList = this.querySelector('[data-file-preview]');

                // If there were and files added add update the uploadList element
                if (uploaderInput.files.length > 0) {
                    // Clear the placeholder text so we can insert our file names.
                    uploadList.innerHTML = '';

                    // Check if there are multiple or single files.
                    if (uploaderInput.files.length > 1) {
                        uploadList.appendChild(
                            buildMultipleFiles(uploaderInput)
                        );
                    }
                    else {
                        uploadList.appendChild(
                            buildSingleFile(uploaderInput)
                        );
                    }
                }
                else {
                    uploadList.innerHTML = defaultText;
                }
            });
        }
    }

    /**
     * Builds a preview for multiple files
     */
    var buildMultipleFiles = function (htmlFileInput) {
        var fileCount = document.createElement('span');
        fileCount.textContent = htmlFileInput.files.length + ' files selected';
        return fileCount;
    }

    /**
     * Builds a single span with file name to insert into the DOM
     */
    var buildSingleFile = function(htmlFileInput) {
        // Create <span> element to display our file name
        var singleFileItem = document.createElement('span');

        // Add the file name as the text content
        singleFileItem.textContent = htmlFileInput.files[0].name;

        // Returns our built <span> element.
        return singleFileItem;
    }

    // Expose the init function
    return {
        init: init
    }

})();



