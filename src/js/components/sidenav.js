/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import Component from "./component";
import remToPixel from "../utilities/remToPixel";

/******************************************************************************
 * The sidenav component can be used to add a vertical list of navigation
 * links to a sidebar. Sidenavs can contain dropdowns that reveal nested links.
 *
 * @see https://rivet.iu.edu/components/sidenav/
 *****************************************************************************/

export default class Sidenav extends Component {
	/****************************************************************************
	 * Gets the sidenav's CSS selector.
	 *
	 * @static
	 * @returns {string} The CSS selector
	 ***************************************************************************/

	static get selector() {
		return "[data-rvt-sidenav]";
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
			 * Initializes the sidenav.
			 ***********************************************************************/

			init() {
				this._initSelectors();
				this._initElements();
				this._initAttributes();
				this._initProperties();
				this._setInitialChildMenuStates();
				this._createCollapsibleContainer();

				Component.bindMethodToDOMElement(this, "open", this.open);
				Component.bindMethodToDOMElement(this, "close", this.close);
			},

			/************************************************************************
			 * Initializes sidenav child element selectors.
			 *
			 * @private
			 ***********************************************************************/

			_initSelectors() {
				this.toggleAttribute = "data-rvt-sidenav-toggle";
				this.childMenuAttribute = "data-rvt-sidenav-list";

				this.toggleSelector = `[${this.toggleAttribute}]`;
				this.childMenuSelector = `[${this.childMenuAttribute}]`;
			},

			/************************************************************************
			 * Initializes sidenav child elements.
			 *
			 * @private
			 ***********************************************************************/

			_initElements() {
				this.childMenuToggleButtons = Array.from(
					this.element.querySelectorAll(this.toggleSelector),
				);

				this.childMenus = Array.from(
					this.element.querySelectorAll(this.childMenuSelector),
				);
			},

			/************************************************************************
			 * Initializes sidenav attributes.
			 *
			 * @private
			 ***********************************************************************/

			_initAttributes() {
				this._assignComponentElementIds();
			},

			/************************************************************************
			 * Assigns random IDs to each toggle button and child menu if one was
			 * not already provided in the markup.
			 *
			 * @private
			 ***********************************************************************/

			_assignComponentElementIds() {
				this._assignToggleIds();
				this._assignChildMenuIds();
			},

			/************************************************************************
			 * Assigns a random ID to each toggle.
			 *
			 * @private
			 ***********************************************************************/

			_assignToggleIds() {
				this.childMenuToggleButtons.forEach((toggle) => {
					Component.setAttributeIfNotSpecified(
						toggle,
						this.toggleAttribute,
						Component.generateUniqueId(),
					);
				});
			},

			/************************************************************************
			 * Assigns a random ID to each child menu.
			 *
			 * @private
			 ***********************************************************************/

			_assignChildMenuIds() {
				const numMenus = this.childMenus.length;

				for (let i = 0; i < numMenus; i++) {
					const toggle = this.childMenuToggleButtons[i];
					const menu = this.childMenus[i];
					const menuId = toggle.getAttribute(this.toggleAttribute);

					Component.setAttributeIfNotSpecified(
						menu,
						this.childMenuAttribute,
						menuId,
					);
				}
			},

			/************************************************************************
			 * Initializes sidenav state properties.
			 *
			 * @private
			 ***********************************************************************/

			_initProperties() {
				const collapseAttribute = "data-rvt-sidenav-collapse-on-mobile";
				const breakpointProperty = "--rvt-breakpoint-lg";
				const documentStyles = getComputedStyle(document.documentElement);

				this.collapsible = this.element.hasAttribute(collapseAttribute);

				if (this.collapsible) {
					this.collapsed = false;
					this.documentBody = document.querySelector("body");
					this.defaultCollapseBreakpoint =
						documentStyles.getPropertyValue(breakpointProperty);
					this.collapseBreakpoint =
						this.element.getAttribute(collapseAttribute);
					this.collapseBreakpoint = this.collapseBreakpoint
						? this.collapseBreakpoint // use value specified in attribute
						: this.defaultCollapseBreakpoint; // use default breakpoint value
					this.collapseBreakpoint = remToPixel(this.collapseBreakpoint);
				}
			},

			/************************************************************************
			 * Sets the initial state of the sidenav's child menus.
			 *
			 * @private
			 ***********************************************************************/

			_setInitialChildMenuStates() {
				this._shouldOpenAllChildMenus()
					? this._openAllChildMenus()
					: this._setChildMenuDefaultStates();
			},

			/************************************************************************
			 * Returns true if all child menus should be opened when the component
			 * is added to the DOM.
			 *
			 * @private
			 * @returns {boolean} Child menus should be opened
			 ***********************************************************************/

			_shouldOpenAllChildMenus() {
				return this.element.hasAttribute("data-rvt-sidenav-open-all");
			},

			/************************************************************************
			 * Opens all child menus.
			 *
			 * @private
			 ***********************************************************************/

			_openAllChildMenus() {
				this.childMenuToggleButtons.forEach((toggleButton, index) => {
					toggleButton.setAttribute("aria-expanded", "true");
					this.childMenus[index].removeAttribute("hidden");
				});
			},

			/************************************************************************
			 * Sets the default open/closed state for each child menu based on
			 * the ARIA attributes set by the developer.
			 *
			 * @private
			 ***********************************************************************/

			_setChildMenuDefaultStates() {
				this.childMenuToggleButtons.forEach((element, index) => {
					if (element.getAttribute("aria-expanded") === "true") {
						this.childMenus[index].removeAttribute("hidden");
					} else {
						element.setAttribute("aria-expanded", "false");
						this.childMenus[index].setAttribute("hidden", "");
					}
				});
			},

			/************************************************************************
			 * Creates a container element into which the sidenav should be
			 * "collapsed" on smaller screens.
			 *
			 * @private
			 ***********************************************************************/

			_createCollapsibleContainer() {
				if (!this.collapsible) return;

				this._prependCollapsibleContainerElement();
				this._addCollapsibleContainerEventListeners();
			},

			/************************************************************************
			 * Inserts the collapsible container element at the top of the sidenav.
			 *
			 * @private
			 ***********************************************************************/

			_prependCollapsibleContainerElement() {
				const template = document.createElement("template");
				const sidenavLabel =
					this.element.querySelector("#sidenav-label").textContent;

				template.innerHTML = `
          <button class="rvt-sidenav__mobile-toggle" data-rvt-sidebar-toggle="" aria-expanded="false" hidden>
            <span>${sidenavLabel}</span>
            <svg aria-hidden="true" fill="currentColor" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M15 4H1V2h14v2Zm0 5H1V7h14v2ZM1 14h14v-2H1v2Z"></path></svg>
          </button>
        `;

				this.collapsibleContainer =
					template.content.cloneNode(true).firstElementChild;
				this.element.insertAdjacentElement(
					"beforebegin",
					this.collapsibleContainer,
				);
			},

			/************************************************************************
			 * Adds event listeners to the document for expanding/collapsing the
			 * sidenav on mobile.
			 *
			 * @private
			 ***********************************************************************/

			_addCollapsibleContainerEventListeners() {
				const self = this;

				document.addEventListener("click", (event) => {
					const clickedSidebarMobileToggle = event.target.closest(
						"[data-rvt-sidebar-toggle]",
					);

					if (!clickedSidebarMobileToggle) return;

					if (
						clickedSidebarMobileToggle.getAttribute("aria-expanded") === "false"
					) {
						clickedSidebarMobileToggle.setAttribute("aria-expanded", "true");
						self.element.removeAttribute("hidden");
					} else {
						clickedSidebarMobileToggle.setAttribute("aria-expanded", "false");
						self.element.setAttribute("hidden", "");
					}
				});
			},

			/************************************************************************
			 * Called when the sidenav is added to the DOM.
			 ***********************************************************************/

			connected() {
				Component.dispatchComponentAddedEvent(this.element);
				Component.watchForDOMChanges(this);
				Component.watchForDocumentResize(this, () => this._toggleCollapse());
			},

			/************************************************************************
			 * Toggles the sidenav's collapsed state.
			 *
			 * @private
			 ***********************************************************************/

			_toggleCollapse() {
				if (!this.collapsible) return;

				this._shouldCollapse() ? this._collapse() : this._expand();
			},

			/************************************************************************
			 * Returns true if the sidenav should be collapsed into a disclosure.
			 *
			 * @private
			 ***********************************************************************/

			_shouldCollapse() {
				return this.documentBody.offsetWidth <= this.collapseBreakpoint;
			},

			/************************************************************************
			 * Collapses the sidenav into a disclosure menu on mobile.
			 *
			 * @private
			 ***********************************************************************/

			_collapse() {
				this.element.setAttribute("hidden", true);
				this.collapsibleContainer.style.display = "";
				this.collapsibleContainer.setAttribute("hidden", false);
				this.collapsibleContainer.setAttribute("aria-expanded", false);
			},

			/************************************************************************
			 * Expands the sidenav to its full-size appearance on larger screens.
			 *
			 * @private
			 ***********************************************************************/

			_expand() {
				this.element.removeAttribute("hidden");
				this.collapsibleContainer.style.display = "none";
				this.collapsibleContainer.setAttribute("hidden", true);
				this.collapsibleContainer.setAttribute("aria-expanded", false);
			},

			/************************************************************************
			 * Called when the sidenav is removed from the DOM.
			 ***********************************************************************/

			disconnected() {
				Component.dispatchComponentRemovedEvent(this.element);
				Component.stopWatchingForDOMChanges(this);
			},

			/************************************************************************
			 * Handles click events broadcast to the sidenav.
			 *
			 * @param {Event} event - Click event
			 ***********************************************************************/

			onClick(event) {
				if (!this._clickOriginatedInChildMenuToggleButton(event)) {
					return;
				}

				this._setChildMenuToToggle(event);

				if (!this._childMenuToToggleExists()) {
					return;
				}

				this._childMenuToToggleIsOpen()
					? this.close(this.childMenuToToggleId)
					: this.open(this.childMenuToToggleId);
			},

			/************************************************************************
			 * Returns true if the given click event originated inside one of the
			 * sidenav's child menu toggle buttons.
			 *
			 * @private
			 * @param {Event} event - Click event
			 * @returns {boolean} Click originated inside child menu toggle button
			 ***********************************************************************/

			_clickOriginatedInChildMenuToggleButton(event) {
				return event.target.closest(this.toggleSelector);
			},

			/************************************************************************
			 * Sets references to the child menu to be toggled by the given click
			 * event. These references are used by other click handler submethods.
			 *
			 * @private
			 * @param {Event} event - Click event
			 ***********************************************************************/

			_setChildMenuToToggle(event) {
				this.childMenuToToggleId = event.target.closest(
					this.toggleSelector,
				).dataset.rvtSidenavToggle;

				this.childMenuToToggle = this.element.querySelector(
					`[${this.childMenuAttribute} = "${this.childMenuToToggleId}"]`,
				);
			},

			/************************************************************************
			 * Returns true if the child menu to be toggled by a click event actually
			 * exists in the DOM.
			 *
			 * @private
			 * @returns {boolean} Child menu exists
			 ***********************************************************************/

			_childMenuToToggleExists() {
				return (
					this.childMenuToToggle &&
					this.childMenuToToggle.getAttribute(this.childMenuAttribute) !== ""
				);
			},

			/************************************************************************
			 * Returns true if the child menu to be toggled by a click event is open.
			 *
			 * @private
			 * @returns {boolean} Child menu is open
			 ***********************************************************************/

			_childMenuToToggleIsOpen() {
				return !this.childMenuToToggle.hasAttribute("hidden");
			},

			/************************************************************************
			 * Opens the child menu with the given data-rvt-sidenav-list ID value.
			 *
			 * @param {string} childMenuId - Child menu ID
			 ***********************************************************************/

			open(childMenuId) {
				this._setChildMenuToOpen(childMenuId);

				if (!this._childMenuExists(childMenuId)) {
					console.warn(`No such subnav child menu '${childMenuId}' in open()`);
					return;
				}

				if (!this._eventDispatched("SidenavListOpened", this.childMenuToOpen)) {
					return;
				}

				this._openChildMenu();
			},

			/************************************************************************
			 * Sets references to the child menu to be opened. These references are
			 * used by other submethods.
			 *
			 * @private
			 * @param {string} childMenuId - Child menu ID
			 ***********************************************************************/

			_setChildMenuToOpen(childMenuId) {
				this.childMenuToOpenToggleButton = this.element.querySelector(
					`[${this.toggleAttribute} = "${childMenuId}"]`,
				);

				this.childMenuToOpen = this.element.querySelector(
					`[${this.childMenuAttribute} = "${childMenuId}"]`,
				);
			},

			/************************************************************************
			 * Expands the child menu to be opened.
			 *
			 * @private
			 ***********************************************************************/

			_openChildMenu() {
				this.childMenuToOpenToggleButton.setAttribute("aria-expanded", "true");
				this.childMenuToOpen.removeAttribute("hidden");
			},

			/************************************************************************
			 * Closes the child menu with the given data-rvt-sidenav-list ID value.
			 *
			 * @param {string} childMenuId - Child menu ID
			 ***********************************************************************/

			close(childMenuId) {
				this._setChildMenuToClose(childMenuId);

				if (!this._childMenuExists(childMenuId)) {
					console.warn(`No such subnav child menu '${childMenuId}' in close()`);
					return;
				}

				if (
					!this._eventDispatched("SidenavListClosed", this.childMenuToClose)
				) {
					return;
				}

				this._closeChildMenu();
			},

			/************************************************************************
			 * Sets references to the child menu to be closed. These references are
			 * used by other submethods.
			 *
			 * @private
			 * @param {string} childMenuId - Child menu ID
			 ***********************************************************************/

			_setChildMenuToClose(childMenuId) {
				this.childMenuToCloseToggleButton = this.element.querySelector(
					`[${this.toggleAttribute} = "${childMenuId}"]`,
				);

				this.childMenuToClose = this.element.querySelector(
					`[${this.childMenuAttribute} = "${childMenuId}"]`,
				);
			},

			/************************************************************************
			 * Collapses the child menu to be closed.
			 *
			 * @private
			 ***********************************************************************/

			_closeChildMenu() {
				this.childMenuToCloseToggleButton.setAttribute(
					"aria-expanded",
					"false",
				);
				this.childMenuToClose.setAttribute("hidden", "");
			},

			/************************************************************************
			 * Returns true if a child menu with the given ID exists.
			 *
			 * @private
			 * @returns {boolean} Child menu exists
			 ***********************************************************************/

			_childMenuExists(childMenuId) {
				const childMenuToggleButton = this.element.querySelector(
					`[${this.toggleAttribute} = "${childMenuId}"]`,
				);

				const childMenu = this.element.querySelector(
					`[${this.childMenuAttribute} = "${childMenuId}"]`,
				);

				return childMenuToggleButton && childMenu;
			},

			/************************************************************************
			 * Returns true if the custom event with the given name was successfully
			 * dispatched.
			 *
			 * @private
			 * @param {string} name - Event name
			 * @returns {boolean} Event successfully dispatched
			 ***********************************************************************/

			_eventDispatched(name, childMenu) {
				const dispatched = Component.dispatchCustomEvent(name, this.element, {
					list: childMenu,
				});

				return dispatched;
			},
		};
	}
}
