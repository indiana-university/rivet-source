import Component from './component';
import keyCodes from '../utilities/keyCodes';

export default class Disclosure extends Component {
  static get selector() {
    return '[data-rvt-disclosure]';
  }

  static get methods() {
    return {
      init() {
        console.log('Disclosure::init');

        this.toggleElement = this.element.querySelector('[data-rvt-disclosure-toggle]');
        this.targetElement = this.element.querySelector('[data-rvt-disclosure-target]');
        this.isOpen = false;
        this.activeToggle = null;
        this.activeDisclosure = null;
        
        const icon = this.element.querySelector('svg');
        if (icon) {
          icon.setAttribute('focusable', 'false');
        }
        
        Component.bindMethodToDOMElement(this.element, 'open', this.open);
        Component.bindMethodToDOMElement(this.element, 'close', this.close);

        this._handleClick = this._handleClick.bind(this);
        this._handleKeydown = this._handleKeydown.bind(this);
      },

      connected() {
        Component.dispatchComponentAddedEvent(this.element);
        
        document.addEventListener('click', this._handleClick, false);
        document.addEventListener('keydown', this._handleKeydown, false);
      },

      disconnected() {
        Component.dispatchComponentRemovedEvent(this.element);

        document.removeEventListener('click', this._handleClick, false);
        document.removeEventListener('keydown', this._handleKeydown, false);
      },

      open() {
        // Return if disabled disclosure is being opened programmatically

        if (this.toggleElement.hasAttribute('disabled')) {
          return;
        }

        // Fire a disclosureOpen event

        const openEvent = Component.dispatchCustomEvent(
          'disclosureOpen',
          this.toggleElement,
          {
            id: this.toggleElement.dataset['toggle']
          }
        );

        // Bail if the event was suppressed

        if (!openEvent) return;

        // Set the disclosure's open state to "true"

        this.isOpen = true;
        this.toggleElement.setAttribute('aria-expanded', 'true');

        // Remove the 'hidden' attribute to show the element to disclose

        this.targetElement.removeAttribute('hidden');

        // Set currently active toggle and disclosed element

        this.activeToggle = this.toggleElement;
        this.activeDisclosure = this.targetElement;
      },

      close() {
        /**
         * If there isn't a currently active disclosure, then bail so close() isn't
         * fired multiple times.
         */
        if (!this.activeToggle) return;

        const closeEvent = Component.dispatchCustomEvent(
          'disclosureClose',
          this.toggleElement,
          {
            id: this.toggleElement.dataset['toggle']
          }
        );

        if (!closeEvent) return;

        this.isOpen = false;
        this.activeToggle.setAttribute('aria-expanded', 'false');
        this.activeDisclosure.setAttribute('hidden', '');

        // Resets the state variables
        this.activeToggle = null;
        this.activeDisclosure = null;
      },

      _handleClick(event) {
        const toggle = event.target.closest('[data-rvt-disclosure-toggle]');

        // Did it come from inside open disclosure?
        if (this.targetElement.contains(event.target)) return;

        // If it came from outside component, close all open disclosures
        if (!toggle && this.activeToggle !== null) {
          this.close();
          return;
        }

        // Check which toggle the click came from, and whether it's already opened
        if (toggle !== this.toggleElement || this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      },

      _shouldHandleKeydown(event) {
        // If the keydown didn't come from within disclosure component, then bail.
        if (!this.element.contains(event.target)) return false;
    
        // Delegate event to only this instance of the disclosure
        const disclosure = event.target.closest('[data-rvt-disclosure]');
        if (disclosure !== this.element) return false;
    
        return true;
      },
    
      _handleKeydown(event) {
        if (!this._shouldHandleKeydown(event)) return;
    
        switch (event.keyCode) {
          case keyCodes.escape: {
            if (!this.activeToggle) return;
    
            // If there's an open disclosure, close it.
            this.close();
    
            this.toggleElement.focus();
    
            /**
             * Resets the state variables so as not to interfere with other
             * Escape key handlers/interactions
             */
            this.activeToggle = null;
    
            break;
          }
        }
      }
    };
  }
}
