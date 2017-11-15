var Tabs = (function() {

    /**
     * Set up locally-scoped variables
     */

    /**
     * Get all the tab sets on the page
     */
    var tabSets = document.querySelectorAll('.rvt-tabs');

    var init = function() {
        // Check to make sure there are any tab sets in the DOM.
        if(tabSets.length != 0) {

            // Loop through the tab sets and initialize each one
            for (var i = 0; i < tabSets.length; i++) {

                var tabs = tabSets[i].querySelectorAll('.rvt-tabs__tab')
                console.log(tabs)
                _bindUiActions(tabs);

            }

        }
    }

    /**
     * @param {object} els - HTML elements to bind the actions to.
     */
    var _bindUiActions = function(els) {
        for (var i = 0; i < els.length; i++) {
            els[i].addEventListener('click', function() {
                dismissAlert(this);
            });
        }
    }

    /**
     * @param {object} context - the HTML element that was clicked to
     * to dimiss the alert
     */
    var dismissAlert = function(context) {
        var elToDismiss = context.parentNode;
        elToDismiss.parentNode.removeChild(elToDismiss);
    }

    // Expose public methods
    return {
        init: init,
        dismiss: dismissAlert
    }

})();
