import { define } from 'wicked-elements';
import { globalSettings } from '../globalSettings';

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

  static bindMethodToDOMElement(element, name, method) {
    Object.defineProperty(element, name, {
      value: method.bind(element),
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

}