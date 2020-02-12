/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */
import dispatchCustomEvent from '../utilities/dispatchCustomEvent';
import { isNode, nodeListToArray } from '../utilities/domHelpers';
import keyCodes from '../utilities/keyCodes';

export default class Tabs {
  constructor(element) {
    // Instance properties
    this.element = element;

    // Check to make sure that a DOM element was passed in for initialization
    if (!isNode(this.element)) {
      throw new TypeError(
        'A DOM element should be passed as the first argument to initialize the modal.'
      );
    }

    this.tablist = this.element.querySelector('[role="tablist"]');
    this.tabAttribute = 'data-tab';
    this.tabSelector = `[${this.tabAttribute}]`;
    this.tabs = nodeListToArray(
      this.element.querySelectorAll(this.tabSelector)
    );
    this.panelAttribute = 'data-tab-panel';
    this.panelSelector = `[${this.panelAttribute}]`;
    this.panels = nodeListToArray(
      this.element.querySelectorAll(this.panelSelector)
    );

    // Determine if a specific panel has been initialized with the data-tab-init attribute, otherwise, use the first tab
    let initialPanel;
    this.panels.forEach((panel, index) => {
      if (panel.hasAttribute('data-tab-init')) {
        initialPanel = panel;
      } else {
        this.tabs[index].setAttribute('tabindex', '-1');
      }
    });

    // If a specific panel was initialized set this.openOnInit equal to it, otherwise fallback to the first panel
    this.openOnInit = initialPanel || this.panels[0];

    // bind methods
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);

    this.init();
  }

  /**
   * This function is used to handle all click events on
   * the document. It accepts the Event object, checks target to see if it came
   * from a tab. From there, it gets the related panel and activates it.
   * @param {Event} event
   */
  _handleClick(event) {
    const currentTab = event.target.closest(this.tabSelector);
    // If not a tab, ignore
    if (!currentTab) return;

    // Get the data-tab value
    const currentTabValue = currentTab.getAttribute(this.tabAttribute);

    // Get the associated panel
    const currentPanel = this.element.querySelector(
      `[${this.panelAttribute}="${currentTabValue}"]`
    );

    // Activate tab
    this.activateTab(currentPanel);
  }

  /**
   * This function is used to handle all keydown events on the document. It
   * sets up handling for arrows, end, and home.
   * @param {Event} event
   */
  _handleKeydown(event) {
    const currentTab = event.target.closest(this.tabSelector);
    // If not a tab, ignore
    if (!currentTab) return;

    // Create an array of all the focusable elements within the modal
    const nextTab = this.tabs.indexOf(currentTab) + 1;
    const prevTab = this.tabs.indexOf(currentTab) - 1;

    switch (event.keyCode) {
      case keyCodes.right || keyCodes.down: {
        !this.tabs[nextTab] ? this.tabs[0].focus() : this.tabs[nextTab].focus();
        break;
      }

      case keyCodes.down: {
        !this.tabs[nextTab] ? this.tabs[0].focus() : this.tabs[nextTab].focus();
        break;
      }

      case keyCodes.left: {
        !this.tabs[prevTab]
          ? this.tabs[this.tabs.length - 1].focus()
          : this.tabs[prevTab].focus();
        break;
      }

      case keyCodes.up: {
        !this.tabs[prevTab]
          ? this.tabs[this.tabs.length - 1].focus()
          : this.tabs[prevTab].focus();
        break;
      }

      case keyCodes.end: {
        this.tabs[this.tabs.length - 1].focus();
        break;
      }

      case keyCodes.home: {
        this.tabs[0].focus();
        break;
      }

      default: {
        break;
      }
    }
  }

  /**
   * This function is used to trigger the 'tabActivated' custom event,
   * deactivate any other tab, and activate a tab/panel pair. It removes the
   * panel's hidden attribute, sets the tab's
   * aria-selected attribute to true. It also allows developers to setup a
   * custom callback function.
   * @param {Function} callback
   */
  activateTab(tab, callback) {
    // Trigger tabActivated custom event. This event is used to control the process of switching between tabs.

    const activationEvent = dispatchCustomEvent('tabActivated', tab, {
      id: tab.dataset.tabPanel
    });

    if (!activationEvent) return;

    const trigger = this.element.querySelector(
      `[${this.tabAttribute}="${tab.dataset.tabPanel}"]`
    );

    this.panels.forEach((panel, index) => {
      if (panel.getAttribute(this.panelAttribute) !== tab.dataset.tabPanel) {
        // Deactivate the appropriate tab/panel pair
        panel.setAttribute('hidden', '');
        this.tabs[index].setAttribute('aria-selected', 'false');
        this.tabs[index].setAttribute('tabindex', '-1');
      }
    });

    // Activate the appropriate tab/panel pair
    tab.removeAttribute('hidden');
    trigger.setAttribute('aria-selected', 'true');
    trigger.removeAttribute('tabindex');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  init() {
    this.activateTab(this.openOnInit);
    this.destroy();

    // Add click handlers
    this.tablist.addEventListener('click', this._handleClick, false);
    this.tablist.addEventListener('keydown', this._handleKeydown, false);
  }

  destroy() {
    this.tablist.removeEventListener('click', this._handleClick, false);
    this.tablist.removeEventListener('keydown', this._handleKeydown, false);
  }
}
