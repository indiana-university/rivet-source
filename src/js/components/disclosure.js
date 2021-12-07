import Component from './component';
import keyCodes from '../utilities/keyCodes';

export default class Disclosure extends Component {
  static get selector() {
    return '[data-rvt-disclosure]';
  }

  static get methods() {
    return {
      init() {
        this._initElements();
        this._initProperties();
        this._removeIconFromTabOrder();
        
        Component.bindMethodToDOMElement(this, 'open', this.open);
        Component.bindMethodToDOMElement(this, 'close', this.close);
      },

      _initElements() {
        this.toggleElement = this.element.querySelector('[data-rvt-disclosure-toggle]');
        this.targetElement = this.element.querySelector('[data-rvt-disclosure-target]');
      },

      _initProperties() {
        this.isOpen = false;
        this.activeToggle = null;
        this.activeDisclosure = null;
      },

      _removeIconFromTabOrder() {
        const icon = this.element.querySelector('svg');
        
        if (icon)
          icon.setAttribute('focusable', 'false');
      },

      connected() {
        Component.dispatchComponentAddedEvent(this.element);
      },

      disconnected() {
        Component.dispatchComponentRemovedEvent(this.element);
      },

      open() {
        if (this._isDisabled())
          return

        if ( ! this._eventDispatched('disclosureOpened'))
          return

        this._setOpenState()
      },

      _isDisabled() {
        return this.toggleElement.hasAttribute('disabled')
      },

      _setOpenState() {
        this.toggleElement.setAttribute('aria-expanded', 'true');
        this.targetElement.removeAttribute('hidden');

        this.isOpen = true;
        this.activeToggle = this.toggleElement;
        this.activeDisclosure = this.targetElement;
      },

      close() {
        if ( ! this._isOpen())
          return

        if ( ! this._eventDispatched('disclosureClosed'))
          return

        this._setClosedState();
      },

      _isOpen() {
        return this.activeToggle && this.activeDisclosure
      },

      _setClosedState() {
        this.activeToggle.setAttribute('aria-expanded', 'false');
        this.activeDisclosure.setAttribute('hidden', '');

        this.isOpen = false;
        this.activeToggle = null;
        this.activeDisclosure = null;
      },

      _eventDispatched(name) {
        const dispatched = Component.dispatchCustomEvent(name, this.element)

        return dispatched
      },

      onClick(event) {
        if (this._clickOriginatedInsideDisclosureTarget(event))
          return

        this._isOpen()
          ? this.close()
          : this.open()
      },

      _clickOriginatedInsideDisclosureTarget(event) {
        return this.targetElement.contains(event.target)
      },
    
      onKeydown(event) {
        if ( ! this._keydownOriginatedInsideDisclosure(event))
          return false
        
        if (event.keyCode === keyCodes.escape) {
          this.close()
          this.toggleElement.focus()
        }
      },

      _keydownOriginatedInsideDisclosure(event) {
        return this.element.contains(event.target)
      }
    };
  }
}
