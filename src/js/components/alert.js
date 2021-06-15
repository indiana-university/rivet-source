/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */
import Component from './component';

export default class Alert extends Component {
  static get selector() {
    return '[data-rvt-alert]';
  }

  static get methods() {
    return {
      init() {
        console.log('Alert::init()');

        this.closeAttribute = 'data-rvt-alert-close';
        this.closeSelector = `[${this.closeAttribute}]`;
        this.closeButton = null;

        Component.bindMethodToDOMElement(this, 'dismiss', this.dismiss);
        
        this._handleClick = this._handleClick.bind(this);
      },

      connected() {
        Component.dispatchComponentAddedEvent(this.element);

        this.closeButton = this.element.querySelector(this.closeSelector);
        this.closeButton.addEventListener('click', this._handleClick, false);
      },

      disconnected() {
        Component.dispatchComponentRemovedEvent(this.element);
        
        this.closeButton.removeEventListener('click', this._handleClick, false);
      },

      _handleClick() {
        this.dismiss();
      },
    
      dismiss() {
        const dismissEvent = Component.dispatchCustomEvent(
          'alertDismissed',
          this.element
        );
    
        if (!dismissEvent) return;
    
        this.element.remove();
      }
    }
  }
}