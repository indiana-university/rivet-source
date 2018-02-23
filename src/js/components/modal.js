/**
 * A lot of this is largely based on the great work in this article:
 * https://bitsofco.de/accessible-modal-modal/
 */

var Modal = (function () {
    /**
     * Set up
     */

    /**
     * Adding both prefixed ".rvt-" and old ".modal"  versions of the
     * selectors here. Let's eventually look at deprecating the
     * old un-prefixed version.
    */
    var modals = document.querySelectorAll('.rvt-modal, .modal');
    var modalTriggers = document.querySelectorAll('[data-modal-trigger]');

    // Make modalTriggers an array
    modalTriggers = Array.prototype.slice.call(modalTriggers);
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
    var init = function () {
        // Check to see if any modals exist on the page.
        if (modals.length != 0 && modalTriggers.length != 0) {
            _bindUiActions();
        }
    }

    var _bindUiActions = function () {
        modalTriggers.forEach(function (el) {
            el.addEventListener('click', function () {
                // Set up
                var modalID = el.getAttribute('data-modal-trigger');
                var modalEl = document.querySelector('#' + modalID);

                // Open the modal
                openModal(modalEl);
            });
        });
    }

    /**
     * @param {object} currentModal - The current HTML modal element to open.
     */
    var openModal = function (currentModal) {
        // Is the modal a modal dialog i.e. clicking background doesn't close?
        isDialog = currentModal.getAttribute('data-modal-dialog');

        // Store a reference to the inner modal container
        var modalElInner = currentModal.querySelector('.rvt-modal__inner, .modal__inner');

        /**
         * Get all the close triggers for the current modal. This includes
         * the default close (x) button, but could be other triggers
         * like a cancel button, etc.
         */
        var modalCloseButtons = currentModal.querySelectorAll('[data-modal-close]');

        // Convert nodelist to an array
        modalCloseButtons = Array.prototype.slice.call(modalCloseButtons);

        modalCloseButtons.forEach(function (el) {
            el.addEventListener('click', function () {
                closeModal(currentModal);
            });
        });

        // Get anything that's focusable
        focusableEls = currentModal.querySelectorAll(allFocusableEls);

        // Make focusableEls an Arry so we can do Array stuff with it.
        focusableEls = Array.prototype.slice.call(focusableEls);

        /**
         * Find the first and last focusable element in the array and
         * store them in variable where other methods can find them.
         */
        firstFocusableEl = focusableEls[0];
        lastFocusableEl = focusableEls[focusableEls.length - 1];

        /**
         * Add a class to the body that we use as a hook to allow
         * the modal to scroll.
         */
        if (document.body) {
            document.body.classList.add('rvt-modal-open');
        }

        /**
         * Store a reference to modal trigger that was clicked so that
         * we can return focus to it later.
         */
        focusedElBeforeOpen = document.activeElement;

        // Remove aria-hidden attr to show the modal.
        currentModal.removeAttribute('aria-hidden');

        /**
         * If the modal isn't a modal dialog allow user to click
         * the background to close.
         */
        if (!isDialog) {
            // Hide the modal if use clicks on background.
            currentModal.addEventListener('click', function () {
                closeModal(this);
            });
        }

        // Stops clicking on the actual modal stuff from bubbling up.
        modalElInner.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Listen for tab or escape keys and handle events.
        currentModal.addEventListener('keydown', function (e) {
            _handleKeyDown(currentModal, e);
        });

        // Add focus to the modal that just opened.
        currentModal.focus();
    }

    /**
     * @param {object} modalToHandle - The current HTML modal element to open.
     * @param {object} e - The event object
     */
    var _handleKeyDown = function (modalToHandle, e) {
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
                if (!isDialog) {
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
    var closeModal = function (modalToClose) {
        if (document.body) {
            document.body.removeAttribute('class');
        }

        modalToClose.setAttribute('aria-hidden', 'true');

        /**
         * Return focus to the modal trigger that originally
         * opened the modal.
         */
        if (focusedElBeforeOpen) {
            focusedElBeforeOpen.focus();
        }
    }

    return {
        init: init,
        open: openModal,
        close: closeModal
    }
})();

