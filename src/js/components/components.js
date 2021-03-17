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

}