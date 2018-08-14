var Tabs = (function() {
  // Keycodes for easy reference
  var keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  };

  // Converts a nodeList to an array
  function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  function _handleClick(event) {
    // NOTE: Backwards compatibility for 'aria-controls' here.
    var activeTab = event.target.closest('[data-tab], [aria-controls]');

    if (!activeTab) return;

    var tabList = activeTab.parentNode;

    /**
     * Build arrays of tabs (buttons) and panels
     */
    var tabs = nodeListToArray(
      // NOTE: Backwards compatibility for 'aria-controls' here.
      tabList.querySelectorAll('[data-tab], [aria-controls]')
    );

    var tabPanels = tabs.map(function(item) {
      var id = item.getAttribute('data-tab') || item.getAttribute('aria-controls');

      return document.getElementById(id);
    });

    activateTab(activeTab, tabs, tabPanels);
  }

  function activateTab(activeTab, tabs, tabPanels) {
    tabs.forEach(function (item) {
      item === activeTab ?
        item.setAttribute('aria-selected', 'true') :
        item.setAttribute('aria-selected', 'false');
    });

    tabPanels.forEach(function (item) {
      var tabId = activeTab.getAttribute('data-tab') || activeTab.getAttribute('aria-controls');
      item.id === tabId ?
        item.removeAttribute('hidden') :
        item.setAttribute('hidden', 'hidden');
    });
  }





  function _handleKeydown(event) {
      // Handle keydown events here
  }

  function _handleKeyup(event) {
      // Handle keyup events here
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
    context.addEventListener('keyup', _handleKeyup, false);
  }

  return {
    init: init,
    destroy: destroy
  };
})();
