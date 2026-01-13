/******************************************************************************
 * Copyright (C) 2025 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from "../component/component.js";

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

	static get selector() {
		return "[data-rvt-priority-nav]";
	}

	/****************************************************************************
	 * Gets an object containing the methods that should be attached to the
	 * component's root DOM element. Used by wicked-elements to initialize a DOM
	 * element with Web Component-like behavior.
	 *
	 * @static
	 * @returns {Object} Object with component methods
	 ***************************************************************************/

	static get methods() {
		return {
			/************************************************************************
			 * Initializes the priority nav.
			 ***********************************************************************/

			init() {
				this._appendMoreMenuMarkup();
				this._initSelectors();
				this._initElements();
				this._initProperties();
			},

			/************************************************************************
			 * Initializes priority nav child element selectors.
			 *
			 * @private
			 ***********************************************************************/

			_initSelectors() {
				this.linkListAttribute = "data-rvt-priority-nav-links";
				this.moreMenuAttribute = "data-rvt-priority-nav-more";
				this.moreLinksAttribute = "data-rvt-priority-nav-more-links";

				this.linkListSelector = `[${this.linkListAttribute}]`;
				this.moreMenuSelector = `[${this.moreMenuAttribute}]`;
				this.moreLinksSelector = `[${this.moreLinksAttribute}]`;
			},

			/************************************************************************
			 * Appends markup for the "More" menu to the priority nav.
			 *
			 * @private
			 ***********************************************************************/

			_appendMoreMenuMarkup() {
				const moreMenu = document.createElement("div");
				moreMenu.classList.add("rvt-header-menu__more", "rvt-dropdown");
				moreMenu.setAttribute("data-rvt-dropdown", "priority-nav-dropdown");
				moreMenu.setAttribute("data-rvt-priority-nav-more", true);

				const moreMenuToggle = document.createElement("button");
				moreMenuToggle.setAttribute("data-rvt-dropdown-toggle", true);
				moreMenuToggle.innerHTML =
					'<span>More</span><rvt-icon name="ellipsis"></rvt-icon>';

				const moreMenuDropdown = document.createElement("div");
				moreMenuDropdown.classList.add(
					"rvt-dropdown__menu",
					"rvt-dropdown__menu--right",
				);
				moreMenuDropdown.setAttribute("data-rvt-dropdown-menu", true);
				moreMenuDropdown.setAttribute("hidden", true);

				const moreMenuDropdownList = document.createElement("ul");
				moreMenuDropdownList.setAttribute(
					"data-rvt-priority-nav-more-links",
					true,
				);

				moreMenu.appendChild(moreMenuToggle);
				moreMenu.appendChild(moreMenuDropdown);
				moreMenuDropdown.appendChild(moreMenuDropdownList);

				this.element.appendChild(moreMenu);
			},

			/************************************************************************
			 * Initializes priority nav child elements.
			 *
			 * @private
			 ***********************************************************************/

			_initElements() {
				this.linkList = this.element.querySelector(this.linkListSelector);
				this.navItems = Array.from(
					this.linkList.querySelectorAll(":scope > li"),
				);
				this.moreMenu = this.element.querySelector(this.moreMenuSelector);
				this.moreLinks = this.element.querySelector(this.moreLinksSelector);
			},

			/************************************************************************
			 * Initializes priority nav state properties.
			 *
			 * @private
			 ***********************************************************************/

			_initProperties() {
				this._resetAvailableWidth();
				this._calculateBreakpoints();
			},

			/************************************************************************
			 * Calculate the widths at which each nav item should be shown or moved
			 * into the "More" menu.
			 *
			 * @private
			 ***********************************************************************/

			_calculateBreakpoints() {
				const gapBetweenNavItems = 14; // pixels
				let usedWidth = 0;

				this.breakpoints = this.navItems.map((item) => {
					const requiredWidth =
						usedWidth + item.offsetWidth + gapBetweenNavItems;

					usedWidth += item.offsetWidth + gapBetweenNavItems;

					return { item, requiredWidth };
				});
			},

			/************************************************************************
			 * Called when the priority nav is added to the DOM.
			 ***********************************************************************/

			connected() {
				Component.dispatchComponentAddedEvent(this.element);
				Component.watchForResize(this, () => this._rearrange());
			},

			/************************************************************************
			 * Called when the priority nav is removed from the DOM.
			 ***********************************************************************/

			disconnected() {
				Component.dispatchComponentRemovedEvent(this.element);
				Component.stopWatchingForResize(this);
			},

			/************************************************************************
			 * Rearrange the priority nav, with links that don't fit in the
			 * container shifted into the "More" dropdown menu.
			 *
			 * @private
			 ***********************************************************************/

			_rearrange() {
				this._resetMoreMenu();
				this._resetAvailableWidth();
				this._hideOverflowItems();
				this._toggleMoreMenuVisibility();
			},

			/************************************************************************
			 * Resets the content of the "More" dropdown menu.
			 *
			 * @private
			 ***********************************************************************/

			_resetMoreMenu() {
				this.moreLinks.innerHTML = "";
			},

			/************************************************************************
			 * Resets the available width property.
			 *
			 * @private
			 ***********************************************************************/

			_resetAvailableWidth() {
				this.availableWidth = this.linkList.offsetWidth;
			},

			/************************************************************************
			 * Steps through each navigation item and hides those that do not fit
			 * into the "More" menu.
			 *
			 * @private
			 ***********************************************************************/

			_hideOverflowItems() {
				this.navItems.forEach((item) => {
					this._resetNavItemVisibility(item);

					if (this._shouldMoveToMoreMenu(item))
						this._moveNavItemToMoreMenu(item);
				});
			},

			/************************************************************************
			 * Resets the visibility of the given nav item.
			 *
			 * @private
			 * @param {Element} item - Nav item
			 ***********************************************************************/

			_resetNavItemVisibility(item) {
				item.style.display = "";
			},

			/************************************************************************
			 * Returns true if the given nav item should be moved into the "More"
			 * menu because there is no room left for it in the priority nav element.
			 *
			 * @private
			 * @param {Element} item - Nav item
			 * @returns {boolean} Should move nav item to "More" menu
			 ***********************************************************************/

			_shouldMoveToMoreMenu(item) {
				const itemBreakpoint = this.breakpoints.find((i) => i.item === item);

				return itemBreakpoint.requiredWidth >= this.availableWidth;
			},

			/************************************************************************
			 * Moves the given nav item into the "More" menu by cloning it into the
			 * "More" menu dropdown and hiding the original nav item.
			 *
			 * @private
			 * @param {Element} item - Nav item
			 ***********************************************************************/

			_moveNavItemToMoreMenu(item) {
				const listItem = document.createElement("li");
				listItem.appendChild(item.cloneNode(true));
				this.moreLinks.appendChild(listItem);
				item.style.display = "none"; // Hide original nav item
			},

			/************************************************************************
			 * Toggles the visibility of the "More" menu.
			 *
			 * @private
			 ***********************************************************************/

			_toggleMoreMenuVisibility() {
				this._moreMenuHasLinks() ? this._showMoreMenu() : this._hideMoreMenu();
			},

			/************************************************************************
			 * Returns true if the "More" menu has links in it.
			 *
			 * @private
			 * @returns {boolean} "More" menu has links
			 ***********************************************************************/

			_moreMenuHasLinks() {
				return this.moreLinks.children.length > 0;
			},

			/************************************************************************
			 * Shows the "More" menu.
			 *
			 * @private
			 ***********************************************************************/

			_showMoreMenu() {
				this.moreMenu.style.display = "";
				this.moreMenu.removeAttribute("hidden");
			},

			/************************************************************************
			 * Hides the "More" menu.
			 *
			 * @private
			 ***********************************************************************/

			_hideMoreMenu() {
				this.moreMenu.style.display = "none";
				this.moreMenu.setAttribute("hidden", true);
			},
		};
	}
}
