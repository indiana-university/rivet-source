var Tabs = (function() {
  // Documentation URL:
  var docsURL =
    'https://rivet.uits.iu.edu/components/page-content/tabs/#javascript-api';

  // Keycodes for easy reference
  var KEYS = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  };

  var LEGACY_SELECTORS = '[data-tab], [aria-controls]';

  // Converts a nodeList to an array
  function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  /**
   *
   * @param {HTMLButtonElement} item
   */
  function handleTabActivate(item) {
    item.setAttribute('aria-selected', 'true');
    item.removeAttribute('tabindex');
  }

  /**
   *
   * @param {HTMLButtonElement} item
   */
  function handleTabDeactivate(item) {
    item.setAttribute('aria-selected', 'false');
    item.setAttribute('tabindex', '-1');
  }

  /**
   *
   * @param {String} id
   */
  function activateTab(id) {
    var activeTabSelector =
      '[data-tab="' + id + '"], [aria-controls="' + id + '"]';

    var activeTab =
      document.querySelector(activeTabSelector);

    if (!activeTab) {
      console.warn(
        'There were no tabs found with the id of ' + id + '.' + '\n' +
        'Please see the Rivet tabs documentation for more info: ' + docsURL
      );

      return;
    }

    var tabSet =
      activeTab.parentNode.querySelectorAll(LEGACY_SELECTORS);

    var tabs = nodeListToArray(tabSet);

    /**
     * Creates a new array of the tab panels. The array index of each
     * panel corresponds to the index of each tab (button).
     */
    var tabPanels = tabs.map(function (item) {
      /**
       * NOTE: should think about removing the aria-controls selector in
       * future versions in favor of the standard data attributes
       * we are for JS hooks throughout Rivet.
       */
      var id =
        item.getAttribute('data-tab') ||
        item.getAttribute('aria-controls');

      return document.getElementById(id);
    });

    tabs.forEach(function(item) {
      item === activeTab ?
        handleTabActivate(item) :
        handleTabDeactivate(item);
    });

    tabPanels.forEach(function(item) {
      var tabId =
        activeTab.getAttribute('data-tab') ||
        activeTab.getAttribute('aria-controls');

      item.id === tabId ?
        item.removeAttribute('hidden') :
        item.setAttribute('hidden', 'hidden');
    });
  }

  function _handleClick(event) {
    // NOTE: Backwards compatibility for 'aria-controls' here.
    var activeTab = event.target.closest(LEGACY_SELECTORS);

    if (!activeTab) return;

    var id =
      activeTab.getAttribute('data-tab') ||
      activeTab.getAttribute('aria-controls');

    activateTab(id);
  }

  function _handleKeydown(event) {
    // Handle keydown events here
    var activeTab  = event.target.closest(LEGACY_SELECTORS);

    if (!activeTab) return;

    // Create a nodeList of all the buttons in the tab set
    var tabSet =
      activeTab.parentNode.querySelectorAll(LEGACY_SELECTORS);

    /**
     * Convert nodeList to an array so we can find the first, last, etc.
     * element and use Array methods on it.
     */
    var tabs = nodeListToArray(tabSet);

    var nextTab = tabs.indexOf(activeTab) + 1;

    var prevTab = tabs.indexOf(activeTab) - 1;

    switch (event.keyCode) {
      case KEYS.right || KEYS.down:
        !tabs[nextTab] ? tabs[0].focus() : tabs[nextTab].focus();

        break;
      case KEYS.down:
        !tabs[nextTab] ? tabs[0].focus() : tabs[nextTab].focus();

        break;
      case KEYS.left:
        !tabs[prevTab] ? tabs[tabs.length - 1].focus() : tabs[prevTab].focus();

        break;
      case KEYS.up:
        !tabs[prevTab] ? tabs[tabs.length - 1].focus() : tabs[prevTab].focus();

        break;
      case KEYS.end:
        tabs[tabs.length - 1].focus();

        break;
      case KEYS.home:
        tabs[0].focus();
        break;
      default:
        return;
    }
  }

  function destroy(context) {
    if (context === undefined) {
      context = document;
    }
  }

  function init(context) {
    if (context === undefined) {
      context = document;
    }

    // Destroy any currently initialized tabs
    destroy(context);

    context.addEventListener('click', _handleClick, false);
    context.addEventListener('keydown', _handleKeydown, false);
  }

  return {
    init: init,
    destroy: destroy,
    activateTab: activateTab
  };
})();
