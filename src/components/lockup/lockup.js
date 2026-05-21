/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const ELEMENT_NAME = "rvt-lockup";

class RivetLockup extends HTMLElement {
	#resizeObserver;

	connectedCallback() {
		this.#resizeObserver = new ResizeObserver(() => {
			const style = window.getComputedStyle(this);
			const sourceWidth = this.style.width;
			//this.style.width = "min-content";
			const minWidth = this.offsetWidth;
			//this.style.width = "max-content";
			const maxWidth = this.offsetWidth;
			//this.style.width = sourceWidth;

			this.setAttribute("data-state", "resizing");
			const xOverflow = this.scrollWidth > this.clientWidth;
			const yOverflow = this.scrollHeight > this.clientHeight;
			const isOverflowing = xOverflow || yOverflow;
			this.setAttribute("data-overflow-width", this.scrollWidth);
			this.setAttribute("data-overflow-width2", this.clientWidth);
			this.setAttribute("data-min", minWidth);
			this.setAttribute("data-max", maxWidth);
			if (isOverflowing) {
				this.setAttribute("data-state", "overflowing");
			}
			else {
				this.removeAttribute("data-state");
			}
		});
		this.#resizeObserver.observe(this);
	}

	disconnectedCallback() {
		this.#resizeObserver.disconnect();
	}
}

window.customElements.define(ELEMENT_NAME, RivetLockup);
