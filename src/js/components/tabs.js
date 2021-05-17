/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */
import Component from './component';
import { nodeListToArray } from '../utilities/domHelpers';
import keyCodes from '../utilities/keyCodes';

export default class Tabs extends Component {
  static get selector() {
    return '[data-rvt-tabs]';
  }

  static get methods() {
    return {
      init() {
        console.log('Tabs::init()');
        
        this.tablist = this.element.querySelector('[role="tablist"]');
        this.tabAttribute = 'data-rvt-tab';
        this.tabSelector = `[${this.tabAttribute}]`;
        this.tabs = nodeListToArray(
          this.element.querySelectorAll(this.tabSelector)
        );
        this.panelAttribute = 'data-rvt-tab-panel';
        this.panelSelector = `[${this.panelAttribute}]`;
        this.panels = nodeListToArray(
          this.element.querySelectorAll(this.panelSelector)
        );

        // Determine if a specific panel has been initialized with the data-rvt-tab-init attribute, otherwise, use the first tab
        let initialPanel;
        this.panels.forEach((panel, index) => {
          if (panel.hasAttribute('data-rvt-tab-init')) {
            initialPanel = panel;
          } else {
            this.tabs[index].setAttribute('tabindex', '-1');
          }
        });

        // If a specific panel was initialized set this.openOnInit equal to it, otherwise fallback to the first panel
        this.openOnInit = initialPanel.getAttribute(this.panelAttribute) || this.panels[0].getAttribute(this.panelAttribute);

        console.log(this.openOnInit);

        // bind methods
        Component.bindMethodToDOMElement(this, 'activateTab', this.activateTab);

        this._handleClick = this._handleClick.bind(this);
        this._handleKeydown = this._handleKeydown.bind(this);
      },

      connected() {
        Component.dispatchComponentAddedEvent(this.element);

        this.activateTab(this.openOnInit);
        
        this.tablist.addEventListener('click', this._handleClick, false);
        this.tablist.addEventListener('keydown', this._handleKeydown, false);
      },

      disconnected() {
        Component.dispatchComponentRemovedEvent(this.element);

        this.tablist.removeEventListener('click', this._handleClick, false);
        this.tablist.removeEventListener('keydown', this._handleKeydown, false);
      },

      _handleClick(event) {
        const currentTab = event.target.closest(this.tabSelector);
        // If not a tab, ignore
        if (!currentTab) return;
    
        // Get the data-rvt-tab value
        const tabId = currentTab.getAttribute(this.tabAttribute);
    
        // Activate tab
        this.activateTab(tabId);
      },

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
      },

      activateTab(tabId) {
        const tab = this.element.querySelector(
          `[${this.panelAttribute}="${tabId}"]`
        );

        if (!tab) {
          console.warn(`No such tab '${tabId}' in Tabs.activateTab()`);
          return;
        }

        const activationEvent = Component.dispatchCustomEvent(
          'tabActivated',
          tab, 
          {
            id: tab.dataset.rvtTabPanel
          }
        );
    
        if (!activationEvent) return;
    
        const trigger = this.element.querySelector(
          `[${this.tabAttribute}="${tab.dataset.rvtTabPanel}"]`
        );
    
        this.panels.forEach((panel, index) => {
          if (panel.getAttribute(this.panelAttribute) !== tab.dataset.rvtTabPanel) {
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
      }
    }
  }
}
