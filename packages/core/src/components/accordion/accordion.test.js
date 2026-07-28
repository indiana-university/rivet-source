/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { describe, it, expect } from "vitest";
import { HtmlValidate } from "html-validate";

const htmlvalidate = new HtmlValidate({
	extends: ["html-validate:recommended"],
});

describe("accordion markup", () => {
	it("has no html-validate errors", async () => {
		const html = `
            <div class="rvt-accordion" data-rvt-accordion="test-accordion">
                <h3 class="rvt-accordion__summary">
                <button class="rvt-accordion__toggle" data-rvt-accordion-trigger type="button">
                    <span class="rvt-accordion__toggle-text">Become the best version of yourself at IU</span>
                </button>
                </h3>
                <div class="rvt-accordion__panel" data-rvt-accordion-panel>
                <p>Develop <a href="#">the skills</a> you need for a rewarding career.</p>
                </div>
            </div>
        `;

		const report = await htmlvalidate.validateString(html);

		expect(report.valid).toBe(true);
	});
});
