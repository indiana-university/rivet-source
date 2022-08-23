/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

// eslint-disable-next-line no-unused-vars
var Tabs = (function() {
  // Documentation base URL:
  var docsBaseUrl = 'https://rivet.uits.iu.edu';

  // component URL
  var componentUrl =
    docsBaseUrl + '/components/page-content/tabs/#javascript-api';

  // Keycodes for easy reference
  var KEYS = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  };

  /**
   * DEPRECATED: "Aria-controls" will be removed for next major 
   * release. Have added CSS selector to provide specific context
   * for aria-controls selection.
   */
  var LEGACY_SELECTORS = '[data-tab], .rvt-tabs__tab[aria-controls]';

  /**
   * @param {nodes} nodeList - Accepts a nodeList and returns an array.
   */
  function nodeListToArray(nodes) {
    return Array.prototype.slice.call(nodes);
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
  function activateTab(id, callback) {
    /**
     * NOTE: Adding "aria-controls" to this list for backwards
     * compatibility. Should eventually deprecate the use of or
     * "aria-controls" in favor of the data attributes added here.
     */
    var activeTabSelector =
      '[data-tab="' + id + '"], [aria-controls="' + id + '"]';

    var activeTab =
      document.querySelector(activeTabSelector);

    if (!activeTab) {
      /**
       * In recent rewrites of the some of the other JS components I've
       * been throwing Error Objects for things like missing parameters.
       * Wondering if it might makes sense to just provide a console
       * warning with links to the docs for these API methods?
       */
      // eslint-disable-next-line no-console
      console.warn(
        'There were no tabs found with the id of ' + id + '.' + '\n' +
        'Please see the Rivet Tabs JavaScript API documentation for more info: ' + '\n'
        + componentUrl
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

    /**
     * NOTE: For backward compatibility, we're excepting either the
     * 'data-tab' or 'aria-controls' attributes.
     */
    var eventAttribute =
      activeTab.hasAttribute('data-tab') ? 'data-tab' : 'aria-controls';

    // Fire the custom 'tabActivated' event
    // eslint-disable-next-line no-undef
    fireCustomEvent(activeTab, eventAttribute, 'tabActivated');

    // Execute callback if it exists
    if (callback && typeof callback === 'function') {
      callback();
    }
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
      case KEYS.right:
        event.preventDefault()
        !tabs[nextTab] ?
          tabs[0].focus() :
          tabs[nextTab].focus();

        break;
      case KEYS.left:
        event.preventDefault()
        !tabs[prevTab] ?
          tabs[tabs.length - 1].focus() :
          tabs[prevTab].focus();

        break;
      case KEYS.end:
        event.preventDefault()
        tabs[tabs.length - 1].focus();

        break;
      case KEYS.home:
        event.preventDefault()
        tabs[0].focus();

        break;
      default:
        return;
    }
  }

  /**
   * @param {HTMLElement} context
   */
  function destroy(context) {
    if (context === undefined) {
      context = document;
    }

    context.removeEventListener('click', _handleClick, false);
    context.removeEventListener('keydown', _handleKeydown, false);
  }

  /**
   * @param {HTMLElement} context
   */
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