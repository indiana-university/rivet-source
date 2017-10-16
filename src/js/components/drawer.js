var Drawer = (function() {
    /**
     * Set everything up
     */
    var drawerTrigger = document.querySelector('[data-drawer-trigger]');
    var drawerSubnavTriggers = document.querySelectorAll('[data-subnav-trigger]');
    var drawerId = drawerTrigger ? drawerTrigger.getAttribute('data-drawer-trigger') : null;
    var drawerEl = document.querySelector('#' + drawerId);
    var drawerBottomClose = drawerEl ? drawerEl.querySelector('.rvt-drawer__bottom-close') : null;

    var init = function() {
        // Check to make sure the drawer is present in the DOM
        if(drawerTrigger) {
            _bindUiActions();
        }

    }

    var _bindUiActions = function() {
        drawerTrigger.addEventListener('click', function() {
            // Togle aria-exapnded state of the button
            toggleBtnState(this);
            // Toggle the aria-hidden state of the drawer
            toggleHiddenState(drawerEl);
            // Toggle button open class
            this.classList.toggle('is-open');
        });

        for(var i = 0; i < drawerSubnavTriggers.length; i++) {
            drawerSubnavTriggers[i].addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var subnavID = this.getAttribute('data-subnav-trigger');
                var subnavEl = document.querySelector('#' + subnavID);
                // Toggle the aria-expanded state of the button
                toggleBtnState(this);
                // Toggle the aria-hidden attribute of the target subnav
                toggleHiddenState(subnavEl);
            });
        }

        // Make sure the extra close button is present in the DOM
        if (drawerBottomClose) {
            drawerBottomClose.addEventListener('click', function () {
                toggleHiddenState(drawerEl);
                drawerTrigger.classList.toggle('is-open');
            });
        }
    }

    var toggleBtnState = function(buttonEl) {
        var isExpanded = buttonEl.getAttribute('aria-expanded') === 'true' || false;
        buttonEl.setAttribute('aria-expanded', !isExpanded);
    }

    var toggleHiddenState = function(itemToToggle) {
        var itemState = itemToToggle.getAttribute('aria-hidden') === 'true' || false;
        itemToToggle.setAttribute('aria-hidden', !itemState);
    }

    return {
        init: init
    }
})();
