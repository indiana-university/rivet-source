import globalSettings from '../globalSettings';
import { define } from 'wicked-elements';

export default class Component {
  static initAll() {
    this.init(this.selector);
  }

  static init(selector) {
    define(selector, this.methods);

    return document.querySelector(selector);
  }

  static get selector() {
    /* Virtual, must be implemented by subclass. */
  }

  static get methods() {
    /* Virtual, must be implemented by subclass. */
  }

  static bindMethodToDOMElement(self, name, method) {
    Object.defineProperty(self.element, name, {
      value: method.bind(self),
      writable: false
    });
  }

  static dispatchCustomEvent(eventName, element, detail) {
    const prefix = globalSettings.prefix;
    const event = new CustomEvent(`${prefix}:${eventName}`, {
      bubbles: true,
      cancelable: true,
      detail
    });

    return element.dispatchEvent(event);
  }

  static dispatchComponentAddedEvent(element) {
    return this.dispatchCustomEvent('componentAdded', document, {
      component: element
    });
  }

  static dispatchComponentRemovedEvent(element) {
    return this.dispatchCustomEvent('componentRemoved', document, {
      component: element
    });
  }
}
