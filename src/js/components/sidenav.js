/**
 * Copyright (C) 2019 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Component from './component';
import { nodeListToArray } from '../utilities/domHelpers';

export default class Sidenav extends Component {
  static get selector() {
    return '[data-rvt-sidenav]';
  }

  static get methods() {
    return {
      init() {
        console.log('Sidenav::init');

        this.toggleAttribute = 'data-rvt-sidenav-toggle';
        this.toggleSelector = `[${this.toggleAttribute}]`;
        this.listAttribute = 'data-rvt-sidenav-list';
        this.listSelector = `[${this.listAttribute}]`;
        this.openAllOnInit = this.element.hasAttribute('data-rvt-sidenav-open-all');

        const menuToggles = nodeListToArray(
          this.element.querySelectorAll(this.toggleSelector)
        );
        const childMenus = nodeListToArray(
          this.element.querySelectorAll(this.listSelector)
        );
    
        menuToggles.forEach((element, index) => {
          /**
           * Toggle button/menu list pairings
           * element: toggle button
           * childMenus[index]: menu list
           */
    
          // Since JavaScript is available add popup semantics to toggles
          element.setAttribute('aria-haspopup', 'true');
    
          // Aria-expand all toggles if everything is open on init
          if (this.openAllOnInit) {
            element.setAttribute('aria-expanded', 'true');
            childMenus[index].removeAttribute('hidden');
    
            return;
          }
    
          // Check if this toggle been manually set to expanded in markup
          if (element.getAttribute('aria-expanded') === 'true') {
            // Open list matching this toggle
            childMenus[index].removeAttribute('hidden');
          } else {
            element.setAttribute('aria-expanded', 'false');
            childMenus[index].setAttribute('hidden', '');
          }
        });

        // bind methods
        Component.bindMethodToDOMElement(this, 'open', this.open);
        Component.bindMethodToDOMElement(this, 'close', this.close);

        this._handleClick = this._handleClick.bind(this);
      },

      connected() {
        Component.dispatchComponentAddedEvent(this.element);
      },

      disconnected() {
        Component.dispatchComponentRemovedEvent(this.element);
      },

      onClick(event) {
        this._handleClick(event);
      },

      _handleClick(event) {
        const toggleButton = event.target.closest(this.toggleSelector);
        // Exit if toggle button doesn't exist
        if (!toggleButton) return;
    
        const toggleId = toggleButton.dataset.rvtSidenavToggle;
        const targetList = this.element.querySelector(
          `[${this.listAttribute}="${toggleId}"]`
        );
    
        // Exit if the target list isn't linked with a button
        if (!targetList || targetList.getAttribute(this.listAttribute) === '') {
          return;
        }
    
        targetList.hasAttribute('hidden')
          ? this.open(toggleId)
          : this.close(toggleId);
      },

      open(toggleId) {
        const toggle = this.element.querySelector(
          `[${this.toggleAttribute}="${toggleId}"]`
        );
        const targetList = this.element.querySelector(
          `[${this.listAttribute}="${toggleId}"]`
        );

        if (!toggle || !targetList) {
          console.warn(`No such toggle '${toggleId}' in Sidenav.open()`);
          return;
        }

        const openEvent = Component.dispatchCustomEvent('sidenavListOpen', toggle, {
          id: toggleId
        });
    
        if (!openEvent) return;
    
        toggle.setAttribute('aria-expanded', 'true');
        targetList.removeAttribute('hidden');
      },
    
      close(toggleId) {
        const toggle = this.element.querySelector(
          `[${this.toggleAttribute}="${toggleId}"]`
        );
        const targetList = this.element.querySelector(
          `[${this.listAttribute}="${toggleId}"]`
        );
        if (!toggle || !targetList) {
          console.warn(`No such toggle '${toggleId}' in Sidenav.close()`);
          return;
        }
        // FIXME: Changed to sidenavListClosed to match tense of other events
        const closeEvent = Component.dispatchCustomEvent('sidenavListClose', toggle, {
          id: toggleId
        });
    
        if (!closeEvent) return;
    
        toggle.setAttribute('aria-expanded', 'false');
        targetList.setAttribute('hidden', '');
      }
    }
  }
}
