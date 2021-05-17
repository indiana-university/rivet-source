/**
 * Copyright (C) 2020 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */
import Component from './component';
import { nodeListToArray } from '../utilities/domHelpers';
import keyCodes from '../utilities/keyCodes';

export default class Accordion extends Component {
  static get selector() {
    return '[data-rvt-accordion]';
  }

  static get methods() {
    return {
      init() {
        console.log('Accordion::init()');

        this.openAllOnInit = this.element.hasAttribute('data-rvt-accordion-open-all');
        this.triggerAttribute = 'data-rvt-accordion-trigger';
        this.triggerSelector = `[${this.triggerAttribute}]`;
        this.triggers = nodeListToArray(
          this.element.querySelectorAll(this.triggerSelector)
        );
        
        if (this.triggers.length < 2) {
          console.warn(
            'An accordion should contain *at least two* accordion triggers with the "data-rvt-accordion-trigger" attribute'
          );
        }
        
        this.panelAttribute = 'data-rvt-accordion-panel';
        this.panelSelector = `[${this.panelAttribute}]`;
        this.panels = nodeListToArray(
          this.element.querySelectorAll(this.panelSelector)
        );
        
        const initializedPanels = this.element.querySelectorAll(
          `[data-rvt-accordion-panel-init]`
        );

        try {
          if (initializedPanels.length > 1) {
            console.warn('Caught');
          }
    
          let initialPanel;
    
          // Determine if a specific panel has been initialized with the data-rvt-tab-init attribute, otherwise, use the first tab
          this.panels.forEach((panel, index) => {
            if (panel.hasAttribute('data-rvt-accordion-panel-init')) {
              initialPanel = panel;
            } else {
              this.panels[index].setAttribute('hidden', '');
            }
          });
    
          // If a specific panel was initialized set this.openOnInit equal to it, otherwise fallback to the first panel
          this.openOnInit = initialPanel.getAttribute(this.panelAttribute);
        } catch (e) {
          console.warn(
            'Only one accordion panel should have the data-rvt-accordion-panel-init attribute. If you wish to open all panels on initialization, please apply the appropriate attribute to the data-rvt-accordion element'
          );
        }
    
        // bind methods
        Component.bindMethodToDOMElement(this, 'open', this.open);
        Component.bindMethodToDOMElement(this, 'close', this.close);

        this._handleClick = this._handleClick.bind(this);
        this._handleKeydown = this._handleKeydown.bind(this);
      },

      connected() {
        Component.dispatchComponentAddedEvent(this.element);

        this._openOnInit();
      },

      disconnected() {
        Component.dispatchComponentRemovedEvent(this.element);
      },

      onClick(event) {
        this._handleClick(event);
      },

      onKeydown(event) {
        this._handleKeydown(event);
      },

      _openOnInit() {
        // If accordion is set to open all panels on init, open them
        if (this.openAllOnInit === true) {
          this.panels.forEach(panel => {
            this.open(panel.getAttribute(this.panelAttribute));
          });
        } else {
          // Keep all other accordions closed by setting their initial states
          this.panels.forEach((panel, index) => {
            if (panel.getAttribute(this.panelAttribute) !== this.openOnInit) {
              // Set non-initialized accordion panels to hidden
              this.panels[index].setAttribute('hidden', '');
              const trigger = this.element.querySelector(
                `[${this.triggerAttribute}="${panel.dataset.rvtAccordionPanel}"]`
              );
              // Set 'aria-expanded' for all non-initialized accordion triggers to 'false'
              trigger.setAttribute('aria-expanded', 'false');
            } else {
              // If this.openOnInit has been set, open it on initialization
              this.open(this.openOnInit);
            }
          });
        }
      },

      _handleClick(event) {
        const currentTrigger = event.target.closest(this.triggerSelector);
        // If not an accordion trigger, ignore
        if (!currentTrigger) return;
    
        // Get the data-rvt-accordion-trigger value
        const currentTriggerValue = currentTrigger.getAttribute(
          this.triggerAttribute
        );
    
        // Open or close accordion
        currentTrigger.getAttribute('aria-expanded') === 'true'
          ? this.close(currentTriggerValue)
          : this.open(currentTriggerValue);
      },

      _handleKeydown(event) {
        if (
          event.keyCode === keyCodes.up ||
          event.keyCode === keyCodes.down ||
          event.keyCode === keyCodes.end ||
          event.keyCode === keyCodes.home
        ) {
          const accordionParent = event.target.closest('[data-rvt-accordion]');
          // If not an accordion, ignore
          if (!accordionParent) return;
    
          const currentTrigger = event.target.closest(this.triggerSelector);
          if (!currentTrigger) return;
    
          // Create an array of all the focusable elements within the accordion
          const nextTrigger = this.triggers.indexOf(currentTrigger) + 1;
          const prevTrigger = this.triggers.indexOf(currentTrigger) - 1;
    
          switch (event.keyCode) {
            case keyCodes.up: {
              if (this.triggers[prevTrigger] === undefined) {
                this.triggers[this.triggers.length - 1].focus();
              } else {
                this.triggers[prevTrigger].focus();
              }
              break;
            }
    
            case keyCodes.down: {
              if (this.triggers[nextTrigger] === undefined) {
                this.triggers[0].focus();
              } else {
                this.triggers[nextTrigger].focus();
              }
              break;
            }
    
            case keyCodes.end: {
              this.triggers[this.triggers.length - 1].focus();
              break;
            }
    
            case keyCodes.home: {
              this.triggers[0].focus();
              break;
            }
    
            default: {
              break;
            }
          }
        }
      },

      open(panelId) {
        const panel = this.element.querySelector(
          `[${this.panelAttribute}="${panelId}"]`
        );

        if (!panel) {
          console.warn(`No such panel '${panelId}' in Accordion.open()`);
          return;
        }
    
        const activationEvent = Component.dispatchCustomEvent(
          'accordionOpened',
          panel,
          {
            id: panel.dataset.rvtAccordionPanel
          }
        );
    
        if (!activationEvent) return;
    
        const trigger = this.element.querySelector(
          `[${this.triggerAttribute} = "${panel.dataset.rvtAccordionPanel}"]`
        );

        console.log(`[${this.triggerAttribute} = "${panel.dataset.rvtAccordionPanel}"]`);
    
        // Open the appropriate accordion trigger/panel pair
        panel.removeAttribute('hidden');
        trigger.setAttribute('aria-expanded', 'true');
      },

      close(panelId) {
        const panel = this.element.querySelector(
          `[${this.panelAttribute}="${panelId}"]`
        );

        if (!panel) {
          console.warn(`No such panel '${panelId}' in Accordion.close()`);
          return;
        }
    
        const activationEvent = Component.dispatchCustomEvent(
          'accordionClosed',
          panel,
          {
            id: panel.dataset.rvtAccordionPanel
          }
        );
    
        if (!activationEvent) return;
    
        const trigger = this.element.querySelector(
          `[${this.triggerAttribute} = "${panel.dataset.rvtAccordionPanel}"]`
        );
    
        // Close the appropriate accordion trigger/panel pair
        panel.setAttribute('hidden', '');
        trigger.setAttribute('aria-expanded', 'false');
      }
    }
  }
}
