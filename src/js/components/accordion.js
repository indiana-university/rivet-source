/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */
import dispatchCustomEvent from '../utilities/dispatchCustomEvent';
import { isNode, nodeListToArray } from '../utilities/domHelpers';
import keyCodes from '../utilities/keyCodes';

export default class Accordion {
  constructor(element, options) {
    const defaultOptions = {
      openAllOnInit: false
    };

    const settings = {
      ...defaultOptions,
      ...options
    };

    // Instance properties
    this.openAllOnInit = settings.openAllOnInit;
    this.element = element;

    // Check to make sure that a DOM element was passed in for initialization
    if (!isNode(this.element)) {
      throw new TypeError(
        'A DOM element should be passed as the first argument to initialize the accordion.'
      );
    }

    this.triggerAttribute = 'data-accordion-trigger';
    this.triggerSelector = `[${this.triggerAttribute}]`;
    this.triggers = nodeListToArray(
      this.element.querySelectorAll(this.triggerSelector)
    );
    if (this.triggers.length < 2) {
      // eslint-disable-next-line no-console
      throw new TypeError(
        'An accordion should contain *at least two* accordion triggers with the "data-accordion-trigger" attribute'
      );
    }
    this.panelAttribute = 'data-accordion-panel';
    this.panelSelector = `[${this.panelAttribute}]`;
    this.panels = nodeListToArray(
      this.element.querySelectorAll(this.panelSelector)
    );
    const initializedPanels = this.element.querySelectorAll(
      `[data-accordion-panel-init]`
    );

    // Set this.openOnInit if needed
    try {

      if (initializedPanels.length > 1) {
        throw new TypeError('Caught');
      }

      let initialPanel;

      // Determine if a specific panel has been initialized with the data-tab-init attribute, otherwise, use the first tab
      this.panels.forEach((panel, index) => {
        if (panel.hasAttribute('data-accordion-panel-init')) {
          initialPanel = panel;
        } else {
          this.panels[index].setAttribute('hidden', '');
        }
      });

      // If a specific panel was initialized set this.openOnInit equal to it, otherwise fallback to the first panel
      this.openOnInit = initialPanel;
    } catch (e) {
      console.warn(
        'Only one accordion panel should have the data-accordion-panel-init attribute. If you wish to open all panels on initialization, please apply the appropriate attribute to the data-accordion element'
      );
    }

    // bind methods
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);

    this.init();
  }

  /**
   * This function is used to handle all click events on
   * the document. It accepts the Event object, checks target to see if it came
   * from an accordion trigger. From there, it gets the related panel and opens
   * it.
   * @param {Event} event
   */
  _handleClick(event) {
    const currentTrigger = event.target.closest(this.triggerSelector);
    // If not an accordion trigger, ignore
    if (!currentTrigger) return;

    // Get the data-accordion-trigger value
    const currentTriggerValue = currentTrigger.getAttribute(
      this.triggerAttribute
    );

    // Get the associated panel
    const currentPanel = this.element.querySelector(
      `[${this.panelAttribute}="${currentTriggerValue}"]`
    );

    // Open or close accordion
    currentTrigger.getAttribute('aria-expanded') === 'true'
      ? this.close(currentPanel)
      : this.open(currentPanel);
  }

  /**
   * This function is used to handle all keydown events on the document. It
   * sets up handling for up and down arrows.
   * @param {Event} event
   */
  _handleKeydown(event) {
    if (
      event.keyCode === keyCodes.up ||
      event.keyCode === keyCodes.down ||
      event.keyCode === keyCodes.end ||
      event.keyCode === keyCodes.home
    ) {
      const accordionParent = event.target.closest('[data-accordion]');
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
  }

  /**
   * This function is used to initialize accordions on load. It also adds the
   * appropriate aria-expanded, and hidden attributes to remove some burden
   * from the develop.
   */
  _openOnInit() {
    // If accordion is set to open all panels on init, open them
    if (this.openAllOnInit === true) {
      this.panels.forEach(panel => {
        this.open(panel);
      });
    } else {
      // Keep all other accordions closed by setting their initial states
      this.panels.forEach((panel, index) => {
        if (panel !== this.openOnInit) {
          // Set non-initialized accordion panels to hidden
          this.panels[index].setAttribute('hidden', '');
          const trigger = this.element.querySelector(
            `[${this.triggerAttribute}="${panel.dataset.accordionPanel}"]`
          );
          // Set 'aria-expanded' for all non-initialized accordion triggers to 'false'
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          // If this.openOnInit has been set, open it on initialization
          this.open(this.openOnInit);
        }
      });
    }
  }

  /**
   * This function is used to trigger the 'accordionOpened' custom event, and
   * open an accordion/panel pair. It removes the panel's hidden attribute,
   * and sets the trigger's aria-expanded attribute to true. It also allows
   * developers to setup a custom callback function.
   * @param {Function} callback
   */
  open(accordion, callback) {
    // Trigger accordionOpened custom event. This event is used open accordion panels.

    const activationEvent = dispatchCustomEvent('accordionOpened', accordion, {
      id: accordion.dataset.accordionPanel
    });

    if (!activationEvent) return;

    const trigger = this.element.querySelector(
      `[${this.triggerAttribute} = "${accordion.dataset.accordionPanel}"]`
    );

    // Open the appropriate accordion trigger/panel pair
    accordion.removeAttribute('hidden');
    trigger.setAttribute('aria-expanded', 'true');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  /**
   * This function is used to trigger the 'accordionClosed' custom event, and
   * close an accordion/panel pair. It adds the hidden attribute to the panel,
   * and sets the trigger's aria-expanded attribute to false. It also allows
   * developers to setup a custom callback function.
   * @param {Function} callback
   */
  close(accordion, callback) {
    // Trigger accordionClosed custom event. This event is used to control the process of closing accordion panels.

    const activationEvent = dispatchCustomEvent('accordionClosed', accordion, {
      id: accordion.dataset.accordionPanel
    });

    if (!activationEvent) return;

    const trigger = this.element.querySelector(
      `[${this.triggerAttribute} = "${accordion.dataset.accordionPanel}"]`
    );

    // Close the appropriate accordion trigger/panel pair
    accordion.setAttribute('hidden', '');
    trigger.setAttribute('aria-expanded', 'false');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  init() {
    this._openOnInit();

    // Add click handlers
    this.element.addEventListener('click', this._handleClick, false);
    this.element.addEventListener('keydown', this._handleKeydown, false);
  }

  destroy() {
    this.element.removeEventListener('click', this._handleClick, false);
    this.element.removeEventListener('keydown', this._handleKeydown, false);
  }
}
