/**
 * A lot of this is largely based on the great work in this article:
 * https://bitsofco.de/accessible-modal-modal/
 */

var Modal = (function() {

    /**
     * Set up
     */

    var modals = document.querySelectorAll('.modal');
    var modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    var allFocusableEls = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

    /**
     * We need these to pass around values that multiple
     * 'Modal' methods will need access to.
     */

    var isDialog;
    var focusedElBeforeOpen;
    var focusableEls;
    var firstFocusableEl;
    var lastFocusableEl;


    /**
     * Kick everything off here.
     */
    var init = function() {
        // Check to see if any modals exist on the page.
        if(modals.length != 0 && modalTriggers.length != 0) {
            _bindUiActions();
        }
    }


    var _bindUiActions = function() {
        modalTriggers.forEach(function(el) {

            el.addEventListener('click', function() {

                // Set up
                var modalID = el.getAttribute('data-modal-trigger');
                var modalEl = document.querySelector('#' + modalID);
                var modalElInner = modalEl.querySelector('.modal__inner');


                // Get all the close triggers for the current modal
                var modalCloseButtons = modalEl.querySelectorAll('[data-modal-close]');

                modalCloseButtons.forEach(function(el) {
                    el.addEventListener('click', function() {
                        closeModal(modalEl);
                    });
                });


                // Stops clicking on the actual modal stuff from bubbling up.
                modalElInner.addEventListener('click', function(e) {
                    e.stopPropagation();
                });


                // Get anything that's focusable
                focusableEls = modalEl.querySelectorAll(allFocusableEls);

                // Make focusableEls an Arry so we can do Array stuff with it.
                focusableEls = Array.prototype.slice.call(focusableEls);

                /**
                 * Find the first and last focusable element in the array and
                 * store them in variable where other methods can find them.
                 */
                firstFocusableEl = focusableEls[0];
                lastFocusableEl = focusableEls[focusableEls.length - 1];


                // Open the modal
                openModal(modalEl);


                // Listen for tab or escape keys and handle events.
                modalEl.addEventListener('keydown', function(e) {
                    _handleKeyDown(modalEl, e);
                });
            });
        });
    }

    /**
     * @param {object} modalToOpen - The current HTML modal element to open.
     */
    var openModal = function(modalToOpen) {
        // Is the modal a modal dialog i.e. clicking background doesn't close?
        isDialog = modalToOpen.getAttribute('data-modal-dialog');

        /**
         * Add a class to the body that we use as a hook to allow
         * the modal to scroll.
         */
        document.body.classList.add('modal-open');

        /**
         * Store a reference to modal trigger that was clicked so that
         * we can return focus to it later.
         */
        focusedElBeforeOpen = document.activeElement;

        // Remove aria-hidden attr to show the modal.
        modalToOpen.removeAttribute('aria-hidden');

        /**
         * If the modal isn't a modal dialog allow user to click
         * the background to close.
         */
        if(!isDialog) {
            // Hide the modal if use clicks on background.
            modalToOpen.addEventListener('click', function() {
                closeModal(this);
            });
        }

        // Add focus to the modal that just opened.
        modalToOpen.focus();

    }

    /**
     * @param {object} modalToHandle - The current HTML modal element to open.
     * @param {object} e - The event object
     */
    var _handleKeyDown = function(modalToHandle, e) {
        var KEY_TAB = 9;
        var KEY_ESC = 27;

        function handleBackwardTab() {
            if (document.activeElement === firstFocusableEl) {
                e.preventDefault();
                lastFocusableEl.focus();
            }
        }

        function handleForwardTab() {
            if (document.activeElement === lastFocusableEl) {
                e.preventDefault();
                firstFocusableEl.focus();
            }

        }


        switch (e.keyCode) {
            case KEY_TAB:
                if (focusableEls.length === 1) {
                    e.preventDefault();
                    break;
                }
                if (e.shiftKey) {
                    handleBackwardTab();
                } else {
                    handleForwardTab();
                }
                break;

            case KEY_ESC:
                if(!isDialog) {
                    closeModal(modalToHandle);
                }
                break;

            default:
                break;
        }
    }

    /**
     * @param {object} modalToClose - The HTML modal element to close.
     */
    var closeModal = function(modalToClose) {
        document.body.removeAttribute('class');
        modalToClose.setAttribute('aria-hidden', 'true');

        /**
         * Return focus to the modal trigger that originally
         * opened the modal.
         */
        if(focusedElBeforeOpen) {
            focusedElBeforeOpen.focus();
        }
    }


    return {
        init: init,
        open: openModal,
        close: closeModal
    }


})();
