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
    this.tablist = this.element.querySelector('[role="tablist"]');
    this.tabAttribute = 'data-tab';
    this.tabSelector = `[${this.tabAttribute}]`;
    this.tabs = this.element.querySelectorAll(this.tabSelector);
    this.panelAttribute = 'data-tab-panel';
    this.panelSelector = `[${this.panelAttribute}]`;
    this.panels = nodeListToArray(this.element.querySelectorAll(this.panelSelector));


    // Determine if a specific panel has been initialized with the data-tab-init attribute, otherwise, use the first tab
    let initialPanel = {}
    this.panels.map((panel, index) => {
      if (this.panels[index].hasAttribute('data-tab-init') === true) {
        initialPanel = this.element.querySelector(`[${this.panelAttribute}="${panel.dataset.tabPanel}"]`);
      } else {
        const currentTab = this.element.querySelector(`[${this.tabAttribute}="${panel.dataset.tabPanel}"]`);

        currentTab.setAttribute('tabindex', '-1');
      }
    })

    // If a specific panel was initialized set this.openOnInit equal to it, otherwise fallback to the first panel
    initialPanel ? this.openOnInit = initialPanel : this.openOnInit = this.element.querySelector(`[${this.panelAttribute}="${this.panels[0].getAttribute(this.panelAttribute)}"]`);

    // bind methods
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);

    // Check to make sure that a DOM element was passed in for initialization
    if (!isNode(this.element)) {
      throw new TypeError(
        'A DOM element should be passed as the first argument to initialize the modal.'
      );
    }

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
    const currentPanel = this.element.querySelector(`[${this.panelAttribute}="${currentTabValue}"]`);

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
    const focusList = nodeListToArray(this.tabs);
    const nextTab = focusList.indexOf(currentTab) + 1;
    const prevTab = focusList.indexOf(currentTab) - 1;

    switch (event.keyCode) {
      case keyCodes.right || keyCodes.down: {

        !focusList[nextTab] ? focusList[0].focus() : focusList[nextTab].focus();

        break;
      }
      case keyCodes.down: {

        !focusList[nextTab] ? focusList[0].focus() : focusList[nextTab].focus();

        break;
      }
      case keyCodes.left: {

        !focusList[prevTab] ? focusList[focusList.length - 1].focus() : focusList[prevTab].focus();

        break;
      }
      case keyCodes.up: {

        !focusList[prevTab] ? focusList[focusList.length - 1].focus() : focusList[prevTab].focus();

        break;
      }
      case keyCodes.end: {

        focusList[focusList.length - 1].focus();

        break;
      }
      case keyCodes.home: {

        focusList[0].focus();

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
   * panel's hidden attribute, adds the .rvt-tab-open class, sets the tab's
   * aria-selected attribute to true. It also allows developers to setup a
   * custom callback function.
   * @param {Function} callback 
   */
  activateTab(tab, callback) {
    // Trigger tabActivated custom event. This event is used to control the process of switching between tabs.

    const activationEvent = dispatchCustomEvent(
      'tabActivated',
      tab,
      {
        id: tab.dataset.tabPanel,
      }
    );

    if (!activationEvent) return;

    const trigger = this.element.querySelector(`[${this.tabAttribute}="${tab.dataset.tabPanel}"]`);

    this.panels.forEach(panel => {
      if (panel.getAttribute(this.panelAttribute) !== tab.dataset.tabPanel && !panel.hasAttribute('hidden')) {
        this.deactivateTab(panel);
      }
    });

    // Activate the appropriate tab/panel pair
    tab.removeAttribute('hidden');
    tab.classList.add('rvt-tab-open');
    trigger.setAttribute('aria-selected', 'true');
    trigger.removeAttribute('tabindex');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  /**
   * This function is used to trigger the 'tabDeactivated' custom event,
   * and deactivates a tab/panel pair. It adds the hidden attribute, removes
   * the .rvt-tab-open class, and sets the tab's aria-selected attribute to
   * false. It also allows developers to setup a custom callback function.
   * @param {Function} callback 
   */
  deactivateTab(tab, callback) {
    // Trigger tabDeactivated custom event. This event is used to control the process of switching between tabs.

    const deactivationEvent = dispatchCustomEvent(
      'tabDeactivated',
      tab,
      {
        id: tab.dataset.tabPanel,
      }
    );

    if (!deactivationEvent) return;

    const trigger = this.element.querySelector(`[${this.tabAttribute}="${tab.dataset.tabPanel}"]`);

    // Deactivate the appropriate tab/panel pair
    tab.setAttribute('hidden', '');
    tab.classList.remove('rvt-tab-open');
    trigger.setAttribute('aria-selected', 'false');
    trigger.setAttribute('tabindex', '-1');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  init() {
    if (this.openOnInit) { this.activateTab(this.openOnInit); }

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