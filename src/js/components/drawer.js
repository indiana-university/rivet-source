var Drawer = (function() {
    var drawerTrigger = null;
    var drawerSubnavTriggers = null;
    var drawerId = null;
    var drawerEl = null;
    var drawerBottomClose = null;

    var init = function(context) {
        if (context === undefined) {
            context = document;
        }

        drawerTrigger = context.querySelector('[data-drawer-toggle]');
        drawerSubnavTriggers = context.querySelectorAll('[data-subnav-toggle]');
        drawerId = drawerTrigger ? drawerTrigger.getAttribute('data-drawer-toggle') : null;
        drawerEl = context.querySelector('#' + drawerId);
        drawerBottomClose = drawerEl ? drawerEl.querySelector('.rvt-drawer__bottom-close') : null;

        // Check to make sure the drawer is present in the DOM
        if(drawerTrigger) {
            _bindUiActions();
        }
    }

    var toggleBtnState = function (buttonEl) {
        var isExpanded = buttonEl.getAttribute('aria-expanded') === 'true' || false;
        buttonEl.setAttribute('aria-expanded', !isExpanded);
    }

    var toggleHiddenState = function (itemToToggle) {
        var itemState = itemToToggle.getAttribute('aria-hidden') === 'true' || false;
        itemToToggle.setAttribute('aria-hidden', !itemState);
    }

    var resetDrawer = function (drawerEl, drawerTrigger) {
        drawerEl.setAttribute('aria-hidden', 'true');
        drawerTrigger.setAttribute('aria-expanded', 'false');
        drawerTrigger.classList.remove('is-open');
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
                toggle(this, document.querySelector('#' + this.getAttribute('data-subnav-toggle')), e)
            });
        }

        // Make sure the extra close button is present in the DOM
        if (drawerBottomClose) {
            drawerBottomClose.addEventListener('click', function (e) {
                toggle(drawerTrigger, drawerEl, e);
            });
        }

        // Close the drawer if the user presses the ESC key
        document.addEventListener('keyup', function(e) {
            if(e.keyCode == 27 && drawerEl.getAttribute('aria-hidden') != 'true') {
                toggle(drawerTrigger, drawerEl, e);
            }
        });

        document.addEventListener('click', function(e) {
            if(e.target != drawerEl && !drawerEl.contains(e.target)) {
                resetDrawer(drawerEl, drawerTrigger);
            }
        });
    }

    return {
        init: init,
        toggle: toggle
    }
})();

