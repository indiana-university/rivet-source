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

    var toggle = function(trigger, target, event) {

        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Toggle aria-expanded state of the button
        toggleBtnState(trigger);

        // Toggle the aria-hidden state of the drawer
        toggleHiddenState(target);

        // Toggle button open class
        trigger.classList.toggle('is-open');
    }

    var _bindUiActions = function() {
        drawerTrigger.addEventListener('click', function(e) {
            toggle(this, drawerEl, e)
        });

        for(var i = 0; i < drawerSubnavTriggers.length; i++) {
            drawerSubnavTriggers[i].addEventListener('click', function(e) {
                toggle(this, document.querySelector('#' + this.getAttribute('data-subnav-trigger')), e)
            });
        }

        // Make sure the extra close button is present in the DOM
        if (drawerBottomClose) {
            drawerBottomClose.addEventListener('click', function (e) {
                e.preventDefault()
                toggleHiddenState(drawerEl);
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
        init: init,
        toggle: toggle
    }
})();

