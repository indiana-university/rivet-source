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
    if (!id) {
      throw new Error("You must provide a unique id for the menu you're trying to open.");
    }
    // If there's an open menu, close it.
    if (activeMenu) {
      closeMenu(activeMenu);
    }

    // Set the current active menu the menu we're about to open
    activeMenu = id;

    var toggleSelector = '[' + TOGGLE_ATTR + '="' + id + '"]';

    var toggle = document.querySelector(toggleSelector);

    // If the menu was opened by clicking an associated toggle
    if (toggle && toggle !== null) {
      toggle.setAttribute('aria-expanded', 'true');

      activeToggle = toggle;
    }

    // Get the menu to be opened by id
    var menu = document.getElementById(id);

    if (!menu) {
      throw new Error('There was no menu found with an id attribute that matches the "data-dropdown-toggle" attribute on the dropdown toggle.');
    }

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
    if (!id) {
      throw new Error("You must provide a unique id for the menu you're trying to close.");
    }
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

  /**
   * @param {HTMLElement} menu
   * An HTMLElement that contains the dropdown menu options. This function
   * returns an object that holds a reference to all focusable element
   * in the menu, the first focusable, and the last focusable element
   */
  function _setUpMenu(menu) {
    var menuObject = {};

    // Create a real Array of all the focusable elements in the menu
    var menuFocusables = Array.prototype.slice.call(
      menu.querySelectorAll(ALL_FOCUSABLE_ELS)
    );

    // Create a property to hold an array of all focusables
    menuObject.all = menuFocusables;

    // Create a property with a reference to the first focusable
    menuObject.first = menuFocusables[0];

    // Create a property with a reference to the last focusable
    menuObject.last = menuFocusables[menuFocusables.length - 1];

    return menuObject;
  }

  /**
   * Event handlers
   */

  /**
   * @param {Event} event
   * This is function is used to handle all click events on the document.
   * It accepts the Event object, checks the target to see if it is a
   * dropdown toggle. If so, it opens the menu otherwise it closes any
   * open/active dropdown.
   */
  function _handleClick(event) {
    var toggle = event.target.closest('[' + TOGGLE_ATTR + ']');

    if (!toggle || toggle.getAttribute('aria-expanded') === 'true') {
      // No menu has been opened yet and the event target was not a toggle, so bail.
      if (!activeMenu) return;

      // Otherwise close the currently open menu
      closeMenu(activeMenu);

      return;
    }

    var dropdownId = toggle.getAttribute(TOGGLE_ATTR);

    openMenu(dropdownId);
  }

  /**
   *
   * @param {Event} event
   * This functions handles all keydown events on the document. It accepts
   * the event object, determines which keys were pressed and preforms the
   * appropriate actions. Used to handle keyboard navigation.
   */
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

  /**
   *
   * @param {HTMLElement} context
   * An optional DOM element. This only needs to be passed in if a DOM element
   * was passed to the init() fucntion. If so, the element passed in must
   * be the same element that was passed in at initialization so that
   * the event listers can be properly removed.
   */
  function destroy(context) {
    // Optional element to bind the event listeners to
    if (context === undefined) {
      context = document;
    }
    /**
     * Clean up event listeners
     */
    context.removeEventListener('click', _handleClick, false);
    context.removeEventListener('keydown', _handleKeydown, false);
  }

  /**
   *
   * @param {HTMLElement} context
   * An optional DOM element that the dropdown can be initialized on. All
   * event listeners will be attached to this element. Usually best to just
   * leave it to deafault to the document.
   */
  function init(context) {
    // Destroy any currently initialized dropdowns
    destroy(context);

    // Optional element to bind the event listeners to
    if (context === undefined) {
      context = document;
    }
    /**
     * Attach all event listerns to the document
     */
    context.addEventListener('click', _handleClick, false);
    context.addEventListener('keydown', _handleKeydown, false);
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
