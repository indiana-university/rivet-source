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

  /**
   * These variables keep track of whether the drawer is open/close.
   * They are used to help manage focus based on keyboard interaction.
   */
  var activeDrawer;
  var activeToggle;

  /**
   * @returns {Object} - An object containing references
   * to all focus-able elements, the first and last focus-able
   * elements in the drawer.
   * @param {String} id - The unique id of the drawer that you
   * are interacting with.
   */
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

  /**
   *
   * @param {String} id - The unique id of the drawer to open
   * @param {Function} callback - An optional callback function that is
   * executed after the drawer is opened
   */
  function open(id, callback) {
    /**
     * Set up drawer object so store all the values we need to work with
     * when managing focus (e.g. all focus-able elements, first, last, etc.)
     */
    var drawer = _createDrawerObject(id);

    // Keep track of the open drawer
    activeDrawer = id;

    // Keep track of the active toggle so we can focus later
    activeToggle = drawer.toggle;

    // Emit a custom event that can be used as a hook for other actions
    fireCustomEvent(activeToggle, TOGGLE_ATTRIBUTE, 'drawerOpen');

    // Open the drawer
    drawer.toggle.setAttribute('aria-expanded', 'true');

    drawer.menu.setAttribute('aria-hidden', 'false');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  /**
   *
   * @param {String} id - The unique id of the drawer to close
   * @param {Function} callback - An optional callback function that
   * is executed after the drawer is closed.
   */
  function close(id, callback) {
    var drawerButton = document.querySelector('[data-drawer-toggle="' + id + '"]');

    var drawer = document.getElementById(id);

    drawerButton.setAttribute('aria-expanded', 'false');

    drawer.setAttribute('aria-hidden', 'true');

    // Emit a custom event that can be used as a hook for other actions
    fireCustomEvent(drawerButton, TOGGLE_ATTRIBUTE, 'drawerClose');

    if (callback && typeof callback === 'function') {
        callback();
    }
  }

  /**
   * Toggles drawer subnavs
   * @param {String} id - the unique id of the drawer subnav/tree toggle
   */
  function _toggleSubnav(id) {
    var subnav = document.querySelector('[data-subnav-toggle="' + id + '"]');

    var subnavMenu = document.getElementById(id);

    var isExpanded =
      subnav.getAttribute('aria-expanded') === 'true' || false;

    subnav.setAttribute('aria-expanded', !isExpanded);

    subnavMenu.setAttribute('aria-hidden', isExpanded);
  }

  /**
   * The main click event handler that gets attached to the document
   *
   * @param {Event} event
   */
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
        event.target.closest('[data-close-drawer], .rvt-drawer__bottom-close');

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

  /**
   * The main keydown event lister that gets attached to the document
   * to handle all keyboard interaction.
   * @param {Event} event
   */
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

  /**
   * Cleans up any currently initialized Drawers
   *
   * @param {HTMLElement} context - An optional DOM element. This only
   * needs to be passed in if a DOM element was passed to the init()
   * function. If so, the element passed in must be the same element
   * that was passed in at initialization so that the event listers can
   * be properly removed.
   */
  function destroy(context) {
    if (context === undefined) {
        context = document;
    }

    document.removeEventListener('click', _handleClick, false);
    document.removeEventListener('keydown', _handleKeydown, false);
  }

  /**
   * Kicks of the Drawer component and sets up all event listeners
   *
   * @param {HTMLElement} context - An optional DOM element that the
   * drawer can be initialized on. All event listeners will be attached
   * to this element. Usually best to just leave it to default
   * to the document.
   */
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
    close: close,
    onOpen: onOpen
  }
})();