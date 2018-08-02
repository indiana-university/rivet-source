var Dropdown = (function() {
  /**
   * Global references
   */

  // Keeps track of the currently active toggle. Helps with focus management
  var activeToggle;
  var activeMenu;

  /**
   * Global constants
   */

  // For easy reference
  var KEYS = {
    up: 38,
    down: 40,
    tab: 9,
    escape: 27
  };

  // Anything that is focusable
  var ALL_FOCUSABLE_ELS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

  var MENU_SELECTOR = '.rvt-dropdown__menu';

  var TOGGLE_ATTR = 'data-dropdown-toggle';

  /**
   * @param {String} id
   * A unique string used for the dropdown toggle element's
   * data-dropdown-toggle attribute and the corresponding menu's
   * "id" attribute.
   * @param {Function} callback
   * An optional callback function that gets emmitted after the
   * menu is opened.
   */
  function openMenu(id, callback) {
    // Start off by closing any open menus
    closeAllMenus();

    var toggleSelector = '[data-dropdown-toggle="' + id + '"]';

    var toggle = document.querySelector(toggleSelector);

    // If the menu was opened by clicking an associated toggle
    if (toggle && toggle !== null) {
      toggle.setAttribute('aria-expanded', 'true');

      activeToggle = toggle;
    }

    // Get the menu to be opened by id
    var menu = document.getElementById(id);

    // Remove the 'hidden' attribute to show the menu
    menu.setAttribute('aria-hidden', 'false');

    // Emmit a custom event that can be used as a hook for other actions
    fireCustomEvent(toggle, TOGGLE_ATTR, 'dropdownOpen');

    // Execute supplied callback function if it exists
    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  /**
   * @param {String} id
   * A unique string associate with the dropdown's
   * "data-dropdown-toggle" and "id" attributes.
   * @param {Function} callback
   * An optional callback function that is
   * executed after the closeMenu method is called.
   */
  function closeMenu(id, callback) {
    var toggle = document.querySelector('[' + TOGGLE_ATTR + '="' + id + '"]');

    if (toggle && toggle !== undefined) {
      toggle.setAttribute('aria-expanded', 'false');
    }

    var menu = document.getElementById(id);

    menu.setAttribute('aria-hidden', 'true');

    // Emmit a custom event that can be used as a hook for other actions
    fireCustomEvent(toggle, TOGGLE_ATTR, 'dropdownClose');

    // Execute supplied callback function if it exists
    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  function _setUpMenu(menu) {
    var menuObject = {};

    // Create a real Array of all the focusable elements in the menu
    var menuFocusbles = Array.prototype.slice.call(
      menu.querySelectorAll(ALL_FOCUSABLE_ELS)
    );

    // Create a property to hold an array of all focusables
    menuObject.all = menuFocusbles;

    // Create a property with a reference to the first focusable
    menuObject.first = menuFocusbles[0];

    // Create a property with a reference to the last focusable
    menuObject.last = menuFocusbles[menuFocusbles.length - 1];

    return menuObject;
  }

  /**
   * Event handlers
   */

  function _handleClick(event) {
    var toggle = event.target.closest('[' + TOGGLE_ATTR + ']');

    if (!toggle || toggle.getAttribute('aria-expanded') === 'true') {
      closeAllMenus();

      return;
    }

    // Close any other open menu
    closeAllMenus();

    var dropdownId = toggle.getAttribute(TOGGLE_ATTR);

    openMenu(dropdownId);
  }

  function _handleKeydown(event) {
    switch (event.keyCode) {
      // Handle down key
      case KEYS.down:
        var toggle = event.target.closest('[' + TOGGLE_ATTR + ']');

        /**
         * If you were focused on the dropdown toggle
         */
        if (toggle && toggle !== null) {
          var dropdownId = toggle.getAttribute(TOGGLE_ATTR);

          var menu = document.getElementById(dropdownId);

          // If your focused on the toggle button and the menu is open.
          if (toggle.getAttribute('aria-expanded') === 'true') {
            var currentMenu = _setUpMenu(menu);

            currentMenu.first.focus();
          }

          openMenu(dropdownId);
        }

        /**
         * Handle down arrow key when inside the open menu.
         */
        if (event.target.closest(MENU_SELECTOR) !== null) {
          var theMenu = event.target.closest(MENU_SELECTOR);

          var currentMenu = _setUpMenu(theMenu);

          var currentIndex;

          /**
           * This keeps track of which button/focusable is focused in the open menu
           */
          for (var i = 0; i < currentMenu.all.length; i++) {
            if (event.target == currentMenu.all[i]) {
              currentIndex = i;
            }
          }

          var nextItem = currentMenu.all[currentIndex + 1];

          if (!nextItem) {
            currentMenu.first.focus();

            return;
          }

          nextItem.focus();
        }

        break;

      case KEYS.up:
        /**
         * TODO: This needs to be refactored into something reusable - lots of
         * repetition here.
         */

        // Handle up arrow key when inside the open menu.
        if (event.target.closest(MENU_SELECTOR) !== null) {
          var theMenu = event.target.closest(MENU_SELECTOR);

          var currentMenu = _setUpMenu(theMenu);

          var currentIndex;

          // This keeps track of which button/focusable is focused in the open menu
          for (var i = 0; i < currentMenu.all.length; i++) {
            if (event.target == currentMenu.all[i]) {
              currentIndex = i;
            }
          }

          var previousItem = currentMenu.all[currentIndex - 1];

          if (!previousItem && currentMenu.last !== undefined) {
            currentMenu.last.focus();
            return;
          }

          previousItem.focus();
        }

        break;

      case KEYS.escape:
        // If there's an open menu, close it.
        if (activeMenu) {
          closeMenu(activeMenu);
        }

        if (activeToggle && activeToggle !== null) {
          activeToggle.focus();
        }

        break;

      case KEYS.tab:
        // Handle tab key when inside the open menu.
        if (event.target.closest(MENU_SELECTOR) !== null || undefined) {
          var theMenu = event.target.closest(MENU_SELECTOR);

          var currentMenu = _setUpMenu(theMenu);

          var currentIndex;

          // This keeps track of which button/focusable is focused in the open menu
          for (var i = 0; i < currentMenu.all.length; i++) {
            if (event.target == currentMenu.all[i]) {
              currentIndex = i;
            }
          }

          // Close the dropdown when the user tabs out of the menu.
          if (document.activeElement == currentMenu.last && !event.shiftKey) {
            closeMenu(activeMenu);

            return;
          }
        }

        break;
    }
  }

  function init() {
    // Destroy any currently initialized dropdowns
    destroy();

    /**
     * Attach all event listerns to the document
     */
    document.addEventListener('click', _handleClick, false);
    document.addEventListener('keydown', _handleKeydown, false);
  }

  function destroy() {
    /**
     * Clean up event listeners
     */
    document.removeEventListener('click', _handleClick, false);
    document.removeEventListener('keydown', _handleKeydown, false);
  }

  /**
   * Return public APIs
   */
  return {
    open: openMenu,
    close: closeMenu,
    init: init,
    destroy: destroy
  };
})();
