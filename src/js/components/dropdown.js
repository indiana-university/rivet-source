/**
 * Same here. This is a start, but needs more work.
 */

var Dropdown = (function() {
    // For easy reference
    var keys = {
        up: 38,
        down: 40,
        tab: 9,
        escape: 27
    };

    var expanded = 'aria-expanded';
    var hidden = 'aria-hidden';
    var allFocusableEls = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

    /**
     * The init checks to make sure that there are any dropdown buttons
     * on the page then kicks off all the event listeners.
     */
    var init = function(context) {
        if (context === undefined) {
            context = document;
        }    

        /**
         * This is the initial set up that caches selectors and properties
         * from the DOM.
         */
        var btnToggles = context.querySelectorAll('[data-dropdown-toggle]');

        // Check to make sure there are doropdown menus in the DOM.
        if (btnToggles.length > 0) {
            /**
             * Main toggle action
             */
            for (var i = 0; i < btnToggles.length; i++) {
                btnToggles[i].addEventListener('click', function (event) {
                    var dropdown = findDropdown(this);

                    toggle(dropdown.toggle, dropdown.menu, event);
                });

                /**
                 * The first time a user is focused on a dropdown toggle
                 * and presses the down key we want the dropdown to open,
                 * but not focus the first element in the menu.
                 */
                btnToggles[i].addEventListener('keyup', function(event) {
                    var dropdown = findDropdown(this);

                    if(event.keyCode == keys.down) {
                        event.preventDefault();
                        toggle(dropdown.toggle, dropdown.menu, event);
                    }
                });

                /**
                 * Then an additional press of the down key should focus the
                 * first focusable element in the menu.
                 */
                btnToggles[i].addEventListener('keydown', function (event) {
                    var dropdown = findDropdown(this);

                    if (event.keyCode == keys.down) {
                        event.preventDefault();
                        dropdown.firstFocusable.focus();
                    }

                    if (event.keyCode == keys.escape && dropdown.menu.getAttribute('aria-hidden') == 'false') {
                        toggle(dropdown.toggle, dropdown.menu, event);
                    }
                });
            }

            btnToggles = Array.prototype.slice.call(btnToggles);
            btnToggles.forEach(function(btn) {
                var menu = findDropdown(btn);
                /**
                 * Stop click on dropdown menus from bubbling up
                 */
                menu.menu.addEventListener('click', function (event) {
                    event.clickWithinMenu = true;
                });

                menu.menu.addEventListener('keydown', function (event) {
                    // Handle all the different keyboard interactions.
                    _handleKeydown(menu, event);
                });
            });

            /**
             * Listen for clicks outside of the dropdown button and close all
             * opened dropdown menus.
             */
            document.addEventListener('click', function (event) {
                if (!event.clickWithinMenu) {
                    closeAllMenus(undefined);
                }
            });
        }
    }

    /**
     *
     * @param {Object} menu
     * An object containing all the refernces we need to work with an
     * instance of a dropdown menu. See findDropdown() for more info.
     * @param {Object} event
     * The event object
     */
    var _handleKeydown = function (menu, event) {
        switch (event.keyCode) {
            case keys.escape:
                toggle(menu.toggle, menu.menu, event);

                // Retrun focus to the current toggle button
                menu.toggle.focus();
                break;
            case keys.down:
                event.preventDefault();
                var currentIndex;

                for (var i = 0; i < menu.focusables.length; i++) {
                    if (event.target == menu.focusables[i]) {
                        currentIndex = i;
                    }
                }
                // Store a reference to the next button or link
                var next = menu.focusables[currentIndex + 1];

                /**
                 * If it's the last button or link return focus to
                 * the first focusable element.
                 */
                if (!next) {
                    menu.firstFocusable.focus();
                    return;
                }

                // Otherwise focus the next element.
                next.focus();
                break;
            case keys.up:
                event.preventDefault();
                var currentIndex;

                for (var i = 0; i < menu.focusables.length; i++) {
                    if (event.target == menu.focusables[i]) {
                        currentIndex = i;
                    }
                }

                var previous = menu.focusables[currentIndex - 1];

                if(!previous) {
                    menu.lastFocusable.focus();
                    return;
                }

                previous.focus();
                break;
            case keys.tab:
                if (document.activeElement == menu.lastFocusable && !event.shiftKey) {
                    /**
                     * NOTE:
                     * Don't pass the event to the toggle function
                     * here because we don't want to prevent the
                     * default behavior of the tab key moving focus
                     * to whatever is the next focusable thing
                     * in the DOM. QUESTION: Do we need to preventDefault on this
                     * toggle function if we are encouraging folks to use
                     * HTML button elements (not links) toggle stuff?
                     */
                    toggle(menu.toggle, menu.menu, null);
                }
            default:
                break;
        }
    }

    /**
     *
     * @param {HTMLElement} el
     * Accepts dropdown toggle and returns an object containing
     * references to the menu it controls, and id, the toggle itself,
     * all focusable elements inside the menu, and the first and
     * last focusable elements.
     *
     */
    var findDropdown = function (el) {
        var menu = {};

        menu.toggle = el;
        menu.id = el.getAttribute('data-dropdown-toggle');
        menu.menu = document.querySelector('#' + menu.id);

        // Find all focusable elements in the dropdown
        menu.focusables = menu.menu.querySelectorAll(allFocusableEls);

        // Find first focusable element
        menu.firstFocusable = menu.focusables[0];

        // Find last focusable element
        menu.lastFocusable = menu.focusables[menu.focusables.length - 1];

        return menu;
    }

    var toggle = function(trigger, target, event) {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
            event.clickWithinMenu = true
        }

        // Close all of the menus except for this one
        closeAllMenus(target);
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
     *
     * @param {String} id
     * The value of the dropdown toggle data-dropdown-toggle attribute and
     * matching id of the dropdown men it controls.
     *
     * This is a helper function that we expose as part of the public API.
     */

    var toggleById = function(id) {
        var toggleButton = document.querySelector('[data-dropdown-toggle="' + id + '"]');
        var toggleMenu = document.getElementById(id);

        toggle(toggleButton, toggleMenu);
    }

    /**
     * Closes any open dropdown menus and sets the corresponding trigger's
     * aria-exapnded state back to "false"
     */

    var closeAllMenus = function(menuToLeaveOpen) {
        var menus = document.querySelectorAll('.rvt-dropdown__menu, .dropdown__menu');
        for(var i = 0; i < menus.length; i ++) {
            if(menuToLeaveOpen != menus[i]) {
                menus[i].setAttribute(hidden, 'true');
                var triggerElData = menus[i].getAttribute('id');
                var triggerEl = document.querySelector('[data-dropdown-toggle="' + triggerElData + '"]');
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
        toggle: toggleById
    }
})();

