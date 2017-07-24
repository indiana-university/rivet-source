var Drawer = (function() {
    /**
     * Set everything up
     */
    var drawerTrigger = document.querySelector('[data-drawer-trigger]');
    var drawerSubnavTriggers = document.querySelectorAll('[data-subnav-trigger]');
    var drawerId = drawerTrigger.getAttribute('data-drawer-trigger');
    var drawerEl = document.querySelector('#' + drawerId);

    var init = function() {
        _bindUiActions();
    }

    var _bindUiActions = function() {
        drawerTrigger.addEventListener('click', function() {
            toggleHiddenState(drawerEl);
            // Toggle button open class
            this.classList.toggle('is-open');
        });

        for(var i = 0; i < drawerSubnavTriggers.length; i++) {
            drawerSubnavTriggers[i].addEventListener('click', function() {
                var subnavID = this.getAttribute('data-subnav-trigger');
                var subnavEl = document.querySelector('#' + subnavID);
                // Toggle the aria-hidden attribute of the target subnav
                toggleHiddenState(subnavEl);
            });
        }
    }

    var toggleHiddenState = function(itemToToggle) {
        var itemState = itemToToggle.getAttribute('aria-hidden') === 'true' || false;
        itemToToggle.setAttribute('aria-hidden', !itemState);
    }

    return {
        init: init,
        toggle: toggleHiddenState
    }
})();
