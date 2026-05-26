/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const ELEMENT_NAME = "rvt-lockup";
const SIZES = ["lg", "md", "sm"];

class RivetLockup extends HTMLElement {
	#resizeObserver;

	connectedCallback() {
		this.#resizeObserver = new ResizeObserver(() => {
			for (const size of SIZES) {
				this.setAttribute("size", size);
				if (!this.#isOverflowing) {
					return;
				}
			}
		});
		this.#resizeObserver.observe(this);
	}

	disconnectedCallback() {
		this.#resizeObserver.disconnect();
	}

	get #isOverflowing() {
		const xOverflow = this.scrollWidth > this.clientWidth;
		const yOverflow = this.scrollHeight > this.clientHeight;
		return xOverflow || yOverflow;
	}
}

window.customElements.define(ELEMENT_NAME, RivetLockup);
