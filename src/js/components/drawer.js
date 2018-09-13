var Drawer = (function() {
  'use strict';

  var KEYS = {
    up: 38,
    down: 40,
    tab: 9,
    escape: 27
  };

  var ALL_FOCUSABLE_ELS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
  var TOGGLE_ATTRIBUTE = 'data-drawer-toggle';
  var TOGGLE_SELECTOR = '[' + TOGGLE_ATTRIBUTE + ']';

  var activeDrawer;
  var activeToggle;

  function _createDrawerObject(id) {
    var drawer = {};

    drawer.toggle =
      document.querySelector('[' + TOGGLE_ATTRIBUTE + '="' + id + '"]');

    drawer.menu = document.getElementById(id);

    var drawerFocusables = Array.prototype.slice.call(drawer.menu.querySelectorAll(ALL_FOCUSABLE_ELS));

    drawer.focusables = drawerFocusables;

    drawer.firstFocusable = drawerFocusables[0];

    drawer.lastFocusable = drawerFocusables[drawerFocusables.length - 1];

    return drawer;
  }

  function open(id, callback) {
    var drawer = _createDrawerObject(id);

    activeDrawer = id;

    activeToggle = drawer.toggle;

    drawer.toggle.setAttribute('aria-expanded', 'true');

    drawer.menu.setAttribute('aria-hidden', 'false');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  function close(id, callback) {
    var drawerButton = document.querySelector('[data-drawer-toggle="' + id + '"]');

    var drawer = document.getElementById(id);

    drawerButton.setAttribute('aria-expanded', 'false');

    drawer.setAttribute('aria-hidden', 'true');

    if (callback && typeof callback === 'function') {
        callback();
    }
  }

  function toggleSubnav(event) {
    var subnav = event.target.closest('[data-subnav-toggle]');

    var subnavMenu =
      document.getElementById(subnav.getAttribute('data-subnav-toggle'));

    var isExpanded =
      subnav.getAttribute('aria-expanded') === 'true' || false;

    subnav.setAttribute('aria-expanded', !isExpanded);

    subnavMenu.setAttribute('aria-hidden', isExpanded);
  }

  function _handleClick(event) {
    event.target.closest('.rvt-drawer') !== null ?
      event.clickedInDrawer = true :
      event.clickedInDrawer = false;

    if (event.clickedInDrawer) {
      event.stopPropagation();

      // toggle subnav
      if (event.target.closest('[data-subnav-toggle]')) {
        toggleSubnav(event);
      }

      /**
       * If the target was the bottom close button that is only visible
       * when focused, close the drawer.
       */
      var bottomCloseButton =
        event.target.closest('[data-close-drawer], rvt-drawer__bottom-close');

      if (bottomCloseButton !== null) {
        close(activeDrawer);

        activeToggle.focus();
      }

      return;
    }

    var drawerToggle = event.target.closest(TOGGLE_SELECTOR);

    if (!drawerToggle || drawerToggle.getAttribute('aria-expanded') === 'true') {
      if (!activeDrawer) return;

      close(activeDrawer);

      return;
    }

    open(drawerToggle.getAttribute(TOGGLE_ATTRIBUTE));
  }

  function _handleKeydown(event) {
    // Handle keyboard stuff
    switch (event.keyCode) {
      case KEYS.down:
        // Stop the page from shimmying when using down key
        event.preventDefault();

        // Check to see if the target was the drawer toggle.
        var toggle = event.target.closest(TOGGLE_SELECTOR);

        // If it was the toggle, do toggle stuff
        if (toggle && toggle !== null) {
          var id = toggle.getAttribute(TOGGLE_ATTRIBUTE);

          var drawer = _createDrawerObject(id);

          /**
           * If the drawer is already open/expanded focus the first
           * focus-able element in the drawer, otherwise open it.
           */
          drawer.toggle.getAttribute('aria-expanded') === 'true' ?
            drawer.firstFocusable.focus() :
            open(id);

            return;
        }

        /**
         * Handle the down key press when the drawer is open and a
         * focus-able element inside has focus.
         */
        if (event.target.closest('#' + activeDrawer)) {
          // Each time we create a new drawer object to work with.
          var drawer = _createDrawerObject(activeDrawer);

          // Keep track of the index of the currently focused element
          var currentIndex;

          /**
           * This keeps track of which button/focusable is focused
           * in the open drawer.
           */
          for (var i = 0; i < drawer.focusables.length; i++) {
            if (event.target === drawer.focusables[i]) {
              currentIndex = i;
            }
          }

          var nextItem = drawer.focusables[currentIndex + 1];

          // If it's the last focus-able move back to the first.
          if (!nextItem) {
            drawer.firstFocusable.focus();

            return;
          }

          nextItem.focus();
        }
    }
  }

  function destroy(context) {
    if (context === undefined) {
        context = document;
    }

    document.removeEventListener('click', _handleClick, false);
    document.removeEventListener('keydown', _handleKeydown, false);
  }

  function init(context) {
    // Optional element to bind the event listeners to
    if (context === undefined) {
      context = document;
    }

    // Destroy any currently initialized drawers
    destroy(context);

    document.addEventListener('click', _handleClick, false);
    document.addEventListener('keydown', _handleKeydown, false);
  }

  return {
    init: init,
    destroy: destroy,
    open: open,
    close: close
  }
})();

