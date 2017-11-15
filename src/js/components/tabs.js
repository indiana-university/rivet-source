var Tabs = (function() {

    /**
     * Set up locally-scoped variables
     * Aria requirements https://www.w3.org/TR/wai-aria-practices/#tabpanel
     */

    /**
     * Get all the tab sets on the page
     */
    var tabSets = document.querySelectorAll('.rvt-tabs');
    var tabs = []
    var panels = []

    // For easy reference
    var keys = {
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46,
        enter: 13,
        space: 32
    };

    // Add or subtract depending on key pressed
    var direction = {
        37: -1,
        38: -1,
        39: 1,
        40: 1
    };

    var init = function() {

        // Check to make sure there are any tab sets in the DOM.
        if(tabSets.length != 0) {

            // Loop through the tab sets and initialize each one
            for (var tabsetIndex = 0; tabsetIndex < tabSets.length; tabsetIndex++) {

                tabs[tabsetIndex] = tabSets[tabsetIndex].querySelectorAll('[role="tab"]')
                panels[tabsetIndex] = tabSets[tabsetIndex].querySelectorAll('[role="tabpanel"]')

                _bindUiActions(tabs[tabsetIndex], tabsetIndex);

            }

        }
    }

    /**
     * @param {object} els - HTML elements to bind the actions to.
     */
    var _bindUiActions = function(tabs, tabsetIndex) {

        for (var i = 0; i < tabs.length; i++) {

            tabs[i].addEventListener('click', function(event) { clickEventListener(event, tabsetIndex) });
            tabs[i].addEventListener('keydown', function(event) { keydownEventListener(event, tabsetIndex) });
            tabs[i].addEventListener('keyup', function(event) { keyupEventListener(event, tabsetIndex) });

            // Build an array with all tabs (<button>s) in it
            tabs[i].index = i;
            tabs[i].tabsetIndex = tabsetIndex
        }
    }

    // When a tab is clicked, activateTab is fired to activate it
    function clickEventListener (event, tabsetIndex) {
        var tab = event.target;
        activateTab(tab, tabsetIndex, false);
    };

    // Handle keydown on tabs
    function keydownEventListener (event, tabsetIndex) {
        var key = event.keyCode;

        switch (key) {
            case keys.end:
                event.preventDefault();
                // Activate last tab
                focusLastTab();
                break;
            case keys.home:
                event.preventDefault();
                // Activate first tab
                focusFirstTab();
                break;

            // Up and down are in keydown
            // because we need to prevent page scroll >:)
            case keys.up:
            case keys.down:
                determineOrientation(event);
                break;
        };
    };

    // Handle keyup on tabs
    function keyupEventListener (event, tabsetIndex) {
        var key = event.keyCode;

        switch (key) {
            case keys.left:
            case keys.right:
                determineOrientation(event);
                break;
            case keys.delete:
                determineDeletable(event);
                break;
            case keys.enter:
            case keys.space:
                activateTab(event.target);
                break;
        };
    };

    // When a tablists aria-orientation is set to vertical,
    // only up and down arrow should function.
    // In all other cases only left and right arrow function.
    function determineOrientation (event) {
        var key = event.keyCode;
        var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
        var proceed = false;

        if (vertical) {
            if (key === keys.up || key === keys.down) {
                event.preventDefault();
                proceed = true;
            };
        }
        else {
            if (key === keys.left || key === keys.right) {
                proceed = true;
            };
        };

        if (proceed) {
            switchTabOnArrowPress(event);
        };
    };


    // Either focus the next, previous, first, or last tab
    // depening on key pressed
    function switchTabOnArrowPress (event) {
        var pressed = event.keyCode;

        if (direction[pressed]) {
            var target = event.target;
            if (target.index !== undefined) {
                if (tabs[target.index + direction[pressed]]) {
                    tabs[target.index + direction[pressed]].focus();
                }
                else if (pressed === keys.left || pressed === keys.up) {
                    focusLastTab();
                }
                else if (pressed === keys.right || pressed == keys.down) {
                    focusFirstTab();
                };
            };
        };
    };

    // Activates any given tab panel
    function activateTab (tab, tabsetIndex, setFocus) {

        setFocus = setFocus || true;

        // Deactivate all other tabs in tabset
        deactivateTabs(tabsetIndex);

        // Remove tabindex attribute
        tab.removeAttribute('tabindex');

        // Set the tab as selected
        tab.setAttribute('aria-selected', 'true');

        // Get the value of aria-controls (which is an ID)
        var controls = tab.getAttribute('aria-controls');

        // Remove hidden attribute from tab panel to make it visible
        document.getElementById(controls).removeAttribute('hidden');

        // Set focus when required
        if (setFocus) {
            tab.focus();
        };
    };

    // Deactivate all tabs and tab panels
    function deactivateTabs (tabsetIndex) {

        for (var t = 0; t < tabs[tabsetIndex].length; t++) {
            tabs[tabsetIndex][t].setAttribute('tabindex', '-1');
            tabs[tabsetIndex][t].setAttribute('aria-selected', 'false');
        };

        for (var p = 0; p < panels[tabsetIndex].length; p++) {
            panels[tabsetIndex][p].setAttribute('hidden', 'hidden');
        };
    };

    // Make a guess
    function focusFirstTab () {
        tabs[0][0].focus();
    };

    // Make a guess
    function focusLastTab () {
        tabs[tabs.length - 1].focus();
    };

    // Detect if a tab is deletable
    function determineDeletable (event) {
        var target = event.target;

        if (target.getAttribute('data-deletable') !== null) {
            // Delete target tab
            deleteTab(event, target);

            // Update arrays related to tabs widget
            generateArrays();

            // Activate the closest tab to the one that was just deleted
            if (target.index - 1 < 0) {
                activateTab(tabs[0]);
            }
            else {
                activateTab(tabs[target.index - 1]);
            };
        };
    };

    // Deletes a tab and its panel
    function deleteTab (event) {
        var target = event.target;
        var panel = document.getElementById(target.getAttribute('aria-controls'));

        target.parentElement.removeChild(target);
        panel.parentElement.removeChild(panel);
    };

    // Determine whether there should be a delay
    // when user navigates with the arrow keys
    function determineDelay () {
        var hasDelay = tablist.hasAttribute('data-delay');
        var delay = 0;

        if (hasDelay) {
            var delayValue = tablist.getAttribute('data-delay');
            if (delayValue) {
                delay = delayValue;
            }
            else {
                // If no value is specified, default to 300ms
                delay = 300;
            };
        };

        return delay;
    };

    // Expose public methods
    return {
        init: init
    }

})();
