import Component from './component';

export default class Disclosure extends Component {

  static get selector() {
    return '[data-disclosure]';
  }

  static get methods() {
    return {

      init() {
        console.log('Disclosure::init');
      },

      connected() {
        console.log('Disclosure::connected');
      },

      disconnected() {
        console.log('Disclosure::disconnected');
      }

    }
  }

}