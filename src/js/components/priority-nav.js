/******************************************************************************
 * Copyright (C) 2025 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from './component'

/******************************************************************************
 * The priority navigation component dynamically adjusts navigation items to
 * fit available space by moving overflow items into a "More" menu when the
 * viewport width is reduced.
 *
 * @see https://rivet.iu.edu/components/priority-nav/
 *****************************************************************************/

export default class PriorityNav extends Component {

  /****************************************************************************
   * Gets the priority nav's CSS selector.
   *
   * @static
   * @returns {string} The CSS selector
   ***************************************************************************/

  static get selector () {
    return '[data-rvt-priority-nav]'
  }

  /****************************************************************************
   * Gets an object containing the methods that should be attached to the
   * component's root DOM element. Used by wicked-elements to initialize a DOM
   * element with Web Component-like behavior.
   *
   * @static
   * @returns {Object} Object with component methods
   ***************************************************************************/

  static get methods () {
    return {

      /************************************************************************
       * Initializes the priority nav.
       ***********************************************************************/

      init () {
        this._initSelectors()
        this._initElements()
      },

      /************************************************************************
       * Initializes priority nav child element selectors.
       *
       * @private
       ***********************************************************************/

      _initSelectors () {
        this.linkListAttribute = 'data-rvt-priority-nav-links'
        this.moreMenuAttribute = 'data-rvt-priority-nav-more'
        this.moreLinksAttribute = 'data-rvt-priority-nav-more-links'
        
        this.linkListSelector = `[${this.linkListAttribute}]`
        this.moreMenuSelector = `[${this.moreMenuAttribute}]`
        this.moreLinksSelector = `[${this.moreLinksAttribute}]`
        
      },

      /************************************************************************
       * Initializes priority nav child elements.
       *
       * @private
       ***********************************************************************/

      _initElements () {
        this.linkList = this.element.querySelector(this.linkListSelector)
        this.navItems = Array.from(
          this.linkList.querySelectorAll(':scope > li')
        )
        this.moreMenu = this.element.querySelector(this.moreMenuSelector)
        this.moreLinks = this.element.querySelector(this.moreLinksSelector)
      },

      /************************************************************************
       * Called when the priority nav is added to the DOM.
       ***********************************************************************/

      connected () {
        Component.dispatchComponentAddedEvent(this.element)
        Component.watchForResize(this, () => this._rearrange())
      },

      /************************************************************************
       * Called when the priority nav is removed from the DOM.
       ***********************************************************************/

      disconnected () {
        Component.dispatchComponentRemovedEvent(this.element)
        Component.stopWatchingForResize(this)
      },

      /************************************************************************
       * Rearrange the priority nav, with links that don't fit in the
       * container shifted into the More... dropdown menu.
       * 
       * @private
       ***********************************************************************/

      _rearrange () {
        console.log('Rearranging priority navigation')

        // Reset the "More" menu
        this.moreLinks.innerHTML = '';

        const availableWidth = this.linkList.offsetWidth;
        console.log(availableWidth)
        let usedWidth = 0;

        this.navItems.forEach(item => {
          console.log(item.textContent)
          item.style.display = ''; // Reset to default (inline or block)

          const itemWidth = item.offsetWidth + 16; // +16px gap between items
          console.log(usedWidth + itemWidth)
          if (usedWidth + itemWidth > availableWidth) {
            // Move item to "More" menu
            const listItem = document.createElement('li');
            listItem.appendChild(item.cloneNode(true));
            this.moreLinks.appendChild(listItem);

            // Hide the original item
            item.style.display = 'none';
            usedWidth += itemWidth;
          } else {
            usedWidth += itemWidth;
          }
        });

        // Show the "More" menu if it contains items
        if (this.moreLinks.children.length > 0) {
          this.moreMenu.style.display = '';
        } else {
          this.moreMenu.style.display = 'none';
        }
      }
    }
  }
}