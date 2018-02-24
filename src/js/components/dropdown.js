/**
 * Same here. This is a start, but needs more work.
 */

var Dropdown = (function() {


    var expanded = 'aria-expanded';
    var hidden = 'aria-hidden';

    /**
     * The init checks to make sure that there are any dropdown buttons
     * on the page then kicks off all the event listeners.
     */
    var init = function() {
        /**
         * This is the initial set up that caches selectors and properties
         * from the DOM
         */
        var btnTriggers = document.querySelectorAll('[data-dropdown-trigger]');
        var menus = document.querySelectorAll('.rvt-dropdown__menu, .dropdown__menu');

        // Check to make sure there are doropdown menus in the DOM.
        if(btnTriggers.length != 0 && menus.length != 0) {
            /**
             * Main toggle action
             */
            for (var i = 0; i < btnTriggers.length; i++) {
                btnTriggers[i].addEventListener('click', function (e) {
                    var dropdownTrigger = this;
                    var dropdownID = dropdownTrigger.getAttribute('data-dropdown-trigger');
                    var dropdownEl = document.querySelector('#' + dropdownID);

                    toggle(dropdownTrigger, dropdownEl, e, menus)
                });
            }

            /**
             * Stop click on dropdown menus from bubbling up
             */
            for (var i = 0; i < menus.length; i++) {
                menus[i].addEventListener('click', function (e) {
                    e.clickWithinMenu = true;
                });
            }

            /**
             * Listen for clicks outside of the dropdown button and close all
             * opened dropdown menus.
             */
            document.addEventListener('click', function (e) {
                if (!e.clickWithinMenu) {
                    closeAllMenus(undefined, menus);
                }
            });
        }
    }

    var toggle = function(trigger, target, event, menus) {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
            event.clickWithinMenu = true
        }

        // Close all of the menus except for this one
        closeAllMenus(target, menus);
        // Toggle the aria-expanded state of the button that was clicked.
        toggleBtnState(trigger);
        // Toggle the aria-hidden state of the corresponding dropdown.
        toggleMenuState(target);
    }

    // Toggles the aria-expanded state of the target button
    var toggleBtnState = function(buttonEl) {
        var isExpanded = buttonEl.getAttribute(expanded) === 'true' || false;
        buttonEl.setAttribute(expanded, !isExpanded);
    }

    // Toggles the aria-hidden state of the dropdown menu
    var toggleMenuState = function(dropdownMenuEl) {
        var menuState = dropdownMenuEl.getAttribute(hidden) === 'true' || false;
        dropdownMenuEl.setAttribute(hidden, !menuState);
    }

    /**
     * Closes any open dropdown menus and sets the corresponding trigger's
     * aria-exapnded state back to "false"
     */

    var closeAllMenus = function(menuToLeaveOpen, menus) {
        for(var i = 0; i < menus.length; i ++) {
            if(menuToLeaveOpen != menus[i]) {
                menus[i].setAttribute(hidden, 'true');
                var triggerElData = menus[i].getAttribute('id');
                var triggerEl = document.querySelector('[data-dropdown-trigger="' + triggerElData + '"]');
                triggerEl.setAttribute(expanded, 'false');
            }
        }
    }

    /**
     * This return statement exposes the functions that need to be availble
     * to initialize the everything and provide programatic access to the
     * closeAllMenus function if needed.
     */

    return {
        init: init,
        closeAll: closeAllMenus,
        toggle: toggle
    }

})();

