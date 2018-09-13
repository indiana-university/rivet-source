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

    // Emmit a custom event that can be used as a hook for other actions
    fireCustomEvent(activeToggle, TOGGLE_ATTRIBUTE, 'drawerOpen');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  function close(id, callback) {
    var drawerButton = document.querySelector('[data-drawer-toggle="' + id + '"]');

    var drawer = document.getElementById(id);

    drawerButton.setAttribute('aria-expanded', 'false');

    drawer.setAttribute('aria-hidden', 'true');

    // Emmit a custom event that can be used as a hook for other actions
    fireCustomEvent(drawerButton, TOGGLE_ATTRIBUTE, 'drawerClose');

    if (callback && typeof callback === 'function') {
        callback();
    }
  }

  function _toggleSubnav(id) {
    var subnav = document.querySelector('[data-subnav-toggle="' + id + '"]');

    var subnavMenu = document.getElementById(id);

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
        var toggle = event.target.closest('[data-subnav-toggle]');

        var id = toggle.getAttribute('data-subnav-toggle');

        _toggleSubnav(id);
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

          // Filter out any focus-able that is not visible
          var currentlyVisible = drawer.focusables.filter(function(item) {
            return item.clientHeight > 0;
          });

          // Add currently visible focus-able elements to the drawer object
          drawer.visibleFocusables = currentlyVisible;

          /**
           * This keeps track of which button/focusable is focused
           * in the open drawer.
           */
          for (var i = 0; i < drawer.visibleFocusables.length; i++) {
            if (event.target === drawer.visibleFocusables[i]) {
              currentIndex = i;
            }
          }

          var nextItem = drawer.visibleFocusables[currentIndex + 1];

          // If it's the last focus-able move back to the first.
          if (!nextItem) {
            // Always return focus to the first element
            drawer.firstFocusable.focus();

            return;
          }

          nextItem.focus();
        }

        break;
      case KEYS.up:
        /**
         * Same as down handler, but in reverse. TODO: find a way to
         * refactor the up and down handler to something that determine
         * orientation and then use a generic function to handle
         * the keydown.
         */
        if (event.target.closest('#' + activeDrawer)) {
          // Each time we create a new drawer object to work with.
          var drawer = _createDrawerObject(activeDrawer);

          // Keep track of the index of the currently focused element
          var currentIndex;

          // Filter out any focus-able that is not visible
          var currentlyVisible = drawer.focusables.filter(function (item) {
            return item.clientHeight > 0;
          });

          // Add currently visible focus-able elements to the drawer object
          drawer.visibleFocusables = currentlyVisible;

          /**
           * This keeps track of which button/focusable is focused
           * in the open drawer.
           */
          for (var i = 0; i < drawer.visibleFocusables.length; i++) {
            if (event.target === drawer.visibleFocusables[i]) {
              currentIndex = i;
            }
          }

          var previousItem = drawer.visibleFocusables[currentIndex - 1];

          // If it's the last focus-able move back to the first.
          if (!previousItem) {
            // Always return focus to the first element
            drawer.lastFocusable.focus();

            return;
          }

          previousItem.focus();
        }

        break;
      case KEYS.escape:
        // Handle escape key
        if (activeDrawer) {
          close(activeDrawer);
        }

        if (activeToggle && activeToggle !== null) {
          activeToggle.focus();
        }

      break;

      default:
      break;
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

