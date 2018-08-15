const assert = require('assert');
const fs = require('fs');
var vm = require('vm');
var path = 'dist/js/rivet.min.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

const TEMPLATE = fs.readFileSync('src/components/20-tabs/tabs.hbs');

// `aria` prefixed attributes
const SELECTED = 'aria-selected';
const HIDDEN   = 'hidden';
const TABINDEX   = 'tabindex';

describe('Tabs component behavior', function () {
    const body = document.body;

    let panels;
    let tabs;

    beforeEach(function () {
        body.innerHTML = TEMPLATE;
        Tabs.init();

        panels = body.querySelectorAll('[role="tabpanel"]');
        tabs = body.querySelectorAll('[role="tab"]');
    });

    describe('DOM state', function () {
        it('The first panel is open', function () {
            assert.equal(panels[0].getAttribute(HIDDEN), null);
        });
        it('The second panel is closed', function () {
            assert.equal(panels[1].getAttribute(HIDDEN), "hidden");
        });
    });

    describe('Can activate tab', function () {
        it('Activates the third tab', function () {
            Tabs.activateTab('tab-3');
            // active panels should not have the hidden attribute
            assert.equal(panels[2].getAttribute(HIDDEN), null);

            // deactive panels should have the hidden attribute
            assert.equal(panels[0].getAttribute(HIDDEN), 'hidden');

            // the active tab should have the aria-selected attribute set to true
            assert.equal(tabs[2].getAttribute(SELECTED), 'true');

            // the deactivated tab should have the aria-selected attribute set to false
            assert.equal(tabs[0].getAttribute(SELECTED), 'false');

            // active tabs should not have a tabindex
            assert.equal(tabs[2].getAttribute(TABINDEX), null);

            // deactive tabs have -1 tabindex
            assert.equal(tabs[0].getAttribute(TABINDEX), -1);
        });
    });

});
